const mongoose = require("mongoose");

const patientDetailsSchema = new mongoose.Schema({
  medicalCard: { type: String, default: "" },
  personId: { type: String, default: "" },
  occupation: { type: String, default: "" },
  emergencyContactPerson: { type: String, default: "" },
  emergencyContactNumber: { type: String, default: "" },
  relationship: { type: String, default: "" },
  privateHealthInsurance: {
    Yes: { type: String, default: null },
    No: { type: String, default: null },
  },
  healthFund: { type: String, default: "" },
  memberNumber: { type: String, default: "" },
  pensionNumber: { type: String, default: "" },
  expiryDate: { type: String, default: "" },
  questionReply: {
    doctorSpecialist: { type: String, default: null },
    workCover: { type: String, default: null },
    anotherPatient: { type: String, default: null },
    familyFriend: { type: String, default: null },
    physio: { type: String, default: null },
    google: { type: String, default: null },
    facebook: { type: String, default: null },
    instagram: { type: String, default: null },
    hospitalStaff: { type: String, default: null },
    signage: { type: String, default: null },
  },
});

const doctorDetailsSchema = new mongoose.Schema({
  doctorType: {
    generalPhysician: { type: String, default: "" },
    specialist: { type: String, default: "" },
  },
  doctorAddress: { type: String, default: "" },
  referDoctorNumber: { type: String, default: "" },
  generalDoctorName: { type: String, default: "" },
  generaldoctorNumber: { type: String, default: "" },
  generalDoctorAddress: { type: String, default: "" },
  physiotherapistName: { type: String, default: "" },
  physiotherapistNumber: { type: String, default: "" },
  physiotherapistAddress: { type: String, default: "" },
});

const workerCompensationSchema = new mongoose.Schema({
  claimNumber: { type: String, default: "" },
  dateOfInjury: { type: String, default: "" },
  companyName: { type: String, default: "" },
  permanentAddress: { type: String, default: "" },
  contactPersonNameAtWorkplace: { type: String, default: "" },
  contactPersonFirstName: { type: String, default: "" },
  contactPersonLastName: { type: String, default: "" },
});

const insuranceDetailsSchema = new mongoose.Schema({
  insuranceCompanyName: { type: String, default: "" },
  insuranceCompanyAddress: { type: String, default: "" },
  managerFirstName: { type: String, default: "" },
  managerLastName: { type: String, default: "" },
  managerPhone: { type: String, default: "" },
  managerEmail: { type: String, default: "" },
});

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    medicareNumber: {
      type: String,
      default: "",
    },
    urn: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: "",
    },
    weight: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    patientCode: {
      type: String,
      default: "",
    },
    postcode: {
      type: String,
      default: "",
    },
    secretKey: {
      type: String,
      default: "",
    },
    patientDetails: { type: patientDetailsSchema, default: () => ({}) },
    doctorDetails: { type: doctorDetailsSchema, default: () => ({}) },
    workerCompensation: { type: workerCompensationSchema, default: () => ({}) },
    insuranceDetails: { type: insuranceDetailsSchema, default: () => ({}) },
    medicationsFaqs: {
      type: Array,
      default: [],
    },
    mriSafetyFaqs: {
      type: Array,
      default: [],
    },
    surgicalFaqs: {
      type: Array,
      default: [],
    },
    medicalFaqs: {
      type: Array,
      default: [],
    },
    othersFaqs: {
      type: Array,
      default: [],
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const PatientModel = new mongoose.model("patient", schema);

module.exports = PatientModel;
