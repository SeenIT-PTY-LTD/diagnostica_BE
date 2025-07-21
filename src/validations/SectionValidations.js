const Joi = require('joi')

const CreateEnteryValidation ={
    body : Joi.object({
       name : Joi.string().required(),
       bodyPartId : Joi.string().required(),
       sectionCode : Joi.string().required()
    })
} 


const UpdateEntery = {
    params : Joi.object({
        id : Joi.string().required()
    }),
    body : Joi.object({
        name : Joi.string(),
        bodyPartId : Joi.string()
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
       searchCriteria : Joi.string(),
       filters : Joi.string()
    })
}

module.exports = {
    CreateEnteryValidation,
    UpdateEntery,
    idParamsModel,
    GetAllEnteries
}