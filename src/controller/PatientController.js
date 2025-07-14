const PatientModel = require("../models/PatientModel");
const CommonCrud = require("../services/CommonCrud");
const { CustumMessages } = require("../utils/CustumMessages");
const Encryption = require("../utils/Encryption");
const Response = require("../utils/Response");
const JWT = require('../utils/JwtAuthToken')
const { StatusCodes } = require("../utils/StatusCodes");


//common crud 
const PatientCommonCrud = new CommonCrud(PatientModel)

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

        if(response.isSuccess){
            response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , "Patient created successfully" )
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
            const token = await JWT.createToken({ email : req.body.email , id : patient._id })

            if(token['status']){
                response = Response.sendResponse( true, StatusCodes.OK, CustumMessages.SUCCESS, { 
                    token : token['result'] , 
                    id : patient._id , 
                    name : patient.firstName,
                    email : patient.email
                })
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

        response = await PatientCommonCrud.getAllEnteries(req.query ,{});

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
    GetSingleEntery    
}