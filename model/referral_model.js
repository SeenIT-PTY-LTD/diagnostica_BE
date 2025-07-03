const mongoose = require("mongoose");
const db = require('../config/db')

const { Schema } = mongoose;

const referralSchema = new Schema({
    
    fullName : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    doctorName : {
        type : String,
        required : true
    },
    doctorId : {
        type : String,
        required : true
    },
    bodyPart : {
        type : String,
        required : true
    },
    deliveryMethod : {
        type : {}
    }},
{ timestamps: true });

const ReferralModel = db.model('referral',referralSchema);

module.exports = ReferralModel;