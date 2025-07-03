
const nodemailer = require('nodemailer');

class EmailService{

  static async sendEmail(to,subject, html) {

    try {

      const transporter = nodemailer.createTransport({
         host: "smtpout.secureserver.net",
         port: 465,
         secure: true,
         auth: {
          user: "info@diagnostica.app", // Ensure correct email
          pass: "Info@Diag@2052", // Ensure correct password or app password
        },
      });


      const mailOptions = {
        from: '"Website Enquiry Form" <support@diagnostica.app>',
        to: to,
        subject: subject,
        html: html
      };

      console.log(mailOptions)
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
}

module.exports = EmailService