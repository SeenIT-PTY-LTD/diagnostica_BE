const Router = require('express').Router();
const QuestionController = require('../controller/QuestionController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/QuestionsValidations')

// registor patient
Router.post('/create',validate(Validations.CreateEnteryValidation), QuestionController.CreateEntery);

// update patient by id
Router.put('/:id',validate(Validations.UpdateEntery), QuestionController.UpdateEntery);

// delete patient by id
Router.delete('/:id',validate(Validations.idParamsModel), QuestionController.DeleteEntery);

// get single patient
Router.get('/:id',validate(Validations.idParamsModel), QuestionController.GetSingleEntery);

// get all patients
Router.get('/',validate(Validations.GetAllEnteries), QuestionController.GetAllEnteries);

module.exports = Router;