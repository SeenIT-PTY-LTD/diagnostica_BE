const Router = require('express').Router();
const controller = require('../controller/PatientPromtsController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/UserPromtsValidations')

// registor patient
Router.get('/get-body-part-data',validate(Validations.GetBodyPartPromtMetadata), controller.GetSectionsMetadata);

Router.get('/get-section-data', validate(Validations.GetSectionMetadata),controller.GetSubSectionMetadata);

Router.put('/update-section-data', validate(Validations.UpdateSubSectionPromt),controller.UpdateSubSectionMetadata);

Router.get('/user-selected-promt-img',validate(Validations.GetUserSelectedImgPromt), controller.GetUserSelectedPromtsImages);

Router.get('/attempted-sub-sections-by-date',validate(Validations.AttemptedSubSectionByDate), controller.GetUserAttemptedSubSectionPromtsDateWise);

Router.post('/create', validate(Validations.CreatePatientPromt), controller.CreateNewPatientPromts);

Router.post('/assign-by-doctor', validate(Validations.AssignByDoctor), controller.AssignPromtByDoctor)

module.exports = Router;
