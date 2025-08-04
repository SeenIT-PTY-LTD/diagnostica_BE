const Router = require('express').Router();
const PatientController = require('../controller/PatientController');
const { decryptReqMiddleware } = require('../middleWears/EncryptionMiddleware');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/PatientValidations')

// registor patient
Router.post('/registration',decryptReqMiddleware,validate(Validations.RegistrationValidation) , PatientController.Registration);

// login
Router.post('/login',decryptReqMiddleware,validate(Validations.Login), PatientController.Login);

// login
Router.get('/get-patient-detail', PatientController.GetPatientDeatils);

// verify phone number
Router.post('/varify-phone',decryptReqMiddleware ,validate(Validations.VerifyPhone), PatientController.VerifyPhone);

// change password by phone
Router.put('/reset-password-by-phone',decryptReqMiddleware, validate(Validations.ResetPasswordByPhone), PatientController.ResetPasswordByPhone);

// reset password by email
Router.put('/reset-password-by-email',validate(Validations.ResetPasswordByEmail), PatientController.ResetPasswordByEmail);

// update patient by id
Router.put('/:id',validate(Validations.Update), PatientController.UpdateEntery);

// delete patient by id
Router.delete('/', PatientController.DeleteEntery);

// get single patient
Router.get('/:id',validate(Validations.idParamsModel), PatientController.GetSingleEntery);

// get all patients
Router.get('/',validate(Validations.GetAllEnteries), PatientController.GetAllEnteries);

module.exports = Router;