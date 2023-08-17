const SMTP_CONFIG = {
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
}

const SENDERMAIL = process.env.MAIL_USER

module.exports = { SMTP_CONFIG, SENDERMAIL }
