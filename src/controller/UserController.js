const UserModel = require("../models/UserModel");
const CommonCrud = require("../services/CommonCrud");
const { CustumMessages } = require("../utils/CustumMessages");
const Encryption = require("../utils/Encryption");
const Response = require("../utils/Response");
const JWT = require('../utils/JwtAuthToken')
const { StatusCodes } = require("../utils/StatusCodes");
const EmailService = require('../services/EmailService');
const PatientModel = require("../models/PatientModel");

//common crud 
const UserCommanCrud = new CommonCrud(UserModel)
const PatientCommanCrud = new CommonCrud(PatientModel)

async function CreateEntery( req ,res ){

    let response

    try {

        console.log('====================create')
        const checkEmail = await UserCommanCrud.getEnteryBasedOnCondition({ email : req.body.email, isActive : true })

        if(checkEmail['isSuccess'] && checkEmail['result'].length){
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Email is alrady present" , {} )
            return res.status(response.statusCode).send(response)
        }

        const checkPhone = await UserCommanCrud.getEnteryBasedOnCondition({ phone : req.body.phone , countryCode : req.body.countryCode , isActive : true })

        if(checkPhone['isSuccess'] && checkPhone['result'].length){
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Phone is alrady present" , {} )
            return res.status(response.statusCode).send(response)
        }

        req.body.password = await Encryption.encrypt(req.body.password);
        response = await UserCommanCrud.creatEntery(req.body);

        if(response.isSuccess){
            response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , "Doctor created successfully" )
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

        response = await UserCommanCrud.getEnteryBasedOnCondition({ email : email });

        if( !response['isSuccess'] ){
            return res.status(response.statusCode).send(response)
        }

        if( response['isSuccess'] && !response['result'].length ){
            response = Response.sendResponse(false,StatusCodes.UNAUTHORIZED, CustumMessages.USER_NOT_Present, {})
            return res.status(response.statusCode).send(response)
        }

        let user = response['result'][0];

        let compare = await Encryption.compare(  password, user['password']  )

        if( compare['status']){
            const token = await JWT.createToken({ email : req.body.email , id : user._id , role : user.role })

            if(token['status']){

                response = Response.sendResponse( true, StatusCodes.OK, CustumMessages.SUCCESS, { 
                    token : token['result'] , 
                    id : user._id , 
                    name : user.firstName,
                    email : user.email,
                    role : user.role
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

async function Varify( req ,res ){

    let response

    try {

        response = await UserCommanCrud.getEnteryBasedOnCondition(req.body);

        if( !response['isSuccess'] ){
            return res.status(response.statusCode).send(response)
        }

        if( response['isSuccess'] && response['result'].length ){
            response = Response.sendResponse(true,StatusCodes.OK, "User exist with email", {})
            return res.status(response.statusCode).send(response)
        }

        response = Response.sendResponse(false,StatusCodes.NOT_FOUND, CustumMessages.USER_NOT_Present, {})
        return res.status(response.statusCode).send(response)


    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        return res.status(response.statusCode).send(response)
    }

}

async function GetUserDashboardCounts( req ,res ){

    let response

    try {

        response = await UserCommanCrud.getCount(req.body);

        if( !response['isSuccess'] ){
            return res.status(response.statusCode).send(response)
        }

        const doctorCount = response.result.count;

        response = await PatientCommanCrud.getCount(req.body);

        if( !response['isSuccess'] ){
            return res.status(response.statusCode).send(response)
        }

        const patientCount = response.result.count;
        const result = {
            doctorCount : doctorCount,
            patientCount : patientCount
        }

        response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , result )
        return res.status(response.statusCode).send(response)

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        return res.status(response.statusCode).send(response)
    }

}

async function UpdateEntery( req ,res ){

    let response

    try {

        response = await UserCommanCrud.updateEntery(req.params.id, req.body);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function DeleteEntery( req ,res ){

    let response

    try {

        response = await UserCommanCrud.updateEntery( req.params.id, { isActive : false } );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetAllEnteries( req ,res ){

    let response

    try {

        response = await UserCommanCrud.getAllEnteriesWithoutLimit(req.query, { isActive : true });

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function GetSingleEntery( req ,res ){

    let response

    try {

        response = await UserCommanCrud.getSingleEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function ForgotPasswordWithEmail( req ,res ){

    let response

    try {

        response = await UserCommanCrud.getEnteryBasedOnCondition({ email : req.body.email });

        console.log(response)
        if( !response['isSuccess'] ){
            return res.status(response.statusCode).send(response)
        }

        if( response['isSuccess'] && !response['result'].length){
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , CustumMessages.USER_NOT_Present , {} )
            return res.status(response.statusCode).send(response)
        }

        const user = response['result'][0];
        const id = user._id

        const token = await JWT.createTokenWithExpiryMinutes({ id : id }, 5 );

        console.log(token,'***token')

        response = await UserCommanCrud.updateEntery( id , { token : token['result']['token'] , tokenExpiry :  token['result']['expiryTime'] });

        if( !response['isSuccess'] ){
            return res.status(response.statusCode).send(response)
        }

        response = await EmailService.DoctorForgotPasswordEmail( user.email , user.firstName , token['result']['token'] )

        if(response['isSuccess']){
            response = Response.sendResponse( true, StatusCodes.OK ,"Link send your email" , {} )
        }
        

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function ResetPassword( req ,res ){

    let response

    try {

        const { token , password } = req.body;

        const verifyToken = await JWT.verify(token);

        console.log(verifyToken,'*****verifyToken')

        if(!verifyToken['status']){
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , verifyToken['error'] , {} )
            return res.status(response.statusCode).send(response)
        }

        const tokenData = verifyToken['result'];
        console.log(tokenData,'***tokenData');

        const id = tokenData['data']['id'];

        response = await UserCommanCrud.getEnteryBasedOnCondition({ _id : id , token : token });

        if( !response['isSuccess'] ) return res.status(response.statusCode).send(response)

        if( response['isSuccess'] && !response['result'].length ){
            response = Response.sendResponse( false, StatusCodes.UNAUTHORIZED , "Invalid token provided" , {} )
            return res.status(response.statusCode).send(response)
        }

        const newPassword = await Encryption.encrypt(password)

        response = await UserCommanCrud.updateEntery( id , { token : null , tokenExpiry : null , password : newPassword });

        if(response.isSuccess){
            response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.RESET_PASSWORD_SUCCESSFULLY , {} )
        }
        
    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


module.exports = {
    CreateEntery,
    Login,
    Varify,
    DeleteEntery,
    UpdateEntery,
    GetAllEnteries,
    GetSingleEntery,
    ForgotPasswordWithEmail,
    ResetPassword,
    GetUserDashboardCounts
}