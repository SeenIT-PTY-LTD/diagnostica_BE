const Router = require('express').Router();
const PatientController = require('../controller/PatientController');
const { decryptReqMiddleware } = require('../middleWears/EncryptionMiddleware');
const { validate } = require('../middleWears/ValidationsMiddleware');
const Validations = require('../validations/PatientValidations')
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
Router.post('/registration',validate(Validations.RegistrationValidation) , PatientController.Registration);
Router.get('/activate-patient', PatientController.ActivatePatient);


// login
Router.post('/login',decryptReqMiddleware,validate(Validations.Login), PatientController.Login);

// login
Router.get('/get-patient-detail', PatientController.GetPatientDeatils);

// verify phone number
Router.post('/varify-phone',decryptReqMiddleware ,validate(Validations.VerifyPhone), PatientController.VerifyPhone);

// change password by phone
Router.put('/reset-password-by-phone',decryptReqMiddleware, validate(Validations.ResetPasswordByPhone), PatientController.ResetPasswordByPhone);

// reset password by email
Router.put('/reset-password-by-email',validate(Validations.ResetPasswordByEmail), PatientController.ResetPasswordByEmail);

// update patient by id
Router.put('/:id',validate(Validations.Update), PatientController.UpdateEntery);

//update patient profile image
Router.put('/update-profile-image/:id', upload.single('image'), PatientController.UpdateProfileImage);

// delete patient by id
Router.delete('/', PatientController.DeleteEntery);

// get single patient
Router.get('/:id',validate(Validations.idParamsModel), PatientController.GetSingleEntery);

// get all patients
Router.get('/',validate(Validations.GetAllEnteries), PatientController.GetAllEnteries);

module.exports = Router;