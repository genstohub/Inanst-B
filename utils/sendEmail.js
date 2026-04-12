const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, 
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        // IMPORTANT: Forces IPv4 to fix Render's ENETUNREACH error
        family: 4, 
        
        connectionTimeout: 15000, 
        greetingTimeout: 15000,
        socketTimeout: 20000,
        tls: {
            rejectUnauthorized: false,
            minVersion: "TLSv1.2"
        }
    });

    try {
        await transporter.sendMail({
            from: `"Inanst Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error("Nodemailer Error on Render:", error.message);
        throw error; 
    }
};

module.exports = sendEmail;