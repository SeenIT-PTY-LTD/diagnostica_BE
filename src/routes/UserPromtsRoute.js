const Router = require('express').Router();
const UserPromtsController = require('../controller/UserPromtsController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/UserPromtsValidations')

// registor patient
Router.get('/get-body-part-data',validate(Validations.GetBodyPartPromtMetadata), UserPromtsController.GetSectionsMetadata);

Router.get('/get-section-data', validate(Validations.GetSectionMetadata),UserPromtsController.GetSubSectionMetadata);

Router.put('/update-section-data', validate(Validations.UpdateSubSectionPromt),UserPromtsController.UpdateSubSectionMetadata);

Router.get('/user-selected-promt-img',validate(Validations.GetUserSelectedImgPromt), UserPromtsController.GetUserSelectedPromtsImages);

Router.get('/attempted-sub-sections-by-date',validate(Validations.AttemptedSubSectionByDate), UserPromtsController.GetUserAttemptedSubSectionPromtsDateWise);
module.exports = Router;
