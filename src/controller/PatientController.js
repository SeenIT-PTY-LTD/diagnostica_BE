const PatientModel = require("../models/PatientModel");
const CommonCrud = require("../services/CommonCrud");
const { CustumMessages } = require("../utils/CustumMessages");
const Encryption = require("../utils/Encryption");
const Response = require("../utils/Response");
const JWT = require('../utils/JwtAuthToken')
const { StatusCodes } = require("../utils/StatusCodes");
const { encryptObject, decryptString, DefaultencryptObject, decryptObject, defaultDecryptObject, DefaultEncryptObject } = require("../utils/Crypto");
const config = require('../config/config');
const PatientPromptsModel = require("../models/PatientsPromtsModel");
const Constats = require("../utils/Constants");
const DiagnosticsModel = require("../models/DiagnosticsModel");
const {
    defaultMedicationsFaqs,
    defaultMriSafetyFaqs,
    defaultSurgicalFaqs,
    defaultMedicalFaqs,
    defaultOthersFaqs
} = require('../utils/Faqs');
const crypto = require('crypto');
const { Email2FAVerification, DiagnosticSupportEmail } = require("../services/EmailService");
const { isNotEmpty, calculateBMI } = require("../utils/helpers");

//common crud 
const PatientCommonCrud = new CommonCrud(PatientModel)
const PatientPromptsCrud = new CommonCrud(PatientPromptsModel)
const DiagnosticsCommonCrud = new CommonCrud(DiagnosticsModel)

let patientFilds = [ 
    'firstName',
    'lastName',
    'dob',
    "gender",
    "email",
    "medicareNumber" ,
    "urn" ,
    "phone",
    "countryCode" ,
    "address",
    "state",
    "password",
    "height",
    "weight",
    "bmi",
    "country",
    "isActive",
    "patientCode",
    "postcode"
]


// async function Registration( req ,res ){

//     let response

//     try {

//         const checkEmail = await PatientCommonCrud.getEnteryBasedOnCondition({ email: req.body.email, isActive : true })

//         if(checkEmail['isSuccess'] && checkEmail['result'].length){
//             response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Email is alrady present" , {} )
//             let resBody = await DefaultEncryptObject( response )
//             return res.status(response.statusCode).send(resBody)
//         }
//         const checkPhone = await PatientCommonCrud.getEnteryBasedOnCondition({ phone : req.body.phone , countryCode : req.body.countryCode, isActive : true  })

//         if(checkPhone ['isSuccess'] && checkPhone['result'].length){
//             response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Phone is alrady present" , {} )
//             let resBody = await DefaultEncryptObject( response )
//             return res.status(response.statusCode).send(resBody)
//         }

        
//         // Set defaults if missing
//         req.body.medicationsFaqs = req.body.medicationsFaqs || defaultMedicationsFaqs;
//         req.body.mriSafetyFaqs = req.body.mriSafetyFaqs || defaultMriSafetyFaqs;
//         req.body.surgicalFaqs = req.body.surgicalFaqs || defaultSurgicalFaqs;
//         req.body.medicalFaqs = req.body.medicalFaqs || defaultMedicalFaqs;
//         req.body.othersFaqs = req.body.othersFaqs || defaultOthersFaqs;

//         // Encrypt password & set secret key
//         req.body.password = await Encryption.encrypt(req.body.password);
//         req.body.secretKey = await Encryption.randomKey()
//         response = await PatientCommonCrud.creatEntery(req.body);

//         if(response.isSuccess){
//             response = Response.sendResponse( true, StatusCodes.OK , "patient registration sucessfully" , {} )
//         }

//         let resBody = await DefaultEncryptObject( response )
//         return res.status(response.statusCode).send(resBody)

//     } catch (error) {
    
//         response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

//     }

//     return res.status(response.statusCode).send(response)

// }

// async function Registration(req, res) {
//   let response;

//   try {
//     // Check Email duplicates
//     const checkEmail = await PatientCommonCrud.getEnteryBasedOnCondition({
//       email: req.body.email,
//       isActive: true,
//     });

//     if (checkEmail.isSuccess && checkEmail.result.length) {
//       response = Response.sendResponse(
//         false,
//         StatusCodes.NOT_ACCEPTABLE,
//         "Email is already present",
//         {}
//       );
//       return res.status(response.statusCode).send(response);
//     }

//     // Check Phone duplicates
//     const checkPhone = await PatientCommonCrud.getEnteryBasedOnCondition({
//       phone: req.body.phone,
//       countryCode: req.body.countryCode,
//       isActive: true,
//     });

//     if (checkPhone.isSuccess && checkPhone.result.length) {
//       response = Response.sendResponse(
//         false,
//         StatusCodes.NOT_ACCEPTABLE,
//         "Phone is already present",
//         {}
//       );
//       return res.status(response.statusCode).send(response);
//     }

//     // Defaults
//     req.body.medicationsFaqs = req.body.medicationsFaqs || defaultMedicationsFaqs;
//     req.body.mriSafetyFaqs = req.body.mriSafetyFaqs || defaultMriSafetyFaqs;
//     req.body.surgicalFaqs = req.body.surgicalFaqs || defaultSurgicalFaqs;
//     req.body.medicalFaqs = req.body.medicalFaqs || defaultMedicalFaqs;
//     req.body.othersFaqs = req.body.othersFaqs || defaultOthersFaqs;

//     if( isNotEmpty(req.body.height) && isNotEmpty(req.body.weight)){
//         req.body.bmi = (calculateBMI( req.body.weight , req.body.height ))['category']
//     }

//     // Encrypt password & generate keys
//     req.body.password = await Encryption.encrypt(req.body.password);
//     req.body.secretKey = await Encryption.randomKey();

//     // Generate verification token
//     const token = crypto.randomBytes(32).toString("hex");
//     req.body.verificationToken = token;
//     req.body.verificationExpires = Date.now() + 15 * 60 * 1000; // valid 15 min

//     // Create patient entry
//     response = await PatientCommonCrud.creatEntery(req.body);

//     if (response.isSuccess) {
//       // Build verification URL (frontend link or API link)
//       const verificationUrl = `${config?.ClientHost}/verify/${token}`;

//       // Send verification email using reusable Email2FAVerification
//       await Email2FAVerification(
//         req.body.email,
//         verificationUrl,
//         15 // expiration time in minutes
//       );

//       response = Response.sendResponse(
//         true,
//         StatusCodes.OK,
//         "Patient registered successfully. Please verify your email.",
//         {}
//       );
//     }

//     return res.status(response.statusCode).send(response);
//   } catch (error) {
//     response = Response.sendResponse(
//       false,
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       error.message,
//       {}
//     );
//     return res.status(response.statusCode).send(response);
//   }
// }

async function Registration(req, res) {
  let response;

  try {
    // Check Email duplicates
    const checkEmail = await PatientCommonCrud.getEnteryBasedOnCondition({
      email: req.body.email,
      isActive: true,
    });

    if (checkEmail.isSuccess && checkEmail.result.length) {
      response = Response.sendResponse(
        false,
        StatusCodes.NOT_ACCEPTABLE,
        "Email is already present",
        {}
      );
      const resBody = await DefaultEncryptObject(response);
      return res.status(response.statusCode).send(resBody);
    }

    // Check Phone duplicates
    const checkPhone = await PatientCommonCrud.getEnteryBasedOnCondition({
      phone: req.body.phone,
      countryCode: req.body.countryCode,
      isActive: true,
    });

    if (checkPhone.isSuccess && checkPhone.result.length) {
      response = Response.sendResponse(
        false,
        StatusCodes.NOT_ACCEPTABLE,
        "Phone is already present",
        {}
      );
      const resBody = await DefaultEncryptObject(response);
      return res.status(response.statusCode).send(resBody);
    }

    // Defaults
    req.body.medicationsFaqs = req.body.medicationsFaqs || defaultMedicationsFaqs;
    req.body.mriSafetyFaqs = req.body.mriSafetyFaqs || defaultMriSafetyFaqs;
    req.body.surgicalFaqs = req.body.surgicalFaqs || defaultSurgicalFaqs;
    req.body.medicalFaqs = req.body.medicalFaqs || defaultMedicalFaqs;
    req.body.othersFaqs = req.body.othersFaqs || defaultOthersFaqs;

    if (isNotEmpty(req.body.height) && isNotEmpty(req.body.weight)) {
      req.body.bmi = calculateBMI(req.body.weight, req.body.height)["category"];
    }

    // Encrypt password & generate keys
    req.body.password = await Encryption.encrypt(req.body.password);
    req.body.secretKey = await Encryption.randomKey();

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    req.body.verificationToken = token;
    req.body.verificationExpires = Date.now() + 15 * 60 * 1000; // valid 15 min

    // Create patient entry
    response = await PatientCommonCrud.creatEntery(req.body);

    if (response.isSuccess) {
      // Build verification URL (frontend link or API link)
      const verificationUrl = `${config?.ClientHost}/verify/${token}`;

      // Send verification email using reusable Email2FAVerification
      await Email2FAVerification(
        req.body.email,
        verificationUrl,
        15 // expiration time in minutes
      );

      response = Response.sendResponse(
        true,
        StatusCodes.OK,
        "Patient registered successfully. Please verify your email.",
        {}
      );
    }

    const resBody = await DefaultEncryptObject(response);
    return res.status(response.statusCode).send(resBody);

  } catch (error) {
    response = Response.sendResponse(
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message,
      {}
    );
    const resBody = await DefaultEncryptObject(response);
    return res.status(response.statusCode).send(resBody);
  }
}

async function VerifyEmail(req, res) {
  const { token } = req.params;

  const patient = await PatientModel.findOne({
    verificationToken: token,
    verificationExpires: { $gt: Date.now() },
  });

  if (!patient) {
    return res.status(400).send({ message: "Invalid or expired token" });
  }
console.log("patient",patient);

  patient.isVerified = true;
  patient.verificationToken = "";
  patient.verificationExpires = null;
  await patient.save();

  return res.status(200).send({ message: "Email verified successfully!" });
}

async function SendDiagnosticSupportEmail(req, res) {
  let response;

  try {
    const { email, subject, content } = req.body;
    const files = req.files; // multiple files uploaded via multer

    if (!email || !subject || !content) {
      response = Response.sendResponse(
        false,
        StatusCodes.BAD_REQUEST,
        "Email, subject and content are required",
        {}
      );
      return res.status(response.statusCode).send(response);
    }

    // Image handling (multiple images -> array of URLs)
    let imageUrls = [];
    if (files && files.length > 0) {
      imageUrls = files.map(
        (file) => `${config.ServerHost}/images/${file.filename}`
      );
    }

    const adminEmail = config.SupportAdminEmail;

    response = await DiagnosticSupportEmail(
      adminEmail,
      email,
      subject,
      content,
      imageUrls
    );

    if (!response.success) {
      return res.status(response.statusCode).send(response);
    }

    // Otherwise return success
    return res.status(response.statusCode).send(response);
  } catch (error) {
    response = Response.sendResponse(
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message,
      {}
    );
    return res.status(response.statusCode).send(response);
  }
}

async function Login( req ,res ){

    let response

    try {

        const { email , password } = req.body;

        response = await PatientCommonCrud.getEnteryBasedOnCondition({ email : email , isActive : true  });

        if( !response['isSuccess'] ){
            let resBody = await DefaultEncryptObject(response)
            return res.status(response.statusCode).send(resBody)
        }

        if( response['isSuccess'] && !response['result'].length ){
            response = Response.sendResponse(false,StatusCodes.UNAUTHORIZED, CustumMessages.USER_NOT_Present, {})
            let resBody = await DefaultEncryptObject(response)
            return res.status(response.statusCode).send(resBody)
        }

        let patient = response['result'][0];

        console.log(patient.isVerified)
        // Check if email is verified
        if (!patient.isVerified) {
            console.log("Patient not verified", patient.isVerified);
            response = Response.sendResponse(
                false,
                StatusCodes.UNAUTHORIZED,
                "Please verify your email before logging in.",
                {}
            );

            let resBody = await DefaultEncryptObject(response)
            return res.status(response.statusCode).send(resBody);
        }

        let compare = await Encryption.compare(  password, patient['password']  )

        if( compare['status']){

            let secretKey = await Encryption.randomKey()

            response = await PatientCommonCrud.updateEntery( patient._id.toString() ,{ secretKey : secretKey })

            const token = await JWT.createToken({ id : patient._id , role : "patient" , secretKey : secretKey })

            if(token['status']){

                response = Response.sendResponse( true, StatusCodes.OK, CustumMessages.SUCCESS, {  
                    authToken : token['result'],
                    phone : patient.phone,
                    countryCode : patient.countryCode
                } )
                let resBody = await DefaultEncryptObject(response)
                return res.status(StatusCodes.OK).send(resBody)

            }else{
                
                response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR, token['error'], {  })
                let resBody = await DefaultEncryptObject(response)
                return res.status(response.statusCode).send(resBody)
            }
        }

        response = Response.sendResponse(false,StatusCodes.UNAUTHORIZED, CustumMessages.INCORRECT_CREDENTIALS, {  })
        let resBody = await DefaultEncryptObject(response)
        return res.status(response.statusCode).send(resBody)

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        let resBody = await DefaultEncryptObject(response)
        return res.status(response.statusCode).send(resBody)
    }

}

async function GetPatientDeatils( req ,res ){

    let response

    try {

        let result = JSON.parse( JSON.stringify( req.user ));

        const patientId = result['_id'].toString()

        delete result.password

        const patientPromtResponse  = await PatientPromptsCrud.getEnteryBasedOnCondition({ patientId : patientId , status : Constats.STATUS.PENDING ,isFollowUp : false });

        result['promptIds'] = patientPromtResponse.result.map( promt => ({
            [promt.bodyPartId] : promt._id.toString()
        }));

        const patientPromtFollowUpResponse  = await PatientPromptsCrud.getEnteryBasedOnCondition({ patientId : patientId , status : Constats.STATUS.PENDING ,isFollowUp : true });

        result['appoinmentIds'] = patientPromtFollowUpResponse.result.map( promt => promt._id.toString())

        response = Response.sendResponse(true,StatusCodes.OK, CustumMessages.SUCCESS, result )

        const token = await DefaultEncryptObject( response )
        return res.status(response.statusCode).send(token);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        return res.status(response.statusCode).send(response)
    }

}

async function VerifyPhone( req ,res ){

    let response

    try {

        console.log({phone : req.body.phone ,countryCode :  req.body.countryCode, isActive : true })

        response = await PatientCommonCrud.getEnteryBasedOnCondition({ phone : req.body.phone ,countryCode :  req.body.countryCode, isActive : true });

        if( !response['isSuccess'] ){
            let resBody = await DefaultEncryptObject(response)
            return res.status(response.statusCode).send(resBody)
        }

        if( response['isSuccess'] && response['result'].length ){
            response = Response.sendResponse(true,StatusCodes.OK, CustumMessages.SUCCESS, {})
            let resBody = await DefaultEncryptObject(response)
            return res.status(response.statusCode).send(resBody)
        }

        response = Response.sendResponse(false,StatusCodes.NOT_FOUND, CustumMessages.USER_NOT_Present, {})
        let resBody = await DefaultEncryptObject(response)
        return res.status(response.statusCode).send(resBody)


    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        let resBody = await DefaultEncryptObject(response)
        return res.status(response.statusCode).send(resBody)
    }

}

async function UpdateEntery( req ,res ){

    let response

    try {

        let patientId = req.user._id.toString();

        if( req.body.phone){
            response = await PatientCommonCrud.getEnteryBasedOnCondition({ phone : req.body.phone })

            if(response.isSuccess && response.result.length){

                if( response.result[0]['_id'].toString() != patientId ){
                    response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , CustumMessages.PATIENT_ALREADY_EXIST_WITH_SAME_MOBILE , {} )
                    let resBody = await DefaultEncryptObject(response)
                    return res.status(response.statusCode).send(resBody)
                }
               

            }
        }

        if( req.body.email ){

            response = await PatientCommonCrud.getEnteryBasedOnCondition({ email : req.body.email })

             if(response.isSuccess && response.result.length){

                if( response.result[0]['_id'].toString() != patientId ){
                    response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , CustumMessages.PATIENT_ALREADY_EXIST_WITH_SAME_EMAIL , {} )
                    let resBody = await DefaultEncryptObject(response)
                    return res.status(response.statusCode).send(resBody)

                }

            }
        }

        if( isNotEmpty(req.body.height) && isNotEmpty(req.body.weight)){
            req.body.bmi = (calculateBMI( req.body.weight , req.body.height ))['category']
        }
       
        response = await PatientCommonCrud.updateEntery( patientId, req.body);

        if(response.isSuccess){
            response.message = "Patient successfully updated"
        }

        let resBody = await DefaultEncryptObject(response)
        console.log(response)
        return res.status(response.statusCode).send(resBody)

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function UpdateEnteryByAdmin( req ,res ){

    let response

    try {

        let patientId = req.params.id.toString();

        if( req.body.phone){
            response = await PatientCommonCrud.getEnteryBasedOnCondition({ phone : req.body.phone })

            if(response.isSuccess && response.result.length){

                if( response.result[0]['_id'].toString() != patientId ){
                    response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , CustumMessages.PATIENT_ALREADY_EXIST_WITH_SAME_MOBILE , {} )
                    return res.status(response.statusCode).send(response)
                }
               

            }
        }

        if( req.body.email ){

            response = await PatientCommonCrud.getEnteryBasedOnCondition({ email : req.body.email })

             if(response.isSuccess && response.result.length){

                if( response.result[0]['_id'].toString() != patientId ){
                    response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , CustumMessages.PATIENT_ALREADY_EXIST_WITH_SAME_EMAIL , {} )
                    return res.status(response.statusCode).send(response)

                }

            }
        }
       
        response = await PatientCommonCrud.updateEntery( patientId, req.body);

        if(response.isSuccess){
            response.message = "Patient successfully updated"
        }

        return res.status(response.statusCode).send(response)

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function UpdateProfileImage(req, res) {
    let response;

    try {
        // Check if image was uploaded
        if (!req.file) {
            response = Response.sendResponse(false, StatusCodes.BAD_REQUEST, 'No image file uploaded', {});
            return res.status(response.statusCode).send(response);
        }

        const patientId = req.user._id.toString();

        // Fetch current user entry to remove old image if exists
        const existing = await PatientCommonCrud.getEnteryBasedOnCondition({ _id: patientId });

        if (!existing.isSuccess || !existing.result.length) {
            response = Response.sendResponse(false, StatusCodes.NOT_FOUND, 'User not found', {});
            return res.status(response.statusCode).send(response);
        }

        // Update image path in database
        const imagePath = `/${req.file.filename}`; // Save relative path

        response = await PatientCommonCrud.updateEntery(patientId, { profileImage: imagePath });

    } catch (error) {
        response = Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
    }

    return res.status(response.statusCode).send(response);
}

async function ResetPasswordByEmail( req ,res ){

    let response

    try {

        const condition = {
            email : req.body.email,
            isActive : true
        }

        const password = await Encryption.encrypt(req.body.password)
        response = await PatientCommonCrud.updateEnteryBasedOnCondition( condition , { password : password} );

        if(response.isSuccess){
            response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , "password reset successfully" , {})
            let resBody = await DefaultEncryptObject(response)
            return res.status(response.statusCode).send(resBody)
        }
         
        let resBody = await DefaultEncryptObject(response)
        return res.status(response.statusCode).send(resBody)

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        let resBody = await DefaultEncryptObject(response)
        return res.status(response.statusCode).send(resBody)
        
    }

}


async function ResetPasswordByPhone( req ,res ){

    let response

    try {

        const condition = {
            phone : req.body.phone,
            countryCode : "+"+ req.body.countryCode
        }

        const password = await Encryption.encrypt(req.body.password)
        response = await PatientCommonCrud.getEnteryBasedOnCondition( condition);

        if(response.isSuccess && !response.result.length){
            response = Response.sendResponse( false, StatusCodes.NOT_FOUND , "User not exist" , {})
            let resBody = await DefaultEncryptObject(response)
            return res.status(response.statusCode).send(resBody)
        }

        response = await PatientCommonCrud.updateEnteryBasedOnCondition( condition , { password : password} );

         if(response.isSuccess){
            response = Response.sendResponse( true, StatusCodes.OK , "password reset successfully" , {})
            let resBody = await DefaultEncryptObject(response)
            return res.status(response.statusCode).send(resBody)
        }
         
        let resBody = await DefaultEncryptObject(response)
        return res.status(response.statusCode).send(resBody)

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        let resBody = await DefaultEncryptObject(response)
        return res.status(response.statusCode).send(resBody)
        
    }

   

}

async function DeleteEntery( req ,res ){

    let response

    try {

        response = await PatientCommonCrud.updateEntery( req.user._id.toString(), { isActive : false} );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function Logout( req ,res ){

    let response

    try {

        response = await PatientCommonCrud.updateEntery( req.user._id.toString(), {  secretKey : null } );

        if(response.isSuccess){
            response = Response.sendResponse( false, StatusCodes.OK , "Patient logout successfully" , {} )
        }

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}



async function GetAllEnteries( req ,res ){

    let response

    try {


        let condition = {};

        condition['isActive'] = true;
        if(req.query.role) condition['role'] = req.query.role

        response = await PatientCommonCrud.getAllEnteries(req.query ,condition );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function ResetPasswordWithToken( req ,res ){

    let response

    try {

        let password = await Encryption.encrypt(req.body.password)

        response = await PatientCommonCrud.updateEnteryBasedOnCondition({ email : req.body.email , isActive : true}  , { password : password });

        if(response.isSuccess)
            response = Response.sendResponse( true, StatusCodes.OK , "Reset password successfully" , {} )

        let resBody = await DefaultEncryptObject(response)
        return res.status(response.statusCode).send(resBody)

    } catch (error) {
        
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function GetSingleEntery( req ,res ){

    let response

    try {

        response = await PatientCommonCrud.getSingleEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function CreateToken( req ,res ){

    let response

    try {

        response = await DefaultEncryptObject(req.body);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(200).send(response)

}

async function DecryptToken( req ,res ){

    let response

    try {

        console.log(req.body.token)

        response = defaultDecryptObject(req.body.token)

        console.log(response)

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(200).send(response)

}


async function GetPatientDiagnotica( req ,res ){

    let response

    try {

        let result = await DiagnosticsModel.find({patientId : req.user._id.toString(), status : Constats.STATUS.COMPLETED })
                    // .skip(offset)
                    // .limit(size)
                    // .sort(sort)
                    .populate('doctorId', '_id firstName lastName')
                    .populate('patientId', '_id firstName lastName')
                    .lean(); 
        
        result = result.map(item => ({
            ...item,
            doctorId:  item.doctorId,
            patientId:  item.patientId
        }));

        response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , result )

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    let resBody = await DefaultEncryptObject(response);
    return res.status(response.statusCode).send(resBody)

}

module.exports = {
    Registration,
    VerifyEmail,
    SendDiagnosticSupportEmail,
    Login,
    VerifyPhone,
    UpdateEntery,
    UpdateEnteryByAdmin,
    UpdateProfileImage,
    ResetPasswordByEmail,
    ResetPasswordByPhone,
    DeleteEntery,
    GetAllEnteries,
    GetSingleEntery,   
    GetPatientDeatils,
    Logout,
    ResetPasswordWithToken,
    CreateToken,
    DecryptToken,
    GetPatientDiagnotica
}