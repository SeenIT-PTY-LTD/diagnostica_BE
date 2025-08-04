const Joi = require('joi')

const RegistrationValidation ={
    body : Joi.object({
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        password : Joi.string().required(),
        phone : Joi.string().required(),
        countryCode : Joi.string().required(),
        dob : Joi.string().required(),
        gender : Joi.string().required(),
        email : Joi.string().required(),
        country : Joi.string().allow("",null),
        urn : Joi.string().allow("",null),
        height : Joi.string().allow("",null),
        weight : Joi.string().allow("",null),
        address : Joi.string().allow("",null),
        state : Joi.string().allow("",null),
        postcode : Joi.string().allow("",null),
        // token : Joi.string().required()
    })
} 

const Login ={
    body : Joi.object({
        email : Joi.string().required(),
        password : Joi.string().required()
    })
} 

const VerifyPhone ={
    body : Joi.object({
        phone : Joi.string().required(),
        countryCode : Joi.string().required()
    })
} 

const Update = {
    params : Joi.object({
        id : Joi.string().required()
    }),
    body : Joi.object({
        firstName : Joi.string(),
        lastName : Joi.string(),
        phone : Joi.string(),
        dob : Joi.string(),
        gender : Joi.string(),
        email : Joi.string(),
        country : Joi.string(),
        urn : Joi.string(),
        height : Joi.string(),
        weight : Joi.string(),
        address : Joi.string(),
        state : Joi.string(),
        postcode : Joi.string(),
        patientCode : Joi.string(),
        medicareNumber: Joi.string(),
    })
}

const ResetPasswordByEmail = {
    body : Joi.object({
        password : Joi.string().required(),
        email : Joi.string().required(),
       
    })
}

const ResetPasswordByPhone = {
    body : Joi.object({
        password : Joi.string().required(),
        phone : Joi.string().required(),
        countryCode : Joi.string().required()
   
    })
}

const idParamsModel = {
    params : Joi.object({
       id : Joi.string().required()
    })
}

const GetAllEnteries = {
    query : Joi.object({
       page : Joi.number(),
       size : Joi.number(),
       search : Joi.string(),
       searchCriteria : Joi.string()
    })
}

module.exports = {
    RegistrationValidation,
    Login,
    VerifyPhone,
    Update,
    ResetPasswordByEmail,
    ResetPasswordByPhone,
    idParamsModel,
    GetAllEnteries
}