const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    medicareNumber: {
        type: String,
        default: ""
    },
    urn: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    height: {
        type: String,
        default: ""
    },
    weight: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    patientCode: {
        type: String,
        default: ""
    },
    postcode: {
        type: String,
        default: ""
    },
    secretKey: {
        type: String,
        default: ""
    },
    medicalCard: {
        type: String,
        default: ""
    },
    personId: {
        type: String,
        default: ""
    },
    occupation: {
        type: String,
        default: ""
    },
    emergencyContactPerson: {
        type: String,
        default: ""
    },
    emergencyContactNumber: {
        type: String,
        default: ""
    },
    relationship: {
        type: String,
        default: ""
    },
    privateHealthInsurance: {
        type: String,
        default: ""
    },
    healthFund: {
        type: String,
        default: ""
    },
    memberNumber: {
        type: String,
        default: ""
    },
    pensionNumber: {
        type: String,
        default: ""
    },
    expiryDate: {
        type: String,
        default: ""
    },
    questionReply: {
        type: String,
        default: ""
    },
    doctorType: {
        type: String,
        default: ""
    },
    doctorAddress: {
        type: String,
        default: ""
    },
    referDoctorNumber: {
        type: String,
        default: ""
    },
    generalDoctorName: {
        type: String,
        default: ""
    },
    generaldoctorNumber: {
        type: String,
        default: ""
    },
    generalDoctorAddress: {
        type: String,
        default: ""
    },
    physiotherapistName: {
        type: String,
        default: ""
    },
    physiotherapistNumber: {
        type: String,
        default: ""
    },
    physiotherapistAddress: {
        type: String,
        default: ""
    },
    claimNumber: {
        type: String,
        default: ""
    },
    dateOfInjury: {
        type: String,
        default: ""
    },
    companyName: {
        type: String,
        default: ""
    },
    permanentAddress: {
        type: String,
        default: ""
    },
    contactPersonNameAtWorkplace: {
        type: String,
        default: ""
    },
    contactPersonFirstName: {
        type: String,
        default: ""
    },
    contactPersonLastName: {
        type: String,
        default: ""
    },

    insuranceCompanyName: {
        type: String,
        default: ""
    },
    insuranceCompanyAddress: {
        type: String,
        default: ""
    },
    managerFirstName: {
        type: String,
        default: ""
    },
    managerLastName: {
        type: String,
        default: ""
    },
    managerPhone: {
        type: String,
        default: ""
    },
    managerEmail: {
        type: String,
        default: ""
    },
    medicationsFaqs: {
        type: Array,
        default: []
    },
    mriSafetyFaqs: {
        type: Array,
        default: []
    },
    surgicalFaqs: {
        type: Array,
        default: []
    },
    medicalFaqs: {
        type: Array,
        default: []
    },
    othersFaqs: {
        type: Array,
        default: []
    },
    profileImage: {
        type: String,
        default: ""
    }

}, { timestamps: true });

const PatientModel = new mongoose.model('patient', schema);

module.exports = PatientModel;