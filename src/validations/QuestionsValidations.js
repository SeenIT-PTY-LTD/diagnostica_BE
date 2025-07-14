const Joi = require('joi')

const CreateEnteryValidation ={
    body : Joi.object({
       refId : Joi.string().required(),
       bodyPartId : Joi.string().required(),
       sectionId  : Joi.string().required(),
       subSectionId  : Joi.string().required(),
       type : Joi.string().valid().required(),
       description : Joi.string().required(),
       fildType : Joi.string().valid("radio","checkbox","range"),
       column : Joi.number(),
       options : Joi.array(),
       media : Joi.array(),
       sequence : Joi.number(),
       isPublish : Joi.boolean()
    })
} 

const updatePublishStatusQuestion = {
     body : Joi.object({
       isPublish : Joi.boolean().required()
    })
}

const UpdateEntery = {
    params : Joi.object({
        id : Joi.string().required()
    }),
    body : Joi.object({
       bodyPartId : Joi.string(),
       sectionId  : Joi.string(),
       subSectionId  : Joi.string(),
       type : Joi.string().valid(),
       description : Joi.string(),
       fildType : Joi.string().valid("radio","checkbox","range"),
       column : Joi.number(),
       options : Joi.array(),
       media : Joi.array(),
       sequence : Joi.number(),
       isPublish : Joi.boolean()
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