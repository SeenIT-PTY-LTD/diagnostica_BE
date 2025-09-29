const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  uniqRegId : {
    type : String,
    required : true
  },
  logo : {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  state : {
    type: String,
    required: true,
  },
  city : {
    type: String,
    required: true,
  },
  pincode : {
    type : String,
    required : true
  },
  address : {
    type : String,
    required : true
  }
 
},{ timestamps : true });

const HospitalModel = new mongoose.model('hospital',schema);

module.exports = HospitalModel;
       
      