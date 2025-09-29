const Joi = require('joi');

const createSurveyValidation = {
    body:  Joi.object({ 
        name : Joi.string().required(),
        medicareNumber : Joi.string().required(),
        monthYear : Joi.string().required(),
       surveyForm: Joi.object({   
    additionalComments: Joi.string().optional().allow(''),
    frequencyOfUse: Joi.string().required(),
    complications: Joi.string().when('frequencyOfUse', {
        is: Joi.valid('Never'),
        then: Joi.optional().allow(''),
        otherwise: Joi.required().messages({ 'any.required': 'Complications is required' })
    }),
    complicationsDescription: Joi.string().optional().allow(''),
    easeOfShaping: Joi.string().when('frequencyOfUse', {
        is: 'Never',
        then: Joi.optional().allow(''),
        otherwise: Joi.required().messages({ 'any.required': 'Ease of shaping is required' })
    }),
    handlingCharacteristics: Joi.string().when('frequencyOfUse', {
        is: 'Never',
        then: Joi.optional().allow(''),
        otherwise: Joi.required().messages({ 'any.required': 'Handling characteristics is required' })
    }),
    osteoconductive: Joi.string().when('frequencyOfUse', {
        is: 'Never',
        then: Joi.optional().allow(''),
        otherwise: Joi.required().messages({ 'any.required': 'Osteoconductive is required' })
    }),
    radiologicalEvidence: Joi.string().when('frequencyOfUse', {
        is: 'Never',
        then: Joi.optional().allow(''),
        otherwise: Joi.required().messages({ 'any.required': 'Radiological evidence is required' })
    }),
    stability: Joi.string().when('frequencyOfUse', {
        is: 'Never',
        then: Joi.optional().allow(''),
        otherwise: Joi.required().messages({ 'any.required': 'Stability is required' })
    }),
    materials: Joi.array().items(Joi.string()).optional(),
    recommendation: Joi.string().required(),
    satisfaction: Joi.string().required(),
    surgicalProcedures: Joi.array().items(Joi.string()).optional(),
    otherProcedure: Joi.string().optional().allow('')
}).required()

    })
}
const GetAllEnteries ={
    query : Joi.object({ 
        medicareNumber : Joi.string(),
        page : Joi.number().optional(),
        limit : Joi.number().optional(),
        sortBy : Joi.string().optional(),
        sortOrder : Joi.string().valid('asc','desc').optional()
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