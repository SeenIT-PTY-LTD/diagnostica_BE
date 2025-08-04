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


async function Registration( req ,res ){

    let response

    try {

        const checkEmail = await PatientCommonCrud.getEnteryBasedOnCondition({ email : req.body.email , isActive : true })

        if(checkEmail['isSuccess'] && checkEmail['result'].length){
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Email is alrady present" , {} )
            return res.status(response.statusCode).send(response)
        }
        const checkPhone = await PatientCommonCrud.getEnteryBasedOnCondition({ phone : req.body.phone , countryCode : req.body.countryCode , isActive : true })

        if(checkPhone ['isSuccess'] && checkPhone['result'].length){
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Phone is alrady present" , {} )
            return res.status(response.statusCode).send(response)
        }

        req.body.password = await Encryption.encrypt(req.body.password);
        req.body.secretKey = await Encryption.randomKey()
        response = await PatientCommonCrud.creatEntery(req.body);

        if(response.isSuccess){
            response = Response.sendResponse( true, StatusCodes.OK , "patient registration sucessfully" , {} )
            console.log(response,'******response')
            // let resBody = await DefaultEncryptObject( response )
            // console.log('***resbody',resBody)
            return res.status(response.statusCode).send(response)
        }

    } catch (error) {
    
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

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
    Login,
    VerifyPhone,
    UpdateEntery,
    ResetPasswordByEmail,
    ResetPasswordByPhone,
    DeleteEntery,
    GetAllEnteries,
    GetSingleEntery,   
    GetPatientDeatils
}