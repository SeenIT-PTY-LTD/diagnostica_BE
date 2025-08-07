const BodyPartsModel = require("../models/BodyPartModel");
const CommonCrud = require("../services/CommonCrud");
const { CustumMessages } = require("../utils/CustumMessages");
const Encryption = require("../utils/Encryption");
const Response = require("../utils/Response");
const JWT = require('../utils/JwtAuthToken')
const { StatusCodes } = require("../utils/StatusCodes");
const SectionModel = require("../models/SectionModel");
const { DefaultEncryptObject } = require("../utils/Crypto");

//common crud 
const BodyPartCommonCrud = new CommonCrud(BodyPartsModel);
const SectionCommonCrud = new CommonCrud(SectionModel);


async function CreateEntery( req ,res ){

    let response

    try {
        
        response = await BodyPartCommonCrud.getEnteryBasedOnCondition({ name : req.body.name});

        if( response.isSuccess && response.result.length ){
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "body part with same name alrady exist" , {})
            return res.status(response.statusCode).send(response)
        }

        response = await BodyPartCommonCrud.creatEntery(req.body);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

async function UpdateEntery( req ,res ){

    let response

    try {

        response = await BodyPartCommonCrud.getEnteryBasedOnCondition({ name : req.body.name });

        if( response.isSuccess && response.result.length ){

            if( response.result[0]['_id'].toString() != req.params.id.toString() ){
                response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "body part with same name alrady exist" , {})
                return res.status(response.statusCode).send(response)
            }

        }

        response = await BodyPartCommonCrud.updateEntery(req.params.id, req.body);

    } catch (error) {
        console.log(error,'***errro')
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}



async function DeleteEntery( req ,res ){

    let response

    try {

        response = await SectionCommonCrud.getEnteryBasedOnCondition({ bodyPartId : req.params.id });

        if( response.isSuccess && response.result.length ){
            response = Response.sendResponse( false, StatusCodes.BAD_REQUEST , "Body part is assigned to the section "+ response.result[0]['name'] , {} )
            return res.status(response.statusCode).send(response)
        }

        response = await BodyPartCommonCrud.deleteEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetAllEnteries( req ,res ){

    let response

    try {

        response = await BodyPartCommonCrud.getAllEnteriesWithoutLimit(req.query);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    let resBody = await DefaultEncryptObject(response)
    return res.status(response.statusCode).send(resBody)

}

async function GetSingleEntery( req ,res ){

    let response

    try {

        response = await BodyPartCommonCrud.getSingleEntery( req.params.id );

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