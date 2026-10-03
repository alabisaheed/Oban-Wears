// Small request/response helpers shared by the /api functions.
const { DbError } = require("./db");

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function send(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (!headers["Cache-Control"]) res.setHeader("Cache-Control", "no-store");
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
  res.end(JSON.stringify(body));
}

function query(req) {
  if (req.query && typeof req.query === "object") return req.query;
  const url = new URL(req.url, "http://localhost");
  return Object.fromEntries(url.searchParams.entries());
}

async function readBody(req, maxBytes = 64 * 1024) {
  if (req.body !== undefined && req.body !== null && req.body !== "") {
    if (typeof req.body === "string") {
      if (req.body.length > maxBytes) throw new HttpError(413, "Request is too large");
      try { return JSON.parse(req.body); } catch (e) { throw new HttpError(400, "Invalid JSON"); }
    }
    if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString("utf8"));
    if (JSON.stringify(req.body).length > maxBytes) throw new HttpError(413, "Request is too large");
    return req.body;
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxBytes) throw new HttpError(413, "Request is too large");
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch (e) {
    throw new HttpError(400, "Invalid JSON");
  }
}

// Wraps a handler so thrown HttpError/DbError become JSON responses.
function handler(methods) {
  return async (req, res) => {
    const fn = methods[req.method];
    if (!fn) return send(res, 405, { error: "Method not allowed" });
    try {
      await fn(req, res);
    } catch (err) {
      if (err instanceof HttpError || err instanceof DbError) {
        return send(res, err.status, { error: err.message });
      }
      console.error(err);
      return send(res, 500, { error: "Server error" });
    }
  };
}

function str(value, max = 200) {
  return String(value === undefined || value === null ? "" : value).trim().slice(0, max);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

// "October 2, 2026" in Nigerian time, matching the dates already stored on orders.
function todayLabel(d = new Date()) {
  return new Intl.DateTimeFormat("en-US", { timeZone: "Africa/Lagos", month: "long", day: "numeric", year: "numeric" }).format(d);
}

module.exports = { HttpError, send, query, readBody, handler, str, isEmail, todayLabel };
