const Router = require('express').Router();
const SubSectionController = require('../controller/SubSectionController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/SubSectionValidations')

// registor patient
Router.post('/create',validate(Validations.CreateEnteryValidation), SubSectionController.CreateEntery);

// get all patients
Router.get('/',validate(Validations.GetAllEnteries), SubSectionController.GetAllEnteries)

// update patient by id
Router.put('/:id',validate(Validations.UpdateEntery), SubSectionController.UpdateEntery);

// delete patient by id
Router.delete('/:id',validate(Validations.idParamsModel), SubSectionController.DeleteEntery);

// get single patient
Router.get('/:id',validate(Validations.idParamsModel), SubSectionController.GetSingleEntery);

;

module.exports = Router;