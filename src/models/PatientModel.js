const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName:{
        type: String,
        required : true
    },
    lastName:{
        type: String,
        required : true
    },
    dob:{
        type: String,
        default:""
    },
    gender:{
        type: String,
        default:""
    },
    email:{
        type: String,
        required : true  
    },
    phone:{
        type: String,
        required : true
    },
    countryCode : {
        type : String,
        required : true
    },
    address:{
        type: String,
        default:""
    },
    state:{
        type: String,
        default:""
    },
    postcode:{
        type: String,
        default:""
    },
    password:{
        type: String,
        required : true
    },
    height :{
        type: String,
        default:""
    },
    weight : {
        type: String,
        default:""
    },
    bmi : {
        type: String,
        default:""
    },
    country : {
        type: String,
        default:""
    },
    urn : {
        type: String,
        default:""
    },
    isActive : {
        type : Boolean,
        default : true
    }

},{ timestamps : true });

const PatientModel = new mongoose.model('patient', schema);

module.exports = PatientModel;