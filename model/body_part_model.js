const mongoose = require("mongoose");
const db = require('../config/db')

const { Schema } = mongoose;

const bodyPartSchema = new Schema({
    
    name : {
        type : String,
        required : true
    }
   
});

const BodyPartModel = db.model('bodyPart',bodyPartSchema);

module.exports = BodyPartModel;