const SubSectionModel = require("../models/SubSectionModel");
const CommonCrud = require("../services/CommonCrud");
const Response = require("../utils/Response");
const { StatusCodes } = require("../utils/StatusCodes");

//common crud 
const SubSectionCommonCrud = new CommonCrud(SubSectionModel);

async function CreateEntery( req ,res ){

    let response

    try {
        
        response = await SubSectionCommonCrud.getEnteryBasedOnCondition({ name : req.body.name});

        if( response.isSuccess && response.result.length ){
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Sub section with same name alredy exist" , {})
            return res.status(response.statusCode).send(response)
        }

        console.log(response,'****response')
        response = await SubSectionCommonCrud.creatEntery(req.body);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

async function UpdateEntery( req ,res ){

    let response

    try {

        response = await SubSectionCommonCrud.getEnteryBasedOnCondition({ name : req.body.name });

        if( response.isSuccess && response.result.length ){

            if( response.result[0]['_id'].toString() != req.params.id.toString() ){
                response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Sub section with same name alredy exist" , {})
                return res.status(response.statusCode).send(response)
            }

        }

        response = await SubSectionCommonCrud.updateEntery(req.params.id, req.body);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function DeleteEntery( req ,res ){

    let response

    try {

        response = await SubSectionCommonCrud.deleteEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetAllEnteries( req ,res ){

    let response

    try {

        response = await SubSectionCommonCrud.getAllEnteriesWithoutLimit(req.query);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetSingleEntery( req ,res ){

    let response

    try {

        response = await SubSectionCommonCrud.getSingleEntery( req.params.id );

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