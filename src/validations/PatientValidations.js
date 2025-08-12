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

const optionalString = Joi.string().allow("", null);

const Update = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    firstName: optionalString,
    lastName: optionalString,
    phone: optionalString,
    dob: optionalString,
    gender: optionalString,
    email: optionalString,
    country: optionalString,
    urn: optionalString,
    height: optionalString,
    weight: optionalString,
    address: optionalString,
    state: optionalString,
    postcode: optionalString,
    patientCode: optionalString,
    medicareNumber: optionalString,
    profileImage: optionalString,

    patientDetails: Joi.object({
      medicalCard: optionalString,
      personId: optionalString,
      occupation: optionalString,
      emergencyContactPerson: optionalString,
      emergencyContactNumber: optionalString,
      relationship: optionalString,
      privateHealthInsurance: Joi.object({
        Yes: optionalString,
        No: optionalString
      }),
      healthFund: optionalString,
      memberNumber: optionalString,
      pensionNumber: optionalString,
      expiryDate: optionalString,
      questionReply: Joi.object({
        doctorSpecialist: optionalString,
        workCover: optionalString,
        anotherPatient: optionalString,
        familyFriend: optionalString,
        physio: optionalString,
        google: optionalString,
        facebook: optionalString,
        instagram: optionalString,
        hospitalStaff: optionalString,
        signage: optionalString
      })
    }),

    doctorDetails: Joi.object({
      doctorType: Joi.object({
        generalPhysician: optionalString,
        specialist: optionalString
      }),
      doctorAddress: optionalString,
      referDoctorNumber: optionalString,
      generalDoctorName: optionalString,
      generaldoctorNumber: optionalString,
      generalDoctorAddress: optionalString,
      physiotherapistName: optionalString,
      physiotherapistNumber: optionalString,
      physiotherapistAddress: optionalString,
    }),

    workerCompensation: Joi.object({
      claimNumber: optionalString,
      dateOfInjury: optionalString,
      companyName: optionalString,
      permanentAddress: optionalString,
      contactPersonNameAtWorkplace: optionalString,
      contactPersonFirstName: optionalString,
      contactPersonLastName: optionalString,
    }),

    insuranceDetails: Joi.object({
      insuranceCompanyName: optionalString,
      insuranceCompanyAddress: optionalString,
      managerFirstName: optionalString,
      managerLastName: optionalString,
      managerPhone: optionalString,
      managerEmail: optionalString,
    }),

    medicationsFaqs: Joi.array()
      .items(Joi.object({
        question: optionalString.required(),
        answer: optionalString.required(),
      }))
      .default([]),

    mriSafetyFaqs: Joi.array()
      .items(Joi.object({
        question: optionalString.required(),
        answer: optionalString.required(),
      }))
      .default([]),

    surgicalFaqs: Joi.array()
      .items(Joi.object({
        question: optionalString.required(),
        answer: optionalString.required(),
      }))
      .default([]),

    medicalFaqs: Joi.array()
      .items(Joi.object({
        question: optionalString.required(),
        answer: optionalString.required(),
      }))
      .default([]),

    othersFaqs: Joi.array()
      .items(Joi.object({
        question: optionalString.required(),
        answer: optionalString.required(),
      }))
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
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  RegistrationValidation,
  Login,
  VerifyPhone,
  Update,
  ResetPasswordByEmail,
  ResetPasswordByPhone,
  idParamsModel,
  GetAllEnteries,
  ResetPassword,
};
