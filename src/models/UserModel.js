const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default : "doctor"
  },
  password: {
    type: String,
    required: true,
  },
  medicareNumber : {
    type: String,
    required: true,
  },
  genderSpecificCare : {
    type : Boolean
  },
  token : {
    type: String,
  },
  hospitals : {
    type : String
  },
  location : {
    type :String
  },
  pediatricSpecialist : {
    type : Boolean
  },
  specialization : {
    type : String
  },
  tokenExpiry :{
    type : Date
  },
  secretKey : {
    type : String
  },
  isActive : {
    type : Boolean,
    default : true
  }
},{ timestamps : true });

const DoctorModel = new mongoose.model('user',schema);

module.exports = DoctorModel;
       
      