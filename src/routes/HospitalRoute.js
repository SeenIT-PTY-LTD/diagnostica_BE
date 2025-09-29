const Router = require('express').Router();
const HospitalController = require('../controller/HospitalController');
const { validate } = require('../middleWears/ValidationsMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: "./src/img/hospitals",
  filename: (req, file, cb) => {
 
    const ext = path.extname(file.originalname);
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

// create hospital with logo upload
Router.post('/create', upload.single('logo'), HospitalController.CreateHospital);

// get all servey
Router.get('/', HospitalController.GetAllHospitals);

// get one servey
Router.get('/:id', HospitalController.GetSingleHospital);

Router.put('/:id', HospitalController.UpdateSingleHospital);

module.exports = Router;