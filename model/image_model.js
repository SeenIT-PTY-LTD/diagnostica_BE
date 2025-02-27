const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const imageSchema = new Schema({
    email:{
        type: String,
        required : true
    },
   
    img1:{
        type: String,
        default:""
    },
    img2:{
        type: String,
        default:""
    },
    img3:{
        type: String,
        default:""
    },
    img4:{
        type: String,
        default:""
    },
    img5:{
        type: String,
        default:""
    },
    img6:{
        type: String,
        default:""
    },
    date:{
        type:String,
        required : true
    },
    time:{
        type:String,
        required: true,
    }
    

});



const ImageModel = db.model('imageAns',imageSchema);

module.exports = ImageModel;