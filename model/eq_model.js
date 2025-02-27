const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const eqSchema = new Schema({
    email:{
        type: String,
        required : true,
        
    },
    eq1:{
        type: String,
        required : true
    },
    eq2:{
        type: String,
        required : true
    },
    eq3:{
        type: String,
        required : true
    },
    eq4:{
        type: String,
        required : true
    },
    eq5:{
        type: String,
        required : true,
        
    },
    eq6:{
        type: String,
        required : true
    },
    time:{
        type:String,
        required: true,
    },
    date:{
        type:String,
        required:true,
    }
    
});


const EqModel = db.model('EQ',eqSchema);

module.exports = EqModel;