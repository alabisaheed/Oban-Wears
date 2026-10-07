// Sends the dashboard sign-in code email.
//
// Configure one of these in Vercel (Project → Settings → Environment Variables):
//   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS   e.g. a cPanel mailbox
//   RESEND_API_KEY                                            https://resend.com
// plus MAIL_FROM, e.g. "Oban Wears <noreply@obanwears.com>".
// Without either, local development prints the code to the terminal.
const { HttpError } = require("./http");

const MAIL_FROM = process.env.MAIL_FROM || process.env.SMTP_USER || "Oban Wears <noreply@obanwears.com>";

// Tests read sent messages from here instead of sending them.
const outbox = [];

function configured() {
  return Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);
}

async function sendViaResend(message) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: MAIL_FROM, to: [message.to], subject: message.subject, text: message.text })
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

async function sendViaSmtp(message) {
  const nodemailer = require("nodemailer");
  const port = Number(process.env.SMTP_PORT) || 465;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
  });
  await transport.sendMail({ from: MAIL_FROM, to: message.to, subject: message.subject, text: message.text });
}

async function send(message) {
  if (process.env.OBAN_TEST_MAIL) {
    outbox.push(message);
    return;
  }
  if (!configured()) {
    if (process.env.VERCEL) throw new HttpError(503, "Sign-in codes cannot be emailed yet: email sending is not configured on the server.");
    console.log(`[mail] to ${message.to}: ${message.subject}`);
    return;
  }
  try {
    if (process.env.RESEND_API_KEY) await sendViaResend(message);
    else await sendViaSmtp(message);
  } catch (err) {
    console.error("Sign-in code email failed:", err);
    throw new HttpError(502, "We could not email your sign-in code. Please try again in a minute.");
  }
}

// Plain text with the code in the subject and no links, so spam filters let it through.
function sendLoginCode(to, code, minutes) {
  return send({
    to,
    subject: `${code} is your Oban Wears sign-in code`,
    text: [
      `Your Oban Wears dashboard sign-in code is ${code}`,
      "",
      `It expires in ${minutes} minutes and works once.`,
      "If you did not try to sign in, you can ignore this email; nobody can sign in without this code.",
      "",
      "Oban Wears"
    ].join("\n")
  });
}

// Settings → "Send test email": same path as sign-in codes, but reports the
// mail server's own error so a wrong SMTP setting can be spotted.
async function sendTest(to) {
  const message = {
    to,
    subject: "Oban Wears dashboard email test",
    text: "This is a test from the Oban Wears dashboard. If you can read it, sign-in codes can be emailed.\n\nOban Wears"
  };
  if (process.env.OBAN_TEST_MAIL) {
    outbox.push(message);
    return { via: "test" };
  }
  if (!configured()) throw new HttpError(503, "Email is not configured: add SMTP_HOST, SMTP_USER and SMTP_PASS (or RESEND_API_KEY) in Vercel.");
  try {
    if (process.env.RESEND_API_KEY) await sendViaResend(message);
    else await sendViaSmtp(message);
  } catch (err) {
    throw new HttpError(502, `The mail server refused the message: ${String(err && err.message || err).slice(0, 300)}`);
  }
  return { via: process.env.RESEND_API_KEY ? "Resend" : `SMTP ${process.env.SMTP_HOST}` };
}

module.exports = { sendLoginCode, sendTest, configured, outbox };
