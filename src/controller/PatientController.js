const PatientModel = require("../models/PatientModel");
const CommonCrud = require("../services/CommonCrud");
const { CustumMessages } = require("../utils/CustumMessages");
const Encryption = require("../utils/Encryption");
const Response = require("../utils/Response");
const JWT = require('../utils/JwtAuthToken')
const { StatusCodes } = require("../utils/StatusCodes");
const { encryptObject, decryptString, DefaultencryptObject, decryptObject, defaultDecryptObject, DefaultEncryptObject } = require("../utils/Crypto");
const config = require('../config/config')

//common crud 
const PatientCommonCrud = new CommonCrud(PatientModel)

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
        response = await PatientCommonCrud.creatEntery(req.body);

        console.log('****************create',response)
        if(response.isSuccess){
            response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS ,req.body )
            console.log(response,'******response')
            let resBody = await DefaultEncryptObject( response )
            console.log('***resbody',resBody)
            return res.status(response.statusCode).send(resBody)
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
            return res.status(response.statusCode).send(response)
        }

        if( response['isSuccess'] && !response['result'].length ){
            response = Response.sendResponse(false,StatusCodes.UNAUTHORIZED, CustumMessages.USER_NOT_Present, {})
            return res.status(response.statusCode).send(response)
        }

        let patient = response['result'][0];

        let compare = await Encryption.compare(  password, patient['password']  )

        if( compare['status']){
            const token = await JWT.createToken({ email : req.body.email , id : patient._id , role : "patient" })

            if(token['status']){

                let result = JSON.parse( JSON.stringify(patient));
                delete result.password
                result['authToken'] = token['result']
                
                response = Response.sendResponse( true, StatusCodes.OK, CustumMessages.SUCCESS, result )
                let resBody = await DefaultEncryptObject(response)
                return res.status(StatusCodes.OK).send(resBody)

            }else{
                response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR, token['error'], {  })
            }
            return res.status(response.statusCode).send(response)
        }

        response = Response.sendResponse(false,StatusCodes.UNAUTHORIZED, CustumMessages.INCORRECT_CREDENTIALS, {  })
        return res.status(response.statusCode).send(response);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        return res.status(response.statusCode).send(response)
    }

}

async function GetPatientByToken( req ,res ){

    let response

    try {

        response = await PatientCommonCrud.getSingleEntery( req.user.id )

        const token = await encryptObject( response.result[0] , config.CryptoSecretKey )
        
        response = Response.sendResponse(true,StatusCodes.OK, CustumMessages.SUCCESS, { token : token  })

        return res.status(response.statusCode).send(response);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        return res.status(response.statusCode).send(response)
    }

}

async function VerifyPhone( req ,res ){

    let response

    try {

        response = await PatientCommonCrud.getEnteryBasedOnCondition({ phone : req.body.phone , isActive : true });

        if( !response['isSuccess'] ){
            return res.status(response.statusCode).send(response)
        }

        if( response['isSuccess'] && response['result'].length ){
            response = Response.sendResponse(true,StatusCodes.OK, CustumMessages.SUCCESS, {})
            return res.status(response.statusCode).send(response)
        }

        response = Response.sendResponse(false,StatusCodes.NOT_FOUND, CustumMessages.USER_NOT_Present, {})
        return res.status(response.statusCode).send(response)


    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        return res.status(response.statusCode).send(response)
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

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function ResetPasswordByPhone( req ,res ){

    let response

    try {

        const condition = {
            phone : req.body.phone
        }

        const password = await Encryption.encrypt(req.body.password)

        response = await PatientCommonCrud.updateEnteryBasedOnCondition( condition , { password : password} );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function DeleteEntery( req ,res ){

    let response

    try {

        response = await PatientCommonCrud.updateEntery( req.params.id, { isActive : false} );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetAllEnteries( req ,res ){

    let response

    try {

        response = await PatientCommonCrud.getAllEnteries(req.query ,{ isActive : true});

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
    GetPatientByToken
}