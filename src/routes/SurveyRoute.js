const Router = require('express').Router();
const ServeyController = require('../controller/SurveyController');
const { ContentListInstance } = require('twilio/lib/rest/content/v1/content');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/SurveyValidations')

// create servey    
Router.post('/create',validate(Validations.createSurveyValidation), ServeyController.CreateSurvey);

// get all servey
Router.get('/',validate(Validations.GetAllEnteries), ServeyController.GetAllSurvey);

// get one servey
Router.get('/:id',validate(Validations.GetOneEntery), ServeyController.GetSingleSurvey);

Router.put('/:id', validate(Validations.UpdateSingleSurvey), ServeyController.UpdateSingleSurvey)
module.exports = Router;