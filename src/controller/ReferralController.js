const CommonCrud = require("../services/CommonCrud");
const Response = require("../utils/Response");
const JWT = require('../utils/JwtAuthToken')
const { StatusCodes } = require("../utils/StatusCodes");
const RefferalModel = require("../models/RefferalModel");
const EmailService = require('../services/EmailService')

//common crud 
const RefferalCrud = new CommonCrud(RefferalModel)

async function CreateRefferal( req ,res ){

    let response

    try {

        const response = await RefferalCrud.creatEntery( req.body );
        
        if(response['isSuccess']){

            if( req.body['deliveryMethod']['email'] || req.body['deliveryMethod']['both'] ){

                const { email , fullName } = req.body;
                let send = await EmailService.SendRefferalEmail( email , fullName );
                console.log(send,'*****send****')
            }

            if( req.body['deliveryMethod']['sms'] || req.body['deliveryMethod']['both'] ){
                console.log('******* SMS Sending ******')
            }
            
        }
       
    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

async function GetAllEnteries( req ,res ){

    let response

    try {

        response = await RefferalCrud.getAllEnteriesWithoutLimit({},{})

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        return res.status(response.statusCode).send(response)
    }

}

async function GetSingleEntery( req ,res ){

    let response

    try {

        response = await RefferalCrud.getSingleEntery({},{})

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        return res.status(response.statusCode).send(response)
    }

}


module.exports = {
   CreateRefferal,
   GetAllEnteries,
   GetSingleEntery
}