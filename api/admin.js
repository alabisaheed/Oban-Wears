// Dashboard data API (staff only).
//   GET  ?c=orders,products,...[&since=<cursor>]
//        { cursor, full, changes: { orders: { upsert: {key: record}, removed: [key] } } }
//        Without `since` every record is returned; with it, only records
//        changed after the cursor from the previous response.
//   GET  ?c=staff                                    { staff: {...} }          (admin)
//   POST {c, upsert: {key: record}, remove: [key]}   per-record writes, never whole-list overwrites
//   POST {c: "staff", action, email, role}           invite / revokeInvite / removeStaff / setRole (admin)
//   POST {c: "recover", records: {orders: {...}}}    adds records the server has never had
//   POST {c: "image", data: "data:image/...;base64,..."}  stores an uploaded image, returns {url}
const db = require("./_lib/db");
const store = require("./_lib/store");
const auth = require("./_lib/auth");
const legacy = require("./_lib/legacy");
const { handler, send, query, readBody, str, isEmail, HttpError } = require("./_lib/http");

const ALL = auth.ROLES;
const COLLECTIONS = {
  orders: ALL,
  products: ALL,
  articles: ALL,
  comments: ALL,
  subscribers: ALL,
  enquiries: ALL,
  profiles: ALL,
  vendors: ["admin", "manager"],
  purchaseOrders: ["admin", "manager"],
  bills: ["admin", "manager"],
  payments: ["admin", "manager"]
};
// Only these roles may delete records from a collection.
const CAN_DELETE = {
  orders: ["admin", "manager"],
  products: ["admin", "manager"],
  profiles: ["admin", "manager"]
};
const MAX_RECORDS_PER_WRITE = 300;
const SECRET_FIELDS = ["passwordHash", "pinHash", "pin"];

function stripSecrets(record) {
  const copy = { ...record };
  SECRET_FIELDS.forEach((f) => delete copy[f]);
  return copy;
}

function allowed(collection, user) {
  const roles = COLLECTIONS[collection];
  return Boolean(roles && roles.includes(user.role));
}

async function readStaff() {
  const [staff, invites] = await Promise.all([db.list("staff"), db.list("staffInvites")]);
  const out = {};
  Object.entries(invites).forEach(([k, v]) => { out[k] = { email: v.email || k, role: v.role, status: "invited" }; });
  Object.entries(staff).forEach(([k, v]) => { out[k] = { email: v.email || k, name: v.name, role: v.role, status: "active" }; });
  auth.envAdmins().forEach((email) => {
    out[email] = { email, name: (staff[email] && staff[email].name) || process.env.ADMIN_NAME || "Admin", role: "admin", status: "owner" };
  });
  return out;
}

async function staffAction(body, user) {
  const email = str(body.email, 120).toLowerCase();
  if (!isEmail(email)) throw new HttpError(400, "Please enter a valid email");
  const role = auth.ROLES.includes(body.role) ? body.role : "editor";
  if (auth.envAdmins().includes(email) && body.action !== "invite") throw new HttpError(400, "Owner accounts are managed in the hosting settings");

  if (body.action === "invite") {
    if (auth.envAdmins().includes(email) || await db.get("staff", email)) throw new HttpError(409, "This email already has an account");
    await db.put("staffInvites", email, { email, role, invitedBy: user.email, createdAt: new Date().toISOString() });
  } else if (body.action === "revokeInvite") {
    await db.remove("staffInvites", email);
  } else if (body.action === "removeStaff") {
    if (email === user.email) throw new HttpError(400, "You cannot remove your own access");
    await db.remove("staff", email);
  } else if (body.action === "setRole") {
    const staff = await db.get("staff", email);
    if (staff) await db.put("staff", email, { ...staff, role });
    else {
      const invite = await db.get("staffInvites", email);
      if (!invite) throw new HttpError(404, "Staff member not found");
      await db.put("staffInvites", email, { ...invite, role });
    }
  } else {
    throw new HttpError(400, "Unknown staff action");
  }
}

function prepare(collection, key, raw, user, images) {
  let record = stripSecrets(raw);
  if (collection === "products" || collection === "articles") record = store.extractImages(record, images);
  if (collection === "orders" && !record.ref) record.ref = key;
  if (collection === "products" && !record.code) record.code = key;
  record.updatedAt = new Date().toISOString();
  record.updatedBy = user.email;
  return record;
}

// Records that dashboard browsers still hold but the server lost. Never
// overwrites or revives anything the server already knows about.
async function recover(body, user) {
  const result = {};
  const input = body.records && typeof body.records === "object" ? body.records : {};
  for (const [collection, records] of Object.entries(input)) {
    if (!allowed(collection, user) || collection === "products" || !records || typeof records !== "object") continue;
    const images = [];
    const clean = {};
    Object.entries(records).slice(0, 2000).forEach(([key, raw]) => {
      if (key && raw && typeof raw === "object" && !Array.isArray(raw)) {
        clean[String(key).slice(0, 200)] = { ...prepare(collection, key, raw, user, images), recoveredFrom: "dashboard-browser" };
      }
    });
    if (images.length) await db.apply("_images", {}, [], images);
    result[collection] = (await db.insertMissing(collection, clean)).length;
  }
  return result;
}

module.exports = handler({
  GET: async (req, res) => {
    const q = query(req);
    const requested = String(q.c || "").split(",").map((c) => c.trim()).filter(Boolean);

    if (requested.length === 1 && requested[0] === "staff") {
      auth.requireStaff(req, ["admin"]);
      return send(res, 200, { staff: await readStaff() });
    }

    const user = auth.requireStaff(req);
    const since = q.since && !Number.isNaN(Date.parse(q.since)) ? new Date(q.since).toISOString() : null;
    if (!since) await legacy.importOnce();

    const collections = requested.filter((c) => allowed(c, user));
    const { cursor, rows } = await db.changesSince(collections, since);

    const changes = Object.fromEntries(collections.map((c) => [c, { upsert: {}, removed: [] }]));
    rows.forEach((row) => {
      if (row.deleted) changes[row.collection].removed.push(row.key);
      else changes[row.collection].upsert[row.key] = stripSecrets(row.data);
    });
    send(res, 200, { cursor, full: !since, changes, user: { email: user.email, name: user.name, role: user.role } });
  },

  POST: async (req, res) => {
    const user = auth.requireStaff(req);
    const body = await readBody(req, 4 * 1024 * 1024);
    const collection = String(body.c || "");

    if (collection === "staff") {
      if (user.role !== "admin") throw new HttpError(403, "Only admins can manage staff");
      await staffAction(body, user);
      return send(res, 200, { ok: true, staff: await readStaff() });
    }
    if (collection === "recover") {
      // Insert-only and limited to collections the role can already edit.
      return send(res, 200, { ok: true, recovered: await recover(body, user) });
    }
    if (collection === "image") {
      const images = [];
      const url = store.extractImages(String(body.data || ""), images);
      if (!images.length) throw new HttpError(400, "Please choose a JPG, PNG or WebP image");
      await db.apply("_images", {}, [], images);
      return send(res, 200, { url });
    }
    if (!allowed(collection, user)) throw new HttpError(403, "Your role does not allow this action");

    const upsert = body.upsert && typeof body.upsert === "object" ? body.upsert : {};
    const remove = Array.isArray(body.remove) ? body.remove.map(String).filter(Boolean) : [];
    if (Object.keys(upsert).length + remove.length > MAX_RECORDS_PER_WRITE) throw new HttpError(413, "Too many records in one save");
    if (remove.length && CAN_DELETE[collection] && !CAN_DELETE[collection].includes(user.role)) {
      throw new HttpError(403, `Your role cannot delete ${collection}`);
    }

    const images = [];
    const records = {};
    for (const [key, raw] of Object.entries(upsert)) {
      if (!key || !raw || typeof raw !== "object" || Array.isArray(raw)) continue;
      const record = prepare(collection, key, raw, user, images);
      if (collection === "profiles") {
        // Keep the customer's PIN hash (never sent to the dashboard), or set a
        // new one when staff reset the PIN.
        const existing = await db.get("profiles", key);
        if (/^\d{4}$/.test(String(raw.newPin || ""))) record.pinHash = auth.hashSecret(String(raw.newPin));
        else if (existing && existing.pinHash) record.pinHash = existing.pinHash;
        delete record.newPin;
      }
      records[key] = record;
    }

    await db.apply(collection, records, remove, images);
    const saved = Object.fromEntries(Object.entries(records).map(([k, r]) => [k, stripSecrets(r)]));
    send(res, 200, { ok: true, saved, removed: remove });
  }
});
