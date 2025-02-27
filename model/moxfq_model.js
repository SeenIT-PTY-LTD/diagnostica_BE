const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const moxfqSchema = new Schema({
    email:{
        type: String,
        required : true,
        
    },
    m1:{
        type: String,
        required : true
    },
    m2:{
        type: String,
        required : true
    },
    m3:{
        type: String,
        required : true
    },
    m4:{
        type: String,
        required : true
    },
    m5:{
        type: String,
        required : true,
        
    },
    m6:{
        type: String,
        required : true
    },
    m7:{
        type: String,
        required : true
    },
    m8:{
        type: String,
        required : true
    },
    m9:{
        type: String,
        required : true
    },
    m10:{
        type: String,
        required : true
    },
    m11:{
        type: String,
        required : true
    },
    m12:{
        type: String,
        required : true
    },
    m13:{
        type: String,
        required : true
    },
    m14:{
        type: String,
        required : true
    },
    m15:{
        type: String,
        required : true
    },
    m16:{
        type: String,
        required : true
    },
    date:{
        type:String,
        required: true,
    },
    time: {
        type:String,
        required:true,
    }
});



const MoxfqModel = db.model('MOXFQ',moxfqSchema);

module.exports = MoxfqModel;