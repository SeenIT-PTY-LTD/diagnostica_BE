const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    bodyPartId  : {
        type: Schema.Types.ObjectId, 
        ref: 'bodyParts',
        required : true
    },
    sectionId  : {
        type: Schema.Types.ObjectId, 
        ref: 'sections',
        required : true
    },
    subSectionId  : {
        type: Schema.Types.ObjectId, 
        ref: 'SubSections',
        required : true
    },
    refId : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    fildType : {
        type : String
    },
    column : {
        type : Number
    },
    options : {
        type : []
    },
    media : {
        type : []
    },
    sequence : {
        type : Number
    },
    isPublish : {
        type : Boolean,
        default : false
    }
    },{ timestamps : true }
);

const QuestionModel = new mongoose.model('question', schema);

module.exports = QuestionModel;