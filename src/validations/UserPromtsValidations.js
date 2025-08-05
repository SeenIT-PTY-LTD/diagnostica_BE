const Joi = require('joi')

const GetBodyPartPromtMetadata ={
    query : Joi.object({
      bodyPartId : Joi.string().required(),
      patientId : Joi.string().required()
    })
} 

const GetSectionMetadata ={
    query : Joi.object({
      patientId : Joi.string().required(),
      sectionId : Joi.string().required(),
      patientPromtId : Joi.string().required()
    })
} 

const UpdateSubSectionPrompt ={
   
    body : Joi.object({
      patientPromptId : Joi.string().required(),
      sectionId : Joi.string().required(),
      sectionData : Joi.object().required()
    })
} 

const GetUserSelectedImgPromt ={
    query : Joi.object({
      bodyPartId : Joi.string(),
      patientId : Joi.string().required(),
      sectionId : Joi.string()
    })
} 

const AttemptedSubSectionByDate={
    query : Joi.object({
      bodyPartId : Joi.string().required(),
      patientId : Joi.string().required(),
      subSectionId : Joi.string()
    })
} 


const CreatePatientPromt ={
    body : Joi.object({
      bodyPartId : Joi.string().required(),
      patientId : Joi.string().required()
    })
} 

const AssignByDoctor ={
    body : Joi.object({
      bodyPartId : Joi.string().required(),
      patientId : Joi.string().required(),
      appoinmentRefId : Joi.string().required()
    })
} 

const GetPromtsByBodypart = {
    query : Joi.object({
      bodyPartId : Joi.string().required(),
    })
}

module.exports = {
    GetBodyPartPromtMetadata,
    GetSectionMetadata,
    UpdateSubSectionPrompt,
    GetUserSelectedImgPromt,
    AttemptedSubSectionByDate,
    CreatePatientPromt,
    AssignByDoctor,
    GetPromtsByBodypart
}