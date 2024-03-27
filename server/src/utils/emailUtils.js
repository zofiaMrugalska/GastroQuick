require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function confirmEmail(toEmail, verificationCode, link) {
  try {
    let mailOptions = await transporter.sendMail({
      from: "noreply@flowblog.com",
      to: toEmail,
      subject: "Verify Your Email",
      html: `
      <p>Your verification code is:</p>
      <p><strong>${verificationCode}</strong></p>
      <p>Click <a href="${link}">here</a> to verify your account.</p>`,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { confirmEmail };
