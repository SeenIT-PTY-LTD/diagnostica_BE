const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const schema = new Schema({
    
    doctorId : {
        type: Schema.Types.ObjectId, 
        ref: 'users'    
    },
    patientId : {
       type: Schema.Types.ObjectId, 
       ref: 'patients',
       required : true
    },
    appointmentId : {
       type: String, 
       required : true
    },
    patientPromtIds : {
        type : []
    }
},{ timestamps : true }
);

const SubSectionModel = new mongoose.model('appointment', schema);

module.exports = SubSectionModel;