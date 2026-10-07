// Staff sign-in for the dashboard.
//   POST {action: "login", email, password}           -> {otpRequired, challenge, destination}  (code emailed)
//   POST {action: "register", name, email, password}  -> same; the email must be authorised by an admin
//   POST {action: "verify", challenge, code}          -> {token, user}
//   POST {action: "resend", challenge}                -> {destination}
//   POST {action: "changePassword", current, password} (Bearer token)
//   GET  (Bearer token)                                returns the signed-in user
// With LOGIN_OTP=off the code step is skipped and login returns {token, user}.
const db = require("./_lib/db");
const auth = require("./_lib/auth");
const mail = require("./_lib/mail");
const { handler, send, readBody, str, isEmail, HttpError } = require("./_lib/http");

const MIN_PASSWORD_LENGTH = 8;

function publicUser(user) {
  return { email: user.email, name: user.name, role: user.role };
}

async function checkPassword(body) {
  const email = str(body.email, 120).toLowerCase();
  const password = String(body.password || "");
  if (!email || !password) throw new HttpError(400, "Please enter your email and password");

  const attempts = await auth.assertNotLocked("staff", email);
  const staff = await db.get("staff", email);
  let user = null;

  const adminPassword = process.env.ADMIN_PASSWORD || "";
  if (auth.envAdmins().includes(email) && adminPassword && auth.safeEqual(password, adminPassword)) {
    user = { email, name: (staff && staff.name) || process.env.ADMIN_NAME || "Admin", role: "admin" };
  } else if (staff && staff.status !== "disabled" && auth.verifySecret(password, staff.passwordHash)) {
    user = { email, name: staff.name || "Staff", role: staff.role };
  }

  if (!user) {
    await auth.recordFailure("staff", email, attempts);
    throw new HttpError(401, "Incorrect email or password");
  }
  await auth.clearFailures("staff", email);
  return user;
}

async function register(body) {
  const name = str(body.name, 100);
  const email = str(body.email, 120).toLowerCase();
  const password = String(body.password || "");
  if (!name || !isEmail(email)) throw new HttpError(400, "Please enter your name and a valid email");
  if (password.length < MIN_PASSWORD_LENGTH) throw new HttpError(400, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`);

  const invite = await db.get("staffInvites", email);
  if (!invite) throw new HttpError(403, "This email has not been authorised. Ask an admin to add it under Staff.");
  if (await db.get("staff", email)) throw new HttpError(409, "An account already exists for this email. Please sign in.");

  const user = { email, name, role: auth.ROLES.includes(invite.role) ? invite.role : "editor" };
  await db.put("staff", email, { ...user, passwordHash: auth.hashSecret(password), createdAt: new Date().toISOString() });
  await db.remove("staffInvites", email);
  return user;
}

// Password accepted: email a code, or sign straight in when codes are switched off.
async function startSignIn(user) {
  if (!auth.loginCodesEnabled()) return { token: auth.staffToken(user), user: publicUser(user) };
  const { id, code } = await auth.createChallenge(user);
  await mail.sendLoginCode(user.email, code, auth.CODE_TTL_MINUTES);
  return { otpRequired: true, method: "email", challenge: id, destination: auth.maskEmail(user.email) };
}

async function changePassword(req, body) {
  const session = auth.requireStaff(req);
  const password = String(body.password || "");
  if (password.length < MIN_PASSWORD_LENGTH) throw new HttpError(400, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  const staff = await db.get("staff", session.email);
  if (!staff) throw new HttpError(400, "Owner passwords are changed in the hosting settings (ADMIN_PASSWORD).");
  if (!auth.verifySecret(String(body.current || ""), staff.passwordHash)) throw new HttpError(401, "Your current password is not right");
  await db.put("staff", session.email, { ...staff, passwordHash: auth.hashSecret(password), passwordChangedAt: new Date().toISOString() });
}

module.exports = handler({
  GET: async (req, res) => {
    const user = auth.requireStaff(req);
    send(res, 200, { user: publicUser(user) });
  },

  POST: async (req, res) => {
    const body = await readBody(req, 8 * 1024);
    switch (body.action) {
      case "login":
        return send(res, 200, await startSignIn(await checkPassword(body)));
      case "register":
        return send(res, 200, await startSignIn(await register(body)));
      case "verify": {
        const user = await auth.verifyChallenge(body.challenge, body.code);
        return send(res, 200, { token: auth.staffToken(user), user: publicUser(user) });
      }
      case "resend": {
        const { email, code } = await auth.refreshChallenge(body.challenge);
        await mail.sendLoginCode(email, code, auth.CODE_TTL_MINUTES);
        return send(res, 200, { destination: auth.maskEmail(email) });
      }
      case "changePassword":
        await changePassword(req, body);
        return send(res, 200, { ok: true });
      default:
        throw new HttpError(400, "Unknown action");
    }
  }
});
