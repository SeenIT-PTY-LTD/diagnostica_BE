const Joi = require('joi')

const CreateRefferal ={
    body : Joi.object({
        fullName : Joi.string().required(),
        mobile : Joi.string().required(),
        countryCode : Joi.string().required(),
        email : Joi.string().required(),
        doctorName : Joi.string().required(),
        doctorId : Joi.string().required(),
        bodyPart : Joi.string().required(),
        deliveryMethod : Joi.string().required()
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
    CreateRefferal,
    idParamsModel,
    GetAllEnteries
}