// Password hashing, signed session tokens, login lockouts and email sign-in codes.
const crypto = require("crypto");
const db = require("./db");
const { HttpError } = require("./http");

const SESSION_SECRET = process.env.SESSION_SECRET || (process.env.VERCEL ? "" : "oban-local-dev-secret");
const STAFF_SESSION_HOURS = 12;
const CUSTOMER_SESSION_DAYS = 30;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

const ROLES = ["admin", "manager", "editor"];

// Sign-in codes: emailed after the password is accepted.
const CODE_TTL_MINUTES = 10;
const CODE_MAX_ATTEMPTS = 5;
const CODE_RESEND_SECONDS = 45;

function requireSecret() {
  if (!SESSION_SECRET) throw new HttpError(503, "SESSION_SECRET is not configured");
  return SESSION_SECRET;
}

function hashSecret(value) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(value), salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

function verifySecret(value, stored) {
  if (!stored || typeof stored !== "string") return false;
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const candidate = crypto.scryptSync(String(value), salt, 64);
  const expected = Buffer.from(hash, "hex");
  return expected.length === candidate.length && crypto.timingSafeEqual(candidate, expected);
}

function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signToken(payload) {
  const body = b64url(JSON.stringify(payload));
  const sig = b64url(crypto.createHmac("sha256", requireSecret()).update(body).digest());
  return `${body}.${sig}`;
}

function readToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  const expected = b64url(crypto.createHmac("sha256", requireSecret()).update(body).digest());
  if (!safeEqual(sig, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

function bearer(req) {
  const header = req.headers.authorization || req.headers.Authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

function normalizeRole(role) {
  return ROLES.includes(role) ? role : "editor";
}

function staffToken(user) {
  return signToken({ kind: "staff", email: user.email, name: user.name, role: normalizeRole(user.role), exp: Date.now() + STAFF_SESSION_HOURS * 3600 * 1000 });
}

function customerToken(email) {
  return signToken({ kind: "customer", email, exp: Date.now() + CUSTOMER_SESSION_DAYS * 86400 * 1000 });
}

// roles: list of roles allowed, e.g. ["admin"] or ["admin", "manager"]
function requireStaff(req, roles = ROLES) {
  const payload = readToken(bearer(req));
  if (!payload || payload.kind !== "staff") throw new HttpError(401, "Please log in again");
  if (!roles.includes(payload.role)) throw new HttpError(403, "Your role does not allow this action");
  return payload;
}

function requireCustomer(req) {
  const payload = readToken(bearer(req));
  if (!payload || payload.kind !== "customer") throw new HttpError(401, "Please sign in again");
  return payload;
}

// Owner logins come from env: ADMIN_EMAILS (comma separated) + ADMIN_PASSWORD.
function envAdmins() {
  return String(process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}

async function assertNotLocked(scope, id) {
  const record = await db.get("loginAttempts", `${scope}:${id}`);
  if (record && record.lockedUntil && record.lockedUntil > Date.now()) {
    const minutes = Math.ceil((record.lockedUntil - Date.now()) / 60000);
    throw new HttpError(429, `Too many attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`);
  }
  return record;
}

async function recordFailure(scope, id, previous) {
  const count = (previous && previous.lockedUntil && previous.lockedUntil <= Date.now() ? 0 : (previous && previous.count) || 0) + 1;
  const record = { count, lastFailure: Date.now() };
  if (count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCKOUT_MINUTES * 60000;
    record.count = 0;
  }
  await db.put("loginAttempts", `${scope}:${id}`, record);
}

async function clearFailures(scope, id) {
  await db.remove("loginAttempts", `${scope}:${id}`);
}

// ---------------------------------------------------------------------------
// Email sign-in codes
// ---------------------------------------------------------------------------
function loginCodesEnabled() {
  return String(process.env.LOGIN_OTP || "on").trim().toLowerCase() !== "off";
}

function newCode() {
  return String(crypto.randomInt(0, 1000000)).padStart(6, "0");
}

function codeHash(challengeId, code) {
  return crypto.createHmac("sha256", requireSecret()).update(`${challengeId}:${code}`).digest("hex");
}

// "ad***@obanwears.com"
function maskEmail(email) {
  const [name, domain] = String(email).split("@");
  if (!domain) return email;
  return `${name.slice(0, 2)}${"*".repeat(Math.max(1, Math.min(6, name.length - 2)))}@${domain}`;
}

// Creates a pending sign-in for `user` and returns the code to email.
async function createChallenge(user) {
  const id = crypto.randomBytes(24).toString("hex");
  const code = newCode();
  await db.put("loginChallenges", id, {
    email: user.email,
    name: user.name,
    role: normalizeRole(user.role),
    codeHash: codeHash(id, code),
    attempts: 0,
    expiresAt: Date.now() + CODE_TTL_MINUTES * 60000,
    sentAt: Date.now()
  });
  return { id, code };
}

async function loadChallenge(id) {
  if (!/^[a-f0-9]{48}$/.test(String(id || ""))) throw new HttpError(410, "This sign-in has expired. Please enter your password again.");
  const challenge = await db.get("loginChallenges", id);
  if (!challenge || challenge.expiresAt < Date.now()) {
    if (challenge) await db.remove("loginChallenges", id);
    throw new HttpError(410, "This code has expired. Please enter your password again.");
  }
  return challenge;
}

// Returns the signed-in user when the code is right.
async function verifyChallenge(id, code) {
  const challenge = await loadChallenge(id);
  const clean = String(code || "").replace(/\D/g, "");
  if (clean.length === 6 && safeEqual(codeHash(id, clean), challenge.codeHash)) {
    await db.remove("loginChallenges", id);
    return { email: challenge.email, name: challenge.name, role: challenge.role };
  }
  const attempts = (challenge.attempts || 0) + 1;
  if (attempts >= CODE_MAX_ATTEMPTS) {
    await db.remove("loginChallenges", id);
    throw new HttpError(410, "Too many incorrect codes. Please enter your password again.");
  }
  await db.put("loginChallenges", id, { ...challenge, attempts });
  const left = CODE_MAX_ATTEMPTS - attempts;
  throw new HttpError(401, `That code is not right. ${left} attempt${left === 1 ? "" : "s"} left.`);
}

// Issues a fresh code for an existing challenge.
async function refreshChallenge(id) {
  const challenge = await loadChallenge(id);
  const wait = Math.ceil((challenge.sentAt + CODE_RESEND_SECONDS * 1000 - Date.now()) / 1000);
  if (wait > 0) throw new HttpError(429, `Please wait ${wait} seconds before asking for a new code.`);
  const code = newCode();
  await db.put("loginChallenges", id, {
    ...challenge,
    codeHash: codeHash(id, code),
    attempts: 0,
    expiresAt: Date.now() + CODE_TTL_MINUTES * 60000,
    sentAt: Date.now()
  });
  return { email: challenge.email, code };
}

module.exports = {
  ROLES, CODE_TTL_MINUTES,
  hashSecret, verifySecret, safeEqual, signToken, readToken, staffToken, customerToken,
  requireStaff, requireCustomer, envAdmins, assertNotLocked, recordFailure, clearFailures,
  loginCodesEnabled, maskEmail, createChallenge, verifyChallenge, refreshChallenge
};
