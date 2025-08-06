const Joi = require("joi");

const RegistrationValidation = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        countryCode: Joi.string().required(),
        dob: Joi.string().required(),
        gender: Joi.string().required(),
        email: Joi.string().required(),
        country: Joi.string().allow("", null),
        urn: Joi.string().allow("", null),
        height: Joi.string().allow("", null),
        weight: Joi.string().allow("", null),
        address: Joi.string().allow("", null),
        state: Joi.string().allow("", null),
        postcode: Joi.string().allow("", null),
        // token : Joi.string().required()
    }),
};

const Login = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const VerifyPhone = {
    body: Joi.object({
        phone: Joi.string().required(),
        countryCode: Joi.string().required(),
    }),
};

const Update = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        phone: Joi.string(),
        dob: Joi.string(),
        gender: Joi.string(),
        email: Joi.string(),
        country: Joi.string(),
        urn: Joi.string(),
        height: Joi.string(),
        weight: Joi.string(),
        address: Joi.string(),
        state: Joi.string(),
        postcode: Joi.string(),
        patientCode: Joi.string(),
        medicareNumber: Joi.string(),
        profileImage: Joi.string(),
        //Patient details
        medicalCard: Joi.string(),
        personId: Joi.string(),
        occupation: Joi.string(),
        emergencyContactPerson: Joi.string(),
        emergencyContactNumber: Joi.string(),
        relationship: Joi.string(),
        privateHealthInsurance: Joi.string(),
        healthFund: Joi.string(),
        memberNumber: Joi.string(),
        pensionNumber: Joi.string(),
        expiryDate: Joi.string(),
        questionReply: Joi.string(),
        //Doctor details
        doctorType: Joi.string(),
        doctorAddress: Joi.string(),
        referDoctorNumber: Joi.string(),
        generalDoctorName: Joi.string(),
        generaldoctorNumber: Joi.string(),
        generalDoctorAddress: Joi.string(),
        physiotherapistName: Joi.string(),
        physiotherapistNumber: Joi.string(),
        physiotherapistAddress: Joi.string(),
        //worker compensation
        claimNumber: Joi.string(),
        dateOfInjury: Joi.string(),
        companyName: Joi.string(),
        permanentAddress: Joi.string(),
        contactPersonNameAtWorkplace: Joi.string(),
        contactPersonFirstName: Joi.string(),
        contactPersonLastName: Joi.string(),
        //work cover insurance details
        insuranceCompanyName: Joi.string(),
        insuranceCompanyAddress: Joi.string(),
        managerFirstName: Joi.string(),
        managerLastName: Joi.string(),
        managerPhone: Joi.string(),
        managerEmail: Joi.string(),
        //medications and allergies
        medicationsFaqs: Joi.array()
            .items(
                Joi.object({
                    question: Joi.string().required(),
                    answer: Joi.string().required(),
                })
            )
            .default([]),
        //mri safety questions
        mriSafetyFaqs: Joi.array()
            .items(
                Joi.object({
                    question: Joi.string().required(),
                    answer: Joi.string().required(),
                })
            )
            .default([]),
        //surgical questions
        surgicalFaqs: Joi.array()
            .items(
                Joi.object({
                    question: Joi.string().required(),
                    answer: Joi.string().required(),
                })
            )
            .default([]),
        //medical questions
        medicalFaqs: Joi.array()
            .items(
                Joi.object({
                    question: Joi.string().required(),
                    answer: Joi.string().required(),
                })
            )
            .default([]),
        //othersFaqs questions
        othersFaqs: Joi.array()
            .items(
                Joi.object({
                    question: Joi.string().required(),
                    answer: Joi.string().required(),
                })
            )
            .default([]),
    }),
};

const ResetPasswordByEmail = {
    body: Joi.object({
        password: Joi.string().required(),
        email: Joi.string().required(),
    }),
};

const ResetPasswordByPhone = {
    body: Joi.object({
        password: Joi.string().required(),
        phone: Joi.string().required(),
        countryCode: Joi.string().required(),
    }),
};

const idParamsModel = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

const GetAllEnteries = {
    query: Joi.object({
        page: Joi.number(),
        size: Joi.number(),
        search: Joi.string(),
        searchCriteria: Joi.string(),
    }),
};

const ResetPassword = {
    body : Joi.object({
        password : Joi.string().required()
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
    GetAllEnteries,
    ResetPassword
};
