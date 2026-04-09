const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  
  family: 4, 
  tls: {
    rejectUnauthorized: false,
    family: 4 
  },
  
  connectionTimeout: 20000, 
  greetingTimeout: 20000,
  socketTimeout: 20000,
});

const sendEmail = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Inanst Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: text, 
    });
    console.log("Email sent successfully to:", email);
  } catch (error) {
    
    console.error("Email delivery failed:", error.message);
    throw error;
  }
};

module.exports = sendEmail;