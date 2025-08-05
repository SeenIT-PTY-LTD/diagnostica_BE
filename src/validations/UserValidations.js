const Joi = require('joi')

const RegistrationValidation = {
    body : Joi.object({
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        password : Joi.string().required(),
        phone : Joi.string().required(),
        countryCode : Joi.string().required(),
        email : Joi.string().required(),
        medicareNumber : Joi.string().required(),
        genderSpecificCare : Joi.boolean().required(),
        hospitals : Joi.string(),
        location : Joi.string(),
        pediatricSpecialist : Joi.boolean(),
        specialization : Joi.string()
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
        phone : Joi.string().required()
    })
} 

const VerifyEmail ={
    body : Joi.object({
        email : Joi.string().required()
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
        email : Joi.string(),
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
       role : Joi.string(),
       page : Joi.string(),
       size : Joi.string()
    })
}


const DoctorForgotPasswordByEmail = {
    body : Joi.object({
        email : Joi.string().required(),
    })
}

const ResetPassword = {
  body: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required()
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
    VerifyEmail,
    GetAllEnteries,
    DoctorForgotPasswordByEmail,
    ResetPassword
}