const Router = require('express').Router();
const PatientController = require('../controller/PatientController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/PatientValidations')

// registor patient
Router.post('/registration',validate(Validations.RegistrationValidation), PatientController.Registration);

// login
Router.post('/login',validate(Validations.Login), PatientController.Login);

// verify phone number
Router.post('/varify-phone',validate(Validations.VerifyPhone), PatientController.VerifyPhone);

// change password by phone
Router.put('/reset-password-by-phone',validate(Validations.ResetPasswordByPhone), PatientController.ResetPasswordByPhone);

// reset password by email
Router.put('/reset-password-by-email',validate(Validations.ResetPasswordByEmail), PatientController.ResetPasswordByEmail);

// update patient by id
Router.put('/:id',validate(Validations.Update), PatientController.UpdateEntery);

// delete patient by id
Router.delete('/:id',validate(Validations.idParamsModel), PatientController.DeleteEntery);

// get single patient
Router.get('/:id',validate(Validations.idParamsModel), PatientController.GetSingleEntery);

// get all patients
Router.get('/',validate(Validations.GetAllEnteries), PatientController.GetAllEnteries);

module.exports = Router;