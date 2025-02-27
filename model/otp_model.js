const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const OtpSchema = new Schema({
    email: {
        type: String,
        required: true,
      },
      otp: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, 
      },

});

const OTPModel = db.model('OTP',OtpSchema);

module.exports = OTPModel;