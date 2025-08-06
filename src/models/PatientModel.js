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
        type: String
    },
    urn: {
        type: String
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
        default: true
    },
    patientCode: {
        type: String
    },
    postcode: {
        type: String
    },
    secretKey: {
        type: String
    },
    medicalCard: {
        type: String
    },
    personId: {
        type: String
    },
    occupation: {
        type: String
    },
    emergencyContactPerson: {
        type: String
    },
    emergencyContactNumber: {
        type: String
    },
    relationship: {
        type: String
    },
    privateHealthInsurance: {
        type: String
    },
    healthFund: {
        type: String,
    },
    memberNumber: {
        type: String
    },
    pensionNumber: {
        type: String
    },
    expiryDate: {
        type: String,
    },
    questionReply: {
        type: String,
    },
    doctorType: {
        type: String,
    },
    doctorAddress: {
        type: String,
    },
    referDoctorNumber: {
        type: String,
    },
    generalDoctorName: {
        type: String,
    },
    generaldoctorNumber: {
        type: String,
    },
    generalDoctorAddress: {
        type: String,
    },
    physiotherapistName: {
        type: String,
    },
    physiotherapistNumber: {
        type: String,
    },
    physiotherapistAddress: {
        type: String,
    },
    claimNumber: {
        type: String,
    },
    dateOfInjury: {
        type: String,
    },
    companyName: {
        type: String,
    },
    permanentAddress: {
        type: String,
    },
    contactPersonNameAtWorkplace: {
        type: String,
    },
    contactPersonFirstName: {
        type: String,
    },
    contactPersonLastName: {
        type: String,
    },
    insuranceCompanyName: {
        type: String,
    },
    insuranceCompanyAddress: {
        type: String,
    },
    managerFirstName: {
        type: String,
    },
    managerLastName: {
        type: String,
    },
    managerPhone: {
        type: String,
    },
    managerEmail: {
        type: String,
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
    },
    isVerified:{
        type: Boolean
    },
    activationToken:{
        type: String
    }

}, { timestamps: true });

const PatientModel = new mongoose.model('patient', schema);

module.exports = PatientModel;