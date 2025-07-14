const Router = require('express').Router();
const SectionController = require('../controller/SectionController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/SectionValidations')

// registor patient
Router.post('/create',validate(Validations.CreateEnteryValidation), SectionController.CreateEntery);

// update patient by id
Router.put('/:id',validate(Validations.UpdateEntery), SectionController.UpdateEntery);

// delete patient by id
Router.delete('/:id',validate(Validations.idParamsModel), SectionController.DeleteEntery);

// get single patient
Router.get('/:id',validate(Validations.idParamsModel), SectionController.GetSingleEntery);

// get all patients
Router.get('/',validate(Validations.GetAllEnteries), SectionController.GetAllEnteries);

module.exports = Router;