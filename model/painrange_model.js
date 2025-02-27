const express = require("express");
const mongoose = require("mongoose");
const db = require('../config/db')

const { Schema } = mongoose;

const painrangeSchema = new Schema({
    
    email : {
        type : String,
    },
   
    painrange:{
        type: String,
        required : true
    },
    session: {
        type: String
    },
});

const PainrangeModel = db.model('Painrange',painrangeSchema);

module.exports = PainrangeModel;