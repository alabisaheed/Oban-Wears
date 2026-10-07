// Customer profile vault (email + 4-digit PIN).
//   POST {action: "login", email, pin}   signs in, creating the profile on first use
//   GET  (Bearer token)                  profile + purchase history
//   PUT  (Bearer token) {name, whatsapp, measurements}
const db = require("./_lib/db");
const auth = require("./_lib/auth");
const { handler, send, readBody, str, isEmail, HttpError } = require("./_lib/http");

const MEASUREMENT_FIELDS = ["neck", "chest", "shoulder", "sleeve", "waist", "length", "hip", "height", "trouserLength", "notes"];

function publicProfile(p, email) {
  return {
    email: p.email || email,
    name: p.name || "",
    whatsapp: p.whatsapp || "",
    measurements: p.measurements || {}
  };
}

async function customerOrders(email) {
  const orders = await db.findByField("orders", "email", email);
  return orders
    .sort((a, b) => (Date.parse(b.createdAt || b.date) || 0) - (Date.parse(a.createdAt || a.date) || 0))
    // The customer's own orders, with what the printed invoice and receipt need.
    .map((o) => ({
      ref: o.ref,
      date: o.date,
      name: o.name,
      email: o.email,
      whatsapp: o.whatsapp,
      piece: o.piece,
      itemsList: o.itemsList,
      fabricSource: o.fabricSource,
      notes: o.notes,
      total: Number(o.total) || 0,
      paymentPercentage: o.paymentPercentage,
      currentStage: Number(o.currentStage ?? 1)
    }));
}

module.exports = handler({
  POST: async (req, res) => {
    const body = await readBody(req, 4 * 1024);
    if (body.action !== "login") throw new HttpError(400, "Unknown action");
    const email = str(body.email, 120).toLowerCase();
    const pin = String(body.pin || "").trim();
    if (!isEmail(email)) throw new HttpError(400, "Please enter a valid email address");
    if (!/^\d{4}$/.test(pin)) throw new HttpError(400, "PIN must be a 4-digit number");

    const attempts = await auth.assertNotLocked("customer", email);
    let profile = await db.get("profiles", email);

    if (!profile) {
      profile = {
        email, name: "", whatsapp: "",
        measurements: {}, pinHash: auth.hashSecret(pin), createdAt: new Date().toISOString()
      };
      await db.put("profiles", email, profile);
    } else {
      const valid = profile.pinHash
        ? auth.verifySecret(pin, profile.pinHash)
        : !profile.pin || String(profile.pin) === pin; // legacy profiles: upgrade on first sign-in
      if (!valid) {
        await auth.recordFailure("customer", email, attempts);
        throw new HttpError(401, "Incorrect PIN. Please try again.");
      }
      if (!profile.pinHash) {
        const { pin: _legacy, ...rest } = profile;
        profile = { ...rest, pinHash: auth.hashSecret(pin) };
        await db.put("profiles", email, profile);
      }
    }
    await auth.clearFailures("customer", email);
    send(res, 200, { token: auth.customerToken(email), profile: publicProfile(profile, email) });
  },

  GET: async (req, res) => {
    const { email } = auth.requireCustomer(req);
    const profile = await db.get("profiles", email);
    if (!profile) throw new HttpError(401, "Please sign in again");
    send(res, 200, { profile: publicProfile(profile, email), orders: await customerOrders(email) });
  },

  PUT: async (req, res) => {
    const { email } = auth.requireCustomer(req);
    const body = await readBody(req, 8 * 1024);
    const profile = await db.get("profiles", email);
    if (!profile) throw new HttpError(401, "Please sign in again");

    if (body.name !== undefined) profile.name = str(body.name, 100);
    if (body.whatsapp !== undefined) profile.whatsapp = str(body.whatsapp, 30);
    if (body.measurements && typeof body.measurements === "object") {
      const m = { ...(profile.measurements || {}) };
      MEASUREMENT_FIELDS.forEach((f) => {
        if (body.measurements[f] !== undefined) m[f] = str(body.measurements[f], 40);
      });
      profile.measurements = m;
    }
    profile.updatedAt = new Date().toISOString();
    await db.put("profiles", email, profile);
    send(res, 200, { profile: publicProfile(profile, email) });
  }
});
