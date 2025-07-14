const Router = require('express').Router();
const ReferralController = require('../controller/ReferralController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/RefferalValidations')

// create refferal
Router.post('/create',validate(Validations.CreateRefferal), ReferralController.CreateRefferal);

// get single reffera;
Router.get('/:id',validate(Validations.idParamsModel), ReferralController.GetSingleEntery);

// get all referral
Router.get('/',validate(Validations.GetAllEnteries), ReferralController.GetAllEnteries);

module.exports = Router;