const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Use Ethereal for testing if real credentials are not provided
  let transporter;
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail', // or your provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    console.log("No EMAIL_USER/EMAIL_PASS found in .env. Using Ethereal for testing.");
  }

  const mailOptions = {
    from: '"Ecom Experts" <noreply@priorsafe.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  const info = await transporter.sendMail(mailOptions);
  
  if (!process.env.EMAIL_USER) {
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
};

module.exports = sendEmail;
