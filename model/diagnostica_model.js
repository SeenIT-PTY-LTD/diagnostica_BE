const express = require("express");
const mongoose = require("mongoose");
const db = require('../config/db')

const { Schema } = mongoose;

const diagnosticaSchema = new Schema({
    data : {
        type : String,
    },
    email : {
        type : String,
    },
    comment : {
        type : String,
        default:""
    },
    doctor : {
        type : String,
    },
    date: {
        type: String,
        
    },
    time: {
        type:String,
    }
});

const DiagnosticaModel = db.model('Diagnostica',diagnosticaSchema);

module.exports = DiagnosticaModel;