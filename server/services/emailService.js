const nodemailer = require('nodemailer');
const config = require('../config/email');

const transporter = nodemailer.createTransport(config);

exports.sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"BrightPath" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};