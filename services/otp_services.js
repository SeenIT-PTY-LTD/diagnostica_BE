const OTPModel = require('../model/otp_model');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { generateOTP } = require('../Utilities/generateotp');

class OTPServices {
  static async generateAndSaveOTP(email) {
    try {

      //const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

      const otp = generateOTP(4); 

      const hashedOTP = await bcrypt.hash(otp, 10);

      // Save OTP in database
      await OTPModel.create({ email, otp:hashedOTP });

      // Send OTP via email
      await this.sendOTPEmail(email, otp);

      return { message: 'OTP generated, saved, and sent successfully' };
    } catch (error) {
      throw new Error('Failed to generate, save, and send OTP');
    }
  };

  static async sendOTPEmail(email, otp) {
    try {
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'rdkumar881@gmail.com', 
            pass: 'tgva evuh sshs tqfd', 
          },
      });

      const mailOptions = {
        from: 'rdkumar881@gmail.com',
        to: `${email}`,
        subject: 'Your OTP for verification',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DIAGNOSTICA</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p> Use the following OTP to change your password. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;"><br />Thank You</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent with OTP successfully:', info.response);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }

  static async verifyotp(email) {
    try {
        return await OTPModel.findOne({ email });
    } catch (error) {
        throw error;
    }
}

}

module.exports = OTPServices;

