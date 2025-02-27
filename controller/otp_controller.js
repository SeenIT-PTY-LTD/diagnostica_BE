const OTPServices = require('../services/otp_services');
const bcrypt = require('bcrypt');

exports.generateOTP = async (req, res) => {
    const { email } = req.body;
  
    try {
      const result = await OTPServices.generateAndSaveOTP(email);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.verify = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const user = await OTPServices.verifyotp(email, otp);

        if (!user) {
           return res.status(401).json({ message: 'invalid user' })
        }
        const isMatch = await bcrypt.compare(otp,user.otp);

        if (!isMatch) {
           return res.status(401).json({ message: 'Invalid Otp' })
        }

        return res.status(200).json({ message: 'OTP verified successfully' });

    } catch (error) {
       next(error);
        
    }
}