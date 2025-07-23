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
        default : "petients"
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
        default : "petients"
    }
},{ timestamps : true });

const PatientPromtsModel = new mongoose.model('patient_promt', schema);

module.exports = PatientPromtsModel;