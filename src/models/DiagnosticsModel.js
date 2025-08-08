const mongoose = require('mongoose');
const { Schema} = require('mongoose')
const schema = new Schema({
    code : {
        type : String,
        required : true
    },
    doctorId : {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required : true
    },
    step : {
        type: Number,
        required : true
    },
    patientId : {
        type : String,
        ref: 'patient',
        required : true
    },
    status : {
        type : String,
        default : "Pending"
    },
    comment : {
        type : String
    }

},{ timestamps : true });

const DiagnosticsModel = new mongoose.model('diagnostic', schema);

module.exports = DiagnosticsModel;