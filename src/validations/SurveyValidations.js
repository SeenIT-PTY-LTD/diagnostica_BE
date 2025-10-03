const Joi = require('joi');

const createSurveyValidation = {
    body: Joi.object({
        hospitalFacility: Joi.string().optional(),
        poNumber: Joi.string().optional(),
        surgeon: Joi.string().optional(),
        date: Joi.date().optional(),
        medovexRepresentative: Joi.string().optional(),
        name: Joi.string().optional(),
        patientId: Joi.string().optional(),
        medicareNumber: Joi.string().required(),
        monthYear: Joi.string().optional(),
        type: Joi.string().valid("adbone", "postOperation", "followUp").required(),
        surveyForm: Joi.object({
            // Fields for "adbone" type
            additionalComments: Joi.string().optional().allow(''),
            complications: Joi.string().optional().allow(''),
            complicationsDescription: Joi.string().optional().allow(''),
            easeOfShaping: Joi.string().optional().allow(''),
            frequencyOfUse: Joi.string().optional().allow(''),
            handlingCharacteristics: Joi.string().optional().allow(''),
            materials: Joi.array().items(Joi.string()).optional(),
            osteoconductive: Joi.string().optional().allow(''),
            otherProcedure: Joi.string().optional().allow(''),
            radiologicalEvidence: Joi.string().optional().allow(''),
            recommendation: Joi.string().optional().allow(''),
            satisfaction: Joi.string().optional().allow(''),
            stability: Joi.string().optional().allow(''),
            surgicalProcedures: Joi.array().items(Joi.string()).optional(),
            skeletonPositions: Joi.array().optional(),

            // Fields for "postOperation" type
            devices: Joi.array().items(Joi.object({
                productCode: Joi.string().required(),
                description: Joi.string().required(),
                lotNo: Joi.string().required(),
                quantity: Joi.number().integer().min(1).required()
            })).optional(),

            patientInformation: Joi.object({
                clinicalIndication: Joi.string().optional().allow(''),
                treatmentLocation: Joi.string().optional().allow(''),
                priorTreatmentInjection: Joi.boolean().optional(),
                priorTreatmentPhysicalTherapy: Joi.boolean().optional(),
                diagnosticBranchBlock: Joi.string().optional().allow('')
            }).optional(),

            procedureFeedback: Joi.object({
                issuesObserved: Joi.array().items(Joi.object({
                    issue: Joi.string().required(),
                    rating: Joi.string().optional().allow(''),
                    observation: Joi.string().optional().allow('')
                })).optional(),
                innerOuterPackaging: Joi.string().optional().allow(''),
                intraoperativeComplications: Joi.array().items(Joi.object({
                    complication: Joi.string().required(),
                    applicable: Joi.boolean().optional(),
                    errorCode: Joi.string().optional().allow(''),
                    observation: Joi.string().optional().allow('')
                })).optional()
            }).optional(),

            postoperativeFeedback: Joi.object({
                deviceRelatedAdverseEvents: Joi.string().optional().allow(''),
                deviceRelatedAdverseEventsDetails: Joi.string().optional().allow('')
            }).optional(),

            // Fields for "followUp" type
            surgeon: Joi.string().optional().allow(''),
            date: Joi.date().optional(),
            practiceManager: Joi.string().optional().allow(''),
            followUpInterval: Joi.string().optional().allow(''),
            clinicalOutcome: Joi.array().items(Joi.object({
                outcome: Joi.string().required(),
                response: Joi.alternatives().try(Joi.string(), Joi.number()).optional().allow(''),
                details: Joi.string().optional().allow('')
            })).optional()
        }).required()
    })
}
const GetAllEnteries ={
    query : Joi.object({ 
        medicareNumber : Joi.string(),
        page : Joi.number().optional(),
        limit : Joi.number().optional(),
        sortBy : Joi.string().optional(),
        sortOrder : Joi.string().valid('asc','desc').optional(),
        type : Joi.string(),
        search : Joi.string()
    })
}

const GetOneEntery ={
    params : Joi.object({ 
        id : Joi.string().required()
    })
}

const UpdateSingleSurvey = {
    params: Joi.object({
        id: Joi.string().required()
    }),
    body: Joi.object({
        hospitalFacility: Joi.string().optional(),
        poNumber: Joi.string().optional(),
        surgeon: Joi.string().optional(),
        date: Joi.date().optional(),
        medovexRepresentative: Joi.string().optional(),
        name: Joi.string().optional(),
        patientId: Joi.string().optional(),
        medicareNumber: Joi.string().optional(),
        monthYear: Joi.string().optional(),
        type: Joi.string().valid("adbone", "postOperation", "followUp").optional(),
        surveyForm: Joi.object({
            // Fields for "adbone" type
            additionalComments: Joi.string().optional().allow(''),
            complications: Joi.string().optional().allow(''),
            complicationsDescription: Joi.string().optional().allow(''),
            easeOfShaping: Joi.string().optional().allow(''),
            frequencyOfUse: Joi.string().optional().allow(''),
            handlingCharacteristics: Joi.string().optional().allow(''),
            materials: Joi.array().items(Joi.string()).optional(),
            osteoconductive: Joi.string().optional().allow(''),
            otherProcedure: Joi.string().optional().allow(''),
            radiologicalEvidence: Joi.string().optional().allow(''),
            recommendation: Joi.string().optional().allow(''),
            satisfaction: Joi.string().optional().allow(''),
            stability: Joi.string().optional().allow(''),
            surgicalProcedures: Joi.array().items(Joi.string()).optional(),
            skeletonPositions: Joi.array().optional(),

            // Fields for "postOperation" type
            devices: Joi.array().items(Joi.object({
                productCode: Joi.string().required(),
                description: Joi.string().required(),
                lotNo: Joi.string().required(),
                quantity: Joi.number().integer().min(1).required()
            })).optional(),

            patientInformation: Joi.object({
                clinicalIndication: Joi.string().optional().allow(''),
                treatmentLocation: Joi.string().optional().allow(''),
                priorTreatmentInjection: Joi.boolean().optional(),
                priorTreatmentPhysicalTherapy: Joi.boolean().optional(),
                diagnosticBranchBlock: Joi.string().optional().allow('')
            }).optional(),

            procedureFeedback: Joi.object({
                issuesObserved: Joi.array().items(Joi.object({
                    issue: Joi.string().required(),
                    rating: Joi.string().optional().allow(''),
                    observation: Joi.string().optional().allow('')
                })).optional(),
                innerOuterPackaging: Joi.string().optional().allow(''),
                intraoperativeComplications: Joi.array().items(Joi.object({
                    complication: Joi.string().required(),
                    applicable: Joi.boolean().optional(),
                    errorCode: Joi.string().optional().allow(''),
                    observation: Joi.string().optional().allow('')
                })).optional()
            }).optional(),

            postoperativeFeedback: Joi.object({
                deviceRelatedAdverseEvents: Joi.string().optional().allow(''),
                deviceRelatedAdverseEventsDetails: Joi.string().optional().allow('')
            }).optional(),

            // Fields for "followUp" type
            surgeon: Joi.string().optional().allow(''),
            date: Joi.date().optional(),
            practiceManager: Joi.string().optional().allow(''),
            followUpInterval: Joi.string().optional().allow(''),
            clinicalOutcome: Joi.array().items(Joi.object({
                outcome: Joi.string().required(),
                response: Joi.alternatives().try(Joi.string(), Joi.number()).optional().allow(''),
                details: Joi.string().optional().allow('')
            })).optional()
        }).optional()
    })
}

module.exports = {
    createSurveyValidation,
    GetAllEnteries,
    GetOneEntery,
    UpdateSingleSurvey
};