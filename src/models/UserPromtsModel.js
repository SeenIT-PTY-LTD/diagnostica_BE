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
    compltedSections : {
        type : Number
    }
},{ timestamps : true });

const UserPromtsModel = new mongoose.model('userPromts', schema);

module.exports = UserPromtsModel;