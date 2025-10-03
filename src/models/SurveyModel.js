var mongoose = require('mongoose');
const { Schema } = mongoose;

var schema = new Schema({
    name : {
        type : String,
        required : true
    },
    medicareNumber : {
        type : String,
        required : true
    },
    monthYear : {
        type : String,
        required : true
    },
    surveyForm : { 
        type : {},
        required : true 
    },
    surveyRefId : {
        type : String,
        required : true
    },
    skeletonPositions : {
        type : []
    },
    type : {
        type : String,
        required : true
    }

}, { timestamps  : true });


const SurveyModel = new mongoose.model('survey', schema);

module.exports = SurveyModel;