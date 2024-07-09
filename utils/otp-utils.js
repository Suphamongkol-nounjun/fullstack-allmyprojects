const nodemailer = require('nodemailer');
const { poolPromise } = require('../config/db')

async function generateOTP(email) {
  const [rows] = await poolPromise.query('Delete FROM otplog WHERE email = ?', [email]);
  return Math.floor(100000 + Math.random() * 900000).toString();
}
async function sendEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp} expire in 5 minute`,
  });
}
async function checkEmailExists(email) {
    console.log(email)
    const [rows] = await poolPromise.query('SELECT email FROM users WHERE email = ?', [email]);
    return rows.length > 0;
}
  async function getLatestOTP(email) {
    try {
        const [rows] = await poolPromise.query('SELECT otp FROM otplog WHERE email = ? ORDER BY createDate DESC LIMIT 1', [email]);
        console.log(rows)
      if (rows.length > 0) {
        return rows[0].otp;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Database query error:', error);
  }
}

module.exports = { generateOTP, sendEmail, checkEmailExists, getLatestOTP };
