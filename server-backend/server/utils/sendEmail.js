const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html, attachments }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("Email not sent -- RESEND_API_KEY is missing");
    return false;
  }

  try {
    const emailData = {
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to,
      subject,
      html,
    };

    // Keep quotation PDF / Terms PDF attachments
    if (attachments && attachments.length > 0) {
      emailData.attachments = attachments.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
      }));
    }

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Resend email error:", error);
      return false;
    }

    console.log(
      `Email sent to ${to} (messageId: ${data?.id || "unknown"})`
    );

    return true;
  } catch (err) {
    console.error(`Failed to send email to ${to}:`, err.message);
    return false;
  }
}

module.exports = { sendEmail };