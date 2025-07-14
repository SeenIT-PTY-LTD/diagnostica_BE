const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    fullName : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required: true
    },
    countryCode : {
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
        type: Schema.Types.ObjectId, 
        ref: 'users',
        required : true
    },
    bodyPart : {
        type: Schema.Types.ObjectId, 
        ref: 'bodyParts',
        required : true
    },
    deliveryMethod : {
        type : {}
    }},{ timestamps : true }
);

const RefferalModel = new mongoose.model('refferal', schema);

module.exports = RefferalModel;