const Joi = require('joi')

const GetBodyPartPromtMetadata ={
    query : Joi.object({
      bodyPartId : Joi.string().required(),
      patientId : Joi.string().required()
    })
} 

const GetSectionMetadata ={
    query : Joi.object({
      bodyPartId : Joi.string().required(),
      patientId : Joi.string().required(),
      sectionId : Joi.string().required()
    })
} 

const UpdateSubSectionPromt ={
    body : Joi.object({
      bodyPartId : Joi.string().required(),
      patientId : Joi.string().required(),
      sectionId : Joi.string().required(),
      subSectionData : Joi.array().required()
    })
} 

const GetUserSelectedImgPromt ={
    query : Joi.object({
      bodyPartId : Joi.string().required(),
      patientId : Joi.string().required(),
      sectionId : Joi.string().required()
    })
} 

const AttemptedSubSectionByDate={
    query : Joi.object({
      bodyPartId : Joi.string().required(),
      patientId : Joi.string().required(),
      subSectionId : Joi.string()
    })
} 
module.exports = {
    GetBodyPartPromtMetadata,
    GetSectionMetadata,
    UpdateSubSectionPromt,
    GetUserSelectedImgPromt,
    AttemptedSubSectionByDate
    
}