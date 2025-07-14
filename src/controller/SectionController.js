const SectionModel = require("../models/SectionModel");
const SubSectionModel = require("../models/SubSectionModel");
const CommonCrud = require("../services/CommonCrud");
const Response = require("../utils/Response");
const { StatusCodes } = require("../utils/StatusCodes");

//common crud 
const SectionCommonCrud = new CommonCrud(SectionModel);
const SubSectionCommonCrud = new CommonCrud(SubSectionModel)

async function CreateEntery( req ,res ){

    let response

    try {
        
        response = await SectionCommonCrud.getEnteryBasedOnCondition({ name : req.body.name});

        if( response.isSuccess && response.result.length ){
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Section with same name alrady exist" , {})
            return res.status(response.statusCode).send(response)
        }

        response = await SectionCommonCrud.creatEntery(req.body);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

async function UpdateEntery( req ,res ){

    let response

    try {

        response = await SectionCommonCrud.getEnteryBasedOnCondition({ name : req.body.name });

        if( response.isSuccess && response.result.length ){
            console.log(response.result[0]['_id'].toString())
            console.log(req.params.id)
            if( response.result[0]['_id'].toString() != req.params.id.toString() ){
                response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Section with same name alrady exist" , {})
                return res.status(response.statusCode).send(response)
            }

        }

        response = await SectionCommonCrud.updateEntery(req.params.id, req.body);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function DeleteEntery( req ,res ){

    let response

    try {

        response = await SubSectionCommonCrud.getEnteryBasedOnCondition({ sectionId : req.params.id });

        if( response.isSuccess && response.result.length ){
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE , "Section is assinged to the sub section "+ response.result[0]['name'], {} )
            return res.status(response.statusCode).send(response)
        }

        response = await SectionCommonCrud.deleteEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetAllEnteries( req ,res ){

    let response

    try {

        response = await SectionCommonCrud.getAllEnteriesWithoutLimit(req.query);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}

async function GetSingleEntery( req ,res ){

    let response

    try {

        response = await SectionCommonCrud.getSingleEntery( req.params.id );

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