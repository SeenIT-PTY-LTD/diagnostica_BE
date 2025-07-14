const Joi = require('joi')

const CreateEnteryValidation ={
    body : Joi.object({
       name : Joi.string().required(),
       sectionId : Joi.string().required(),
       data : Joi.array().required()
    })
} 

const UpdateEntery = {
    params : Joi.object({
        id : Joi.string().required()
    }),
    body : Joi.object({
        name : Joi.string(),
        sectionId : Joi.string(),
        instruction : Joi.string()
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

const GetSubSectionMetadata = {
    query : Joi.object({
       sectionId : Joi.string().required(),
       patientId : Joi.string().required()
    })
}

module.exports = {
    CreateEnteryValidation,
    UpdateEntery,
    idParamsModel,
    GetAllEnteries,
    GetSubSectionMetadata

}