var mongoose = require('mongoose');
const { Schema } = mongoose;

var schema = new Schema({
    bodyPartId : {
        type: Schema.Types.ObjectId,
        ref: 'bodyParts',
        required : true
    },
    status : {
        type : String,
        default : "Pending"
    },
    patientId : {
        type :  Schema.Types.ObjectId,
        ref : "patients"
    },
    sections : {
        type : [],
        required : true
    },
    totalSections : {
        type : Number
    },
    completedSections : {
        type : Number
    },
    appointmentId : {
        type : String
    },
    appointmentRefId : {
        type :  Schema.Types.ObjectId,
        ref : "appointments"
    },
    isFollowUp : {
        type : Boolean,
        default : false
    }
},{ timestamps : true });

const PatientPromptsModel = new mongoose.model('patient_prompt', schema);

module.exports = PatientPromptsModel;