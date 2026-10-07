// Public visitor submissions and approved comments.
//   GET  ?type=comments&article=<id>            approved comments (with Oban replies)
//   POST {type: "comment", articleId, articleTitle, name, email, text}
//        held for approval in the dashboard (Comments)
//   POST {type: "enquiry", name, email, subject, message}
//        saved to the dashboard (Messages) and emailed to the shop
// Both POSTs reject bots (hidden "website" field), obvious spam and floods.
const crypto = require("crypto");
const db = require("./_lib/db");
const mail = require("./_lib/mail");
const { handler, send, query, readBody, str, isEmail, HttpError } = require("./_lib/http");

const SPAM_WORDS = ["crypto", "bitcoin", "forex", "viagra", "levitra", "casino", "poker", "free cash", "earn money", "loan offer", "seo service"];
const MIN_SECONDS_BETWEEN = 20;
const MAX_PER_HOUR = 12;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function longDate(d = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Lagos", year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(d).map((p) => [p.type, p.value]));
  return `${MONTHS[Number(parts.month) - 1]} ${Number(parts.day)}, ${parts.year}`;
}

function clientKey(req, kind) {
  const ip = String(req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || (req.socket && req.socket.remoteAddress) || "unknown").split(",")[0].trim();
  return `${kind}:${crypto.createHash("sha256").update(ip).digest("hex").slice(0, 24)}`;
}

// At most one submission every 20 s and 12 per hour from the same address.
async function rateLimit(req, kind) {
  const key = clientKey(req, kind);
  const now = Date.now();
  const rec = (await db.get("rateLimits", key)) || { times: [] };
  const recent = (rec.times || []).filter((t) => now - t < 3600000);
  if (recent.length && now - recent[recent.length - 1] < MIN_SECONDS_BETWEEN * 1000) {
    throw new HttpError(429, "Please wait a few seconds before sending again.");
  }
  if (recent.length >= MAX_PER_HOUR) throw new HttpError(429, "Too many messages from this connection. Please try again later.");
  recent.push(now);
  await db.put("rateLimits", key, { times: recent });
}

function looksLikeSpam(text) {
  const lower = String(text).toLowerCase();
  const links = (lower.match(/https?:\/\/|www\./g) || []).length;
  return links > 1 || SPAM_WORDS.some((w) => lower.includes(w));
}

function publicComment(c) {
  return {
    id: c.id,
    name: c.name,
    text: c.text,
    date: c.date,
    replies: (Array.isArray(c.replies) ? c.replies : []).map((r) => ({ name: r.name || "Oban Wears", text: r.text, date: r.date }))
  };
}

module.exports = handler({
  GET: async (req, res) => {
    const q = query(req);
    if (q.type !== "comments") throw new HttpError(400, "Unknown content type");
    const articleId = str(q.article, 200);
    if (!articleId) return send(res, 200, []);
    const comments = (await db.findByField("comments", "articleId", articleId))
      .filter((c) => c && c.approved === true)
      .sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")))
      .map(publicComment);
    send(res, 200, comments, { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=120" });
  },

  POST: async (req, res) => {
    const body = await readBody(req, 16 * 1024);
    // Bots fill the hidden field: pretend it worked so they move on.
    if (body.website) return send(res, 201, { ok: true });

    if (body.type === "comment") {
      const articleId = str(body.articleId, 200);
      const name = str(body.name, 80);
      const email = str(body.email, 120).toLowerCase();
      const text = str(body.text, 2000);
      if (!articleId || !name || !text) throw new HttpError(400, "Please enter your name and your comment.");
      if (!isEmail(email)) throw new HttpError(400, "Please enter a valid email address.");
      if (looksLikeSpam(`${name} ${text}`)) throw new HttpError(400, "Your comment looks like spam. Please remove links and try again.");
      await rateLimit(req, "comment");
      const id = `com-${Date.now().toString(36)}${crypto.randomBytes(3).toString("hex")}`;
      await db.put("comments", id, {
        id,
        articleId,
        articleTitle: str(body.articleTitle, 200),
        name,
        email,
        text,
        date: longDate(),
        createdAt: new Date().toISOString(),
        approved: false,
        replies: []
      });
      return send(res, 201, { ok: true, pending: true });
    }

    if (body.type === "enquiry") {
      const name = str(body.name, 100);
      const email = str(body.email, 120).toLowerCase();
      const subject = str(body.subject, 120) || "General enquiry";
      const message = str(body.message, 4000);
      if (!name || !message) throw new HttpError(400, "Please enter your name and message.");
      if (!isEmail(email)) throw new HttpError(400, "Please enter a valid email address.");
      if (looksLikeSpam(message)) throw new HttpError(400, "Your message looks like spam. Please remove links and try again.");
      await rateLimit(req, "enquiry");
      let enquiry = null;
      for (let attempt = 0; attempt < 6 && !enquiry; attempt++) {
        const ref = `ENQ-${crypto.randomInt(100000, 1000000)}`;
        const record = { ref, name, email, subject, message, status: "New", date: longDate(), createdAt: new Date().toISOString() };
        if (await db.createIfAbsent("enquiries", ref, record)) enquiry = record;
      }
      if (!enquiry) throw new HttpError(503, "Could not send your message. Please try again.");
      const emailed = await mail.sendEnquiryNotice(enquiry);
      if (emailed) await db.put("enquiries", enquiry.ref, { ...enquiry, emailed: true });
      return send(res, 201, { ok: true, ref: enquiry.ref });
    }

    throw new HttpError(400, "Unknown submission type");
  }
});
