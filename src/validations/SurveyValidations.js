const Joi = require('joi');

const createSurveyValidation = {
    body: Joi.object({
        name : Joi.string(),
        medicareNumber : Joi.string(),
        monthYear : Joi.string(),
        type : Joi.string().valid("adbone").required(),
        surveyForm : Joi.object({   
            additionalComments : Joi.string().optional().allow(''),
            complications : Joi.string().optional().allow(''),
            complicationsDescription : Joi.string().optional().allow(''),
            easeOfShaping : Joi.string().optional().allow(''),
            frequencyOfUse : Joi.string().optional().allow(''),
            handlingCharacteristics : Joi.string().optional().allow(''),
            materials : Joi.array().items(Joi.string()),
            osteoconductive : Joi.string().optional().allow(''),
            otherProcedure : Joi.string().optional().allow('').optional().allow(''),
            radiologicalEvidence : Joi.string().optional().allow(''),
            recommendation : Joi.string().optional().allow(''),
            satisfaction : Joi.string().optional().allow(''),
            stability : Joi.string().optional().allow(''),
            surgicalProcedures : Joi.array().items(Joi.string()),
            skeletonPositions : Joi.array()
        })
    })
}
const GetAllEnteries ={
    query : Joi.object({ 
        medicareNumber : Joi.string(),
        page : Joi.number().optional(),
        limit : Joi.number().optional(),
        sortBy : Joi.string().optional(),
        sortOrder : Joi.string().valid('asc','desc').optional(),
        type : Joi.string()
    })
}

const GetOneEntery ={
    params : Joi.object({ 
        id : Joi.string().required()
    })
}

const UpdateSingleSurvey = {
    params : Joi.object({ 
        id : Joi.string().required()
    }),
    body : Joi.object({
        name : Joi.string(),
        medicareNumber : Joi.string(),
        monthYear : Joi.string(),
        surveyForm : Joi.object({   
            additionalComments : Joi.string().optional().allow(''),
            complications : Joi.string(),
            complicationsDescription : Joi.string().optional().allow(''),
            easeOfShaping : Joi.string(),
            frequencyOfUse : Joi.string(),
            handlingCharacteristics : Joi.string(),
            materials : Joi.array().items(Joi.string()),
            osteoconductive : Joi.string(),
            otherProcedure : Joi.string().optional().allow(''),
            radiologicalEvidence : Joi.string(),
            recommendation : Joi.string(),
            satisfaction : Joi.string(),
            stability : Joi.string(),
            surgicalProcedures : Joi.array().items(Joi.string())
        })
    })
}

module.exports = {
    createSurveyValidation,
    GetAllEnteries,
    GetOneEntery,
    UpdateSingleSurvey
};