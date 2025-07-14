const DiagnosticsModel = require("../models/DiagnosticsModel");
const CommonCrud = require("../services/CommonCrud");
const Response = require("../utils/Response");
const { StatusCodes } = require("../utils/StatusCodes");

//common crud 
const DiagnosticsCommonCrud = new CommonCrud(DiagnosticsModel);

async function CreateEntery( req ,res ){

    let response

    try {
    

        response = await DiagnosticsCommonCrud.creatEntery(req.body);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

async function UpdateEntery( req ,res ){

    let response

    try {

        response = await DiagnosticsCommonCrud.updateEntery(req.params.id, req.body);

        if(response.isSuccess){
            response = await DiagnosticsCommonCrud.getSingleEntery(req.params.id)
        }

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function DeleteEntery( req ,res ){

    let response

    try {
        response = await DiagnosticsCommonCrud.deleteEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetAllEnteries( req ,res ){

    let response

    try {

        response = await DiagnosticsCommonCrud.getAllEnteriesWithoutLimit(req.query);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function GetSingleEntery( req ,res ){

    let response

    try {

        response = await DiagnosticsCommonCrud.getSingleEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


module.exports = {
    CreateEntery,
    UpdateEntery,
    DeleteEntery,
    GetAllEnteries,
    GetSingleEntery    
}