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

const UpdateSubSectionPromt ={
    params : Joi.object({
    }),
    body : Joi.object({
      patientPromtId : Joi.string().required(),
      sectionId : Joi.string().required(),
      subSectionData : Joi.object().required()
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


module.exports = {
    GetBodyPartPromtMetadata,
    GetSectionMetadata,
    UpdateSubSectionPromt,
    GetUserSelectedImgPromt,
    AttemptedSubSectionByDate,
    CreatePatientPromt,
    AssignByDoctor
}