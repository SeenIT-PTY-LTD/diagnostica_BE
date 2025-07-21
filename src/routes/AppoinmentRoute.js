const Router = require('express').Router();
const AppointmentController = require('../controller/AppointmentController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/AppoinmentValidations')

// registor patient
Router.get('/fetch-appoinment-by-patient',validate(Validations.GetAppoinmentByPatient), AppointmentController.GetAppointmentByDoctor);

// registor patient
Router.get('/get-sections',validate(Validations.GetSectionsByAppointment), AppointmentController.GetSectionsByAppointment);

Router.get('/get-attempted-section-promts', validate(Validations.GetSectionAttemptedData),AppointmentController.GetSectionAttemptedData)

module.exports = Router;