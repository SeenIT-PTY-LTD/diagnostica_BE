const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const sfSchema = new Schema({
    email:{
        type: String,
        required : true,
        
    },
    sf1:{
        type: String,
        required : true
    },
    sf2:{
        type: String,
        required : true
    },
    sf3:{
        type: String,
        required : true
    },
    sf4:{
        type: String,
        required : true
    },
    sf5:{
        type: String,
        required : true,
        
    },
    sf6:{
        type: String,
        required : true
    },
    sf7:{
        type: String,
        required : true
    },
    sf8:{
        type: String,
        required : true
    },
    sf9:{
        type: String,
        required : true
    },
    sf10:{
        type: String,
        required : true
    },
    sf11:{
        type: String,
        required : true
    },
    sf12:{
        type: String,
        required : true
    },
    sf13:{
        type: String,
        required : true
    },
    sf14:{
        type: String,
        required : true
    },
    sf15:{
        type: String,
        required : true
    },
    sf16:{
        type: String,
        required : true
    },
    sf17:{
        type: String,
        required : true
    },
    sf18:{
        type: String,
        required : true,
        
    },
    sf19:{
        type: String,
        required : true
    },
    sf20:{
        type: String,
        required : true
    },
    sf21:{
        type: String,
        required : true
    },
    sf22:{
        type: String,
        required : true
    },
    sf23:{
        type: String,
        required : true
    },
    sf24:{
        type: String,
        required : true
    },
    sf25:{
        type: String,
        required : true
    },
    sf26:{
        type: String,
        required : true
    },
    sf27:{
        type: String,
        required : true
    },
    sf28:{
        type: String,
        required : true,
        
    },
    sf29:{
        type: String,
        required : true
    },
    sf30:{
        type: String,
        required : true
    },
    sf31:{
        type: String,
        required : true
    },
    sf32:{
        type: String,
        required : true
    },
    sf33:{
        type: String,
        required : true
    },
    sf34:{
        type: String,
        required : true
    },
    sf35:{
        type: String,
        required : true
    },
    sf36:{
        type: String,
        required : true
    },
    time:{
        type : String,
        required :  true
    },
    date:{
        type : String,
        required : true,
    }
    
});


const SfModel = db.model('SF',sfSchema);

module.exports = SfModel;