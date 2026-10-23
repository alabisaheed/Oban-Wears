// Grand Opening Deal landing pages.
//   POST {type: "order", name, whatsapp, email, address, kaftan}   from /obpk
//        -> {ref}; saved to the dashboard (Grand Opening) and emailed to the shop
//   POST {type: "upgrade", email, ref?}                            from /obku
//        -> marks that order as upgraded (or records the request) and emails the shop
const crypto = require("crypto");
const db = require("./_lib/db");
const mail = require("./_lib/mail");
const { handler, send, readBody, str, isEmail, HttpError } = require("./_lib/http");

const KAFTANS = ["Navy Blue Premium", "Classy Beige", "Cool Green"];
const DEAL_PRICE = 95000;
const UPGRADE_PRICE = 230000;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function orderDate(d = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Lagos", year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(d).map((p) => [p.type, p.value]));
  return `${MONTHS[Number(parts.month) - 1]} ${Number(parts.day)} ${parts.year}`;
}

function clientKey(req) {
  const ip = String(req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || (req.socket && req.socket.remoteAddress) || "unknown").split(",")[0].trim();
  return `landing:${crypto.createHash("sha256").update(ip).digest("hex").slice(0, 24)}`;
}

// At most one submission every 10 s and 15 per hour from the same address.
async function rateLimit(req) {
  const key = clientKey(req);
  const now = Date.now();
  const rec = (await db.get("rateLimits", key)) || { times: [] };
  const recent = (rec.times || []).filter((t) => now - t < 3600000);
  if (recent.length && now - recent[recent.length - 1] < 10000) throw new HttpError(429, "Please wait a few seconds and try again.");
  if (recent.length >= 15) throw new HttpError(429, "Too many requests from this connection. Please try again later.");
  recent.push(now);
  await db.put("rateLimits", key, { times: recent });
}

async function createOrder(req, body) {
  const name = str(body.name, 100);
  const whatsapp = str(body.whatsapp, 30).replace(/[^0-9+ ]/g, "");
  const email = str(body.email, 120).toLowerCase();
  const address = str(body.address, 400);
  const kaftan = KAFTANS.find((k) => k.toLowerCase() === str(body.kaftan, 60).toLowerCase());
  if (!name) throw new HttpError(400, "Please enter your full name.");
  if (whatsapp.replace(/\D/g, "").length < 7) throw new HttpError(400, "Please enter a valid WhatsApp number.");
  if (email && !isEmail(email)) throw new HttpError(400, "Please enter a valid email address.");
  if (!address) throw new HttpError(400, "Please enter your delivery address.");
  if (!kaftan) throw new HttpError(400, "Please choose your kaftan.");
  await rateLimit(req); // only valid submissions count towards the limit

  for (let attempt = 0; attempt < 8; attempt++) {
    const ref = `GO${crypto.randomInt(1000, 10000)}${"ABCDEFGHJKLMNPQRSTUVWXYZ"[crypto.randomInt(0, 24)]}`;
    const record = {
      ref, name, whatsapp, email, address, kaftan,
      offer: "Grand Opening Deal",
      total: DEAL_PRICE,
      upgrade: false,
      status: "New",
      source: "obpk",
      date: orderDate(),
      createdAt: new Date().toISOString()
    };
    if (await db.createIfAbsent("landingOrders", ref, record)) return record;
  }
  throw new HttpError(503, "Could not place your order. Please try again.");
}

async function requestUpgrade(req, body) {
  const email = str(body.email, 120).toLowerCase();
  if (!isEmail(email)) throw new HttpError(400, "Please enter a valid email address.");
  await rateLimit(req);
  const ref = str(body.ref, 20).toUpperCase();

  // The order from this visit, or the latest one with this email.
  let order = ref ? await db.get("landingOrders", ref) : null;
  if (!order) {
    const matches = await db.findByField("landingOrders", "email", email);
    order = matches.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))[0] || null;
  }
  const now = new Date().toISOString();
  if (order) {
    const updated = {
      ...order,
      email: order.email || email,
      upgrade: true,
      upgradeEmail: email,
      upgradeRequestedAt: now,
      total: order.upgrade ? order.total : DEAL_PRICE + UPGRADE_PRICE,
      status: order.status === "New" ? "Upgrade requested" : order.status
    };
    await db.put("landingOrders", updated.ref, updated);
    return updated;
  }
  // No matching order (e.g. they came straight to /obku): record the request anyway.
  for (let attempt = 0; attempt < 8; attempt++) {
    const newRef = `GO${crypto.randomInt(1000, 10000)}U`;
    const record = {
      ref: newRef, name: "", whatsapp: "", email, address: "", kaftan: "",
      offer: "Klassy Man Bundle upgrade",
      total: DEAL_PRICE + UPGRADE_PRICE,
      upgrade: true, upgradeEmail: email, upgradeRequestedAt: now,
      status: "Upgrade requested", source: "obku",
      date: orderDate(), createdAt: now
    };
    if (await db.createIfAbsent("landingOrders", newRef, record)) return record;
  }
  throw new HttpError(503, "Could not record your upgrade. Please try again.");
}

module.exports = handler({
  POST: async (req, res) => {
    const body = await readBody(req, 16 * 1024);
    if (body.website) return send(res, 201, { ok: true, ref: "" }); // bot trap
    if (body.type === "order") {
      const order = await createOrder(req, body);
      await mail.sendLandingNotice("order", order);
      return send(res, 201, { ok: true, ref: order.ref, kaftan: order.kaftan });
    }
    if (body.type === "upgrade") {
      const order = await requestUpgrade(req, body);
      await mail.sendLandingNotice("upgrade", order);
      return send(res, 201, { ok: true, ref: order.ref });
    }
    throw new HttpError(400, "Unknown request");
  }
});
