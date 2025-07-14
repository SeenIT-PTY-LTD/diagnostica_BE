const Router = require('express').Router();
const DiagnosticsController = require('../controller/DiagnosticsController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/DiagnosticsValidations')

// registor patient
Router.post('/create',validate(Validations.CreateEnteryValidation), DiagnosticsController.CreateEntery);

// update patient by id
Router.put('/:id',validate(Validations.UpdateEntery), DiagnosticsController.UpdateEntery);

// delete patient by id
Router.delete('/:id',validate(Validations.idParamsModel), DiagnosticsController.DeleteEntery);

// get single patient
Router.get('/:id',validate(Validations.idParamsModel), DiagnosticsController.GetSingleEntery);

// get all patients
Router.get('/',validate(Validations.GetAllEnteries), DiagnosticsController.GetAllEnteries);

module.exports = Router;