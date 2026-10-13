const nodemailer = require("nodemailer");

// Sends mail through a standard SMTP mailbox -- e.g. Hostinger webmail
// (quotation@yourdomain.com) -- rather than a personal Gmail account.
// Sending from your own business domain also tends to land in the
// inbox more reliably than a personal Gmail address, since Hostinger
// sets up proper SPF/DKIM for domains it hosts.
//
// Works with any standard SMTP provider, not just Hostinger -- just
// change EMAIL_HOST/EMAIL_PORT/EMAIL_SECURE in .env if you switch later.
function getTransporter() {
  const emailPassword =
    process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD;

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.hostinger.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,

    auth: {
      user: process.env.EMAIL_USER,
      pass: emailPassword,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

// Sends an email. Never throws -- logs and returns false on failure so
// a broken email config can't take down the request that triggered it
// (e.g. a quote is already saved in the database; the person shouldn't
// see an error just because the notification email didn't go out).
//
// `attachments` follows nodemailer's format:
// [{ filename: "file.pdf", content: bufferOrString }]
async function sendEmail({ to, subject, html, attachments }) {
  if (!process.env.EMAIL_USER || !(process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD)) {
    console.warn(
      "Email not sent -- EMAIL_USER and EMAIL_APP_PASSWORD (or EMAIL_PASSWORD) must be set in .env"
    );
    return false;
  }

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"Discover Websoft" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    });
    console.log(`Email sent to ${to} (messageId: ${info.messageId})`);
    return true;
  } catch (err) {
    // err.code (e.g. "EAUTH" for wrong credentials, "ECONNECTION" for a
    // blocked/unreachable SMTP host) is usually the actually useful part
    // -- err.message alone is often just a generic wrapper around it.
    console.error(
      `Failed to send email to ${to}:`,
      err.code ? `[${err.code}] ${err.message}` : err.message
    );
    return false;
  }
}

module.exports = { sendEmail };
