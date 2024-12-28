import { config } from "dotenv";
import sgMail from "@sendgrid/mail";
import {
  activationEmailTemplate,
  resetPasswordTemplate,
} from "../templates/emailTemlpates.js";

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const formatSenderEmail = (email, name = "") => ({
  email,
  name: name || email,
});

/**
 * Send email using SendGrid
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string|Object} options.from - Sender email address or object
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content (optional)
 * @returns {Promise<Object>} SendGrid response
 */
const sendEmail = async ({ to, from, subject, text, html }) => {
  if (!to || !from || !subject || !text) {
    throw new Error("Missing required parameters");
  }

  try {
    const msg = {
      to,
      from: typeof from === "string" ? formatSenderEmail(from) : from,
      subject,
      text,
      html: html || text,
    };

    const response = await sgMail.send(msg);
    console.log("Email sent successfully");
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error("SendGrid error:", error.response.body);
    }
    throw error;
  }
};

/**
 * Sends an account activation email
 */
const sendActivationEmail = async (to, activationLink) => {
  return sendEmail({
    to,
    from: formatSenderEmail(process.env.SENDGRID_EMAIL, process.env.APP_NAME),
    ...activationEmailTemplate(activationLink),
  });
};

/**
 * Sends a password reset email
 */
const sendResetPasswordEmail = async (to, resetCode) => {
  return sendEmail({
    to,
    from: formatSenderEmail(process.env.SENDGRID_EMAIL, process.env.APP_NAME),
    ...resetPasswordTemplate(resetCode),
  });
};

export { sendEmail, sendActivationEmail, sendResetPasswordEmail };
