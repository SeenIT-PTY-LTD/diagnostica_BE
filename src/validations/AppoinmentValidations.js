const Joi = require('joi')

const GetAppoinmentByDoctor ={
    query : Joi.object({
        doctorId :Joi.string().required(),
        patientId : Joi.string().required()
    })
} 

const GetAppoinmentByPatient ={
    query : Joi.object({
        patientId : Joi.string().required()
    })
} 
const GetSectionsByAppointment = {
     query : Joi.object({
        appointmentId :Joi.string().required()
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

const GetSectionAttemptedData = {
    query : Joi.object({
        appointmentRefId : Joi.string().required(),
        sectionId : Joi.string().required()
    })
}

module.exports = {
    GetAppoinmentByDoctor,
    idParamsModel,
    GetAllEnteries,
    GetSectionsByAppointment,
    GetAppoinmentByPatient,
    GetSectionAttemptedData
}