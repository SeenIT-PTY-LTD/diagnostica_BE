const Router = require('express').Router();
const BodyPartsController = require('../controller/BodyPartController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/BodyPartsValidations')

// registor patient
Router.post('/create',validate(Validations.CreateEnteryValidation), BodyPartsController.CreateEntery);

// update patient by id
Router.put('/:id',validate(Validations.UpdateEntery), BodyPartsController.UpdateEntery);

// delete patient by id
Router.delete('/:id',validate(Validations.idParamsModel), BodyPartsController.DeleteEntery);

// get single patient
Router.get('/:id',validate(Validations.idParamsModel), BodyPartsController.GetSingleEntery);

// get all patients
Router.get('/',validate(Validations.GetAllEnteries), BodyPartsController.GetAllEnteries);

module.exports = Router;