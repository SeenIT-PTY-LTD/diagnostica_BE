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
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//common crud 
const PatientCommonCrud = new CommonCrud(PatientModel)
const PatientPromptsCrud = new CommonCrud(PatientPromptsModel)

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


const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: "info@diagnostica.app",
    pass: "Info@Diag@2052",
  },
});

async function Registration(req, res) {
  let response;

  try {
    const checkEmail = await PatientCommonCrud.getEnteryBasedOnCondition({
      email: req.body.email,
      isActive: true,
    });

    if (checkEmail.isSuccess && checkEmail.result.length) {
      response = Response.sendResponse(false, StatusCodes.NOT_ACCEPTABLE, "Email is already present", {});
      return res.status(response.statusCode).send(response);
    }

    const checkPhone = await PatientCommonCrud.getEnteryBasedOnCondition({
      phone: req.body.phone,
      countryCode: req.body.countryCode,
      isActive: true,
    });

    if (checkPhone.isSuccess && checkPhone.result.length) {
      response = Response.sendResponse(false, StatusCodes.NOT_ACCEPTABLE, "Phone is already present", {});
      return res.status(response.statusCode).send(response);
    }

    const activationToken = crypto.randomBytes(32).toString("hex");

    req.body.secretKey = "12345";
    req.body.activationToken = activationToken;
    req.body.isVerified = false;

    response = await PatientCommonCrud.creatEntery(req.body);

    if (response.isSuccess) {
      const activationLink = `http://localhost:3000/activate?token=${activationToken}`;

      const mailOptions = {
        from: "info@diagnostica.app",
        to: req.body.email,
        subject: "Activate your Diagnostica account",
        html: `
          <p>Thank you for registering on Diagnostica.</p>
          <p>Please click the button below to verify your account:</p>
          <button href="${activationLink}" style="
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              color: white;
              background-color: #007bff;
              border-radius: 5px;
              text-decoration: none;
              margin-top: 10px;
          ">Click here to activate</button>
          <p>If the button doesn't work, copy and paste this URL into your browser:</p>
          <p>${activationLink}</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      response = Response.sendResponse(true, StatusCodes.OK, "Patient registered successfully. Activation email sent.", {});
      return res.status(response.statusCode).send(response);
    }

  } catch (error) {
    response = Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
    return res.status(response.statusCode).send(response);
  }
}

async function ActivatePatient(req, res) {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({ message: "Invalid or missing token." });
  }

  const patient = await PatientCommonCrud.getEnteryBasedOnCondition({
    activationToken: token,
    isVerified: false,
  });
  console.log("patient",patient);
  

  await PatientCommonCrud.updateEntery(
    { _id: patient.result[0]._id },
    { isVerified: true, activationToken: null }
  );

  return res.status(200).json({ message: "Your account has been activated successfully!" });
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
            console.log(response)
            let resBody = await DefaultEncryptObject(response)
            console.log(resBody,'*******resBOady')
            return res.status(response.statusCode).send(resBody)
        }

        let patient = response['result'][0];

        let compare = await Encryption.compare(  password, patient['password']  )

        if( compare['status']){

            let secretKey = await Encryption.randomKey()

            response = await PatientCommonCrud.updateEntery( patient._id.toString() ,{ secretKey : secretKey })

            const token = await JWT.createToken({ id : patient._id , role : "patient" , secretKey : secretKey })

            console.log(token)


            if(token['status']){

                response = Response.sendResponse( true, StatusCodes.OK, CustumMessages.SUCCESS, {  authToken : token['result'] } )
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

        console.log(patientPromtResponse,'******patientPromtResponse*****')

        result['promptIds'] =  patientPromtResponse.result.map( promt => promt._id.toString())

        const patientPromtFollowUpResponse  = await PatientPromptsCrud.getEnteryBasedOnCondition({ patientId : patientId , status : Constats.STATUS.PENDING ,isFollowUp : true });

        result['appoinmentIds'] = patientPromtFollowUpResponse.result.map( promt => promt._id.toString())

        response = Response.sendResponse(true,StatusCodes.OK, CustumMessages.SUCCESS, result )

        console.log(response,'***response')
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

        if( req.body.phone){
            response = await PatientCommonCrud.getEnteryBasedOnCondition({ phone : req.body.phone })

            if(response.isSuccess && response.result.length){

                if( response.result[0]['_id'].toString() != req.params.id.toString() ){
                    response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , CustumMessages.PATIENT_ALREADY_EXIST_WITH_SAME_MOBILE , {} )
                    return res.status(response.statusCode).send(response)

                }
               

            }
        }

        if( req.body.email ){

            response = await PatientCommonCrud.getEnteryBasedOnCondition({ email : req.body.email })

             if(response.isSuccess && response.result.length){

                if( response.result[0]['_id'].toString() != req.params.id.toString() ){
                    response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , CustumMessages.PATIENT_ALREADY_EXIST_WITH_SAME_EMAIL , {} )
                    return res.status(response.statusCode).send(response)

                }

            }
        }
       
        response = await PatientCommonCrud.updateEntery(req.params.id, req.body);

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

        const patientId = req.params.id;

        // Fetch current user entry to remove old image if exists
        const existing = await PatientCommonCrud.getEnteryBasedOnCondition({ _id: patientId });

        if (!existing.isSuccess || !existing.result.length) {
            response = Response.sendResponse(false, StatusCodes.NOT_FOUND, 'User not found', {});
            return res.status(response.statusCode).send(response);
        }

        // Update image path in database
        const imagePath = `/img/${req.file.filename}`; // Save relative path

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
            email : req.body.email
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
        console.log(response)

    } catch (error) {
        console.log(error)
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

async function GetSingleEntery( req ,res ){

    let response

    try {

        response = await PatientCommonCrud.getSingleEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


module.exports = {
    Registration,
    ActivatePatient,
    Login,
    VerifyPhone,
    UpdateEntery,
    UpdateProfileImage,
    ResetPasswordByEmail,
    ResetPasswordByPhone,
    DeleteEntery,
    GetAllEnteries,
    GetSingleEntery,   
    GetPatientDeatils
}