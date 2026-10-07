// Public order intake from website checkouts.
//   POST {customer: {name, email, whatsapp}, items: [{code, size, qty}], customerToken?}
// The server assigns the reference and recalculates every price from the
// catalogue, so a browser can never change totals or overwrite other orders.
const crypto = require("crypto");
const db = require("./_lib/db");
const auth = require("./_lib/auth");
const { handler, send, readBody, str, isEmail, HttpError } = require("./_lib/http");

const LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MAX_LINES = 30;
const MAX_QTY = 50;

// Same shape as existing references, e.g. OB4821K.
function randomRef() {
  return `OB${crypto.randomInt(1000, 10000)}${LETTERS[crypto.randomInt(0, LETTERS.length)]}`;
}

// "September 25 2026" in Nigerian time, matching the dates already stored on orders.
function orderDate(d = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Lagos", year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(d).map((p) => [p.type, p.value]));
  return `${MONTHS[Number(parts.month) - 1]} ${Number(parts.day)} ${parts.year}`;
}

function unitPrice(p) {
  const price = Number(p.price) || 0;
  const discount = Number(p.discount) || 0;
  return discount > 0 ? Math.round(price * (1 - discount / 100)) : price;
}

function priceItems(catalog, items) {
  const byCode = new Map(catalog.filter((p) => p && p.code && !p.hidden).map((p) => [String(p.code).toUpperCase(), p]));
  const lines = [];
  (Array.isArray(items) ? items : []).slice(0, MAX_LINES).forEach((raw) => {
    const product = byCode.get(String((raw && (raw.code || raw.id)) || "").toUpperCase());
    if (!product) return;
    const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(raw.qty) || 1)));
    const size = str(raw.size, 12) || "M";
    const price = unitPrice(product);
    lines.push({ code: product.code, name: product.name || product.code, size, qty, price, lineTotal: price * qty });
  });
  return { lines, total: lines.reduce((sum, l) => sum + l.lineTotal, 0) };
}

module.exports = handler({
  POST: async (req, res) => {
    const body = await readBody(req, 32 * 1024);
    if (body.website) throw new HttpError(400, "Rejected"); // honeypot field for bots

    const customer = body.customer || {};
    const name = str(customer.name, 100);
    const email = str(customer.email, 120).toLowerCase();
    const whatsapp = str(customer.whatsapp, 30).replace(/[^0-9+ ]/g, "");
    if (!name) throw new HttpError(400, "Please enter your full name");
    if (!isEmail(email)) throw new HttpError(400, "Please enter a valid email address");
    if (whatsapp.replace(/\D/g, "").length < 7) throw new HttpError(400, "Please enter a valid WhatsApp number");

    const { lines, total } = priceItems(Object.values(await db.list("products")), body.items);
    if (!lines.length) throw new HttpError(400, "Your cart is empty or the items are no longer available");

    // Attach saved measurements when the customer is signed in to their profile.
    let measurements = null;
    const token = auth.readToken(String(body.customerToken || ""));
    if (token && token.kind === "customer" && token.email === email) {
      const profile = await db.get("profiles", email);
      if (profile && profile.measurements) measurements = profile.measurements;
    }

    const base = {
      name,
      email,
      whatsapp,
      piece: lines.map((l) => `${l.name} (Size ${l.size}, Quantity ${l.qty})`).join(", "),
      itemsList: lines,
      total,
      currentStage: 1,
      orderType: "Online Checkout",
      date: orderDate(),
      createdAt: new Date().toISOString(),
      measurements
    };

    for (let attempt = 0; attempt < 8; attempt++) {
      const ref = randomRef();
      if (await db.createIfAbsent("orders", ref, { ref, ...base })) {
        return send(res, 201, { ref, total, items: lines, date: base.date });
      }
    }
    throw new HttpError(503, "Could not create your order reference, please try again");
  }
});
