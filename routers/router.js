const router = require("express").Router();
const { route } = require("../app");
const multer = require('multer');
const path = require("path");

const moxfqController = require("../controller/moxfq_controller");
const sfController = require("../controller/sf_controller");
const pcsController = require("../controller/pcs_controller");
const doctorController = require("../controller/doctor_controller");
const medDataController = require("../controller/meddata_controller");
const patientController = require("../controller/patient_controller");
const eqController = require("../controller/eq_controller");
const diagnoController = require("../controller/diagnostica_controller");
const idcodeController = require("../controller/idcode_controller");
const imageController = require("../controller/image_controller");
const otpController = require("../controller/otp_controller");
const painrangecontroller = require("../controller/painrange_controller");
const commentcontroller = require("../controller/Comment_controller");

// const storage = multer.diskStorage({
//   destination: './img',
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({ storage }).fields([
//   { name: "img1", maxCount: 1 },
//   { name: "img2", maxCount: 1 },
//   { name: "img3", maxCount: 1 },
//   { name: "img4", maxCount: 1 },
//   { name: "img5", maxCount: 1 },
//   { name: "img6", maxCount: 1 },
// ]);

const storage = multer.diskStorage({
  destination: './img',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage }).fields([
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 },
  { name: "img4", maxCount: 1 },
  { name: "img5", maxCount: 1 },
  { name: "img6", maxCount: 1 },
]);

router.post("/idcode", idcodeController.idcode);

router.post("/registeration", patientController.register);
router.post("/login", patientController.login);
router.post("/phone", patientController.verifyphone);
router.put("/update", patientController.update);
router.post("/changepassword", patientController.changePassword);
router.put("/resetpassword", patientController.resetPassword);
router.delete("/delete", patientController.delete);
router.get("/getpatient", patientController.getEmail);
router.get("/getpatients", patientController.getpatients);

router.post("/doctor", doctorController.register);
router.post("/doctorlogin", doctorController.login);
router.post("/checkuser", doctorController.checkUser);
router.get("/getdoctor", doctorController.get);
router.get("/getdoctor1", doctorController.getAdmin);
router.get("/getemail", doctorController.getEmail);
router.put("/updatedoctor", doctorController.Update);
router.delete("/deletedoctor", doctorController.delete);

router.post("/moxfq", moxfqController.submitMoxfqAnswer);
router.post("/fetmoxfq", moxfqController.fetmoxfq);
router.put("/updatemoxfq", moxfqController.Update);
router.get("/getmoxfq", moxfqController.getEmail);
router.delete("/deletemoxfq", moxfqController.delete);

router.post("/sf", sfController.submitSfAnswer);
router.post("/fetsf", sfController.fetsf);
router.put("/updatesf", sfController.Update);
router.get("/getsf", sfController.getEmail);
router.delete("/deletesf", sfController.delete);

router.post("/pcs", pcsController.submitPcsAnswer);
router.post("/fetpcs", pcsController.fetpcs);
router.put("/updatepcs", pcsController.Update);
router.get("/getpcss", pcsController.getData);
router.delete("/deletepcs", pcsController.delete);

router.post("/meddata", medDataController.submutMedData);
router.get("/getmeddata", medDataController.getEmail);
router.put("/updatemeddata", medDataController.Update);
router.delete("/deletemeddata", medDataController.delete);

router.post("/eq", eqController.submitEqAnswer);
router.post("/feteq", eqController.feteq);
router.put("/updateeq", eqController.Update);
router.get("/geteq", eqController.getEmail);
router.delete("/deleteeq", eqController.delete);

router.post("/data", diagnoController.create);
router.put("/update-data", diagnoController.update);
router.get("/getdatas", diagnoController.getData);
router.delete("/deletedata", diagnoController.delete);

router.post("/upload", upload, imageController.documents);
router.get("/getimage", imageController.getEmail);
router.delete("/deleteimage", imageController.delete);

router.post("/otp", otpController.generateOTP);
router.post("/verifyotp", otpController.verify);

router.post("/painrange", painrangecontroller.create);
router.put("/updatpainrange", painrangecontroller.Update);
router.get("/getpainrange", painrangecontroller.getData);
router.delete("/deleterange", painrangecontroller.delete);

router.post("/comment", commentcontroller.create);
router.put("/updatcomment", commentcontroller.Update);
router.get("/getcomment", commentcontroller.getData);
router.delete("/deletecomment", commentcontroller.delete);

module.exports = router;
