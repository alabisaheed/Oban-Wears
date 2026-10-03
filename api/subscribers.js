// Public newsletter sign-up: POST {email}. Listed and managed in the dashboard.
const db = require("./_lib/db");
const { handler, send, readBody, str, isEmail, HttpError } = require("./_lib/http");

module.exports = handler({
  POST: async (req, res) => {
    const body = await readBody(req, 4 * 1024);
    if (body.website) throw new HttpError(400, "Rejected"); // honeypot field for bots
    const email = str(body.email, 120).toLowerCase();
    if (!isEmail(email)) throw new HttpError(400, "Please enter a valid email address");
    // createIfAbsent keeps the original sign-up date for repeat subscribers.
    await db.createIfAbsent("subscribers", email, { email, timestamp: new Date().toISOString(), status: "Active" });
    send(res, 201, { ok: true });
  }
});
