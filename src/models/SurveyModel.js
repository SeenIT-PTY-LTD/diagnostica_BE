var mongoose = require('mongoose');
const { Schema } = mongoose;


const surveyFormSchema = new Schema({   
    additionalComments : {
        type : String,
    },
    complications : {
        type : String,
    },
    complicationsDescription : {
        type : String,
    },
    easeOfShaping : {
        type : String,
    },
    frequencyOfUse : {
        type : String,
    },
    handlingCharacteristics : {
        type : String,
    },
    materials : {
        type : [String],
    },
    osteoconductive : {
        type : String,
    },
    otherProcedure : {
        type : String,
    },
    radiologicalEvidence : {
        type : String,
    },
    recommendation : {
        type : String,
    },
    satisfaction : {
        type : String,
    },
    stability : {
        type : String,
    },
    surgicalProcedures : {
        type : [String],
    }
})
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
        type : surveyFormSchema, 
        required : true 
    },surveyRefId : {
        type : String,
        required : true
    }

}, { timestamps     : true });


const SurveyModel = new mongoose.model('survey', schema);

module.exports = SurveyModel;