const Router = require('express').Router();
const controller = require('../controller/PatientPromtsController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/UserPromtsValidations')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: "./src/img",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });


// registor patient
Router.get('/get-by-body-part',validate(Validations.GetPromtsByBodypart), controller.GetPromtsByBodypart);
Router.get('/patient-prompt/by-body-part', controller.getPatientPromptByBodyPart);

// registor patient
Router.get('/get-body-part-data',validate(Validations.GetBodyPartPromtMetadata), controller.GetSectionsMetadata);

Router.get('/get-section-data', validate(Validations.GetSectionMetadata),controller.GetSectionsMetadata);

Router.put('/update-section-data', validate(Validations.UpdateSubSectionPrompt),controller.UpdateSubSectionMetadata);

Router.post('/upload-img',upload.single('image'), controller.UploadImg )

Router.post('/add-img-prompt', upload.single('image'),controller.AddImageInprompt);

Router.get('/attempted-sub-sections-by-date',validate(Validations.AttemptedSubSectionByDate), controller.GetUserAttemptedSubSectionPromtsDateWise);

Router.post('/create', validate(Validations.CreatePatientPromt), controller.CreateNewPatientPromts);

Router.post('/assign-by-doctor', validate(Validations.AssignByDoctor), controller.AssignPromtByDoctor)

module.exports = Router;
