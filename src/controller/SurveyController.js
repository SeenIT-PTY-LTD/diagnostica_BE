const CommonCrud = require("../services/CommonCrud");

const SurveyModel = require("../models/SurveyModel");
const { StatusCodes } = require("../utils/StatusCodes");
const Response = require("../utils/Response");

const surveyCommonCrud = new CommonCrud(SurveyModel);

// create servey
// /servey/create 

async function CreateSurvey( req ,res ){

    let response

    try {

        let surveyNumber = 1;

        const surveys = await surveyCommonCrud.getEnteryBasedOnCondition( { medicareNumber : req.body.medicareNumber });
        
        if(surveys.result.length){
            surveyNumber = surveys.result.length + 1
        }

        const surveyRefId = req.body.name.split(' ')[0].charAt(0).toUpperCase() +  req.body.name.split(' ')[1].charAt(0).toUpperCase() + req.body.medicareNumber.slice(0,4) + surveyNumber;

        req.body.surveyRefId = surveyRefId;

        response = await surveyCommonCrud.creatEntery(req.body);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

//  get all servey
//   /servey/ 

async function GetAllSurvey( req ,res ){

    let response

    try {
    
        response = await surveyCommonCrud.getAllEnteries({},req.query);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

async function GetSingleSurvey( req ,res ){

    let response

    try {
    
        response = await surveyCommonCrud.getSingleEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)
}

async function UpdateSingleSurvey ( req,res){
    let response

    try {
    
        response = await surveyCommonCrud.updateEntery( req.params.id , req.body );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)
}

module.exports = {
   CreateSurvey,
   GetAllSurvey,
   GetSingleSurvey,
   UpdateSingleSurvey
}