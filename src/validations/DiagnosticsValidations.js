const Joi = require('joi')

const CreateEnteryValidation ={
    body : Joi.object({
        code : Joi.string().required(),
        doctorId :Joi.string().required(),
        step : Joi.number().required(),
        patientId : Joi.string().required(),
        comment: Joi.string(),
        status : Joi.string()
    })
} 


const UpdateEntery = {
    params : Joi.object({
        id : Joi.string().required()
    }),
    body : Joi.object({
        code : Joi.string().required(),
        step : Joi.number().required(),
        comment : Joi.string(),
        status : Joi.string()
    })
}

const idParamsModel = {
    params : Joi.object({
       id : Joi.string().required()
    })
}

const GetAllEnteries = {
    query : Joi.object({
       search : Joi.string(),
       searchCriteria : Joi.string()
    })
}

module.exports = {
    CreateEnteryValidation,
    UpdateEntery,
    idParamsModel,
    GetAllEnteries
}