const CommonCrud = require("../services/CommonCrud");

const  HospitalModel = require("../models/HospitalModel");
const { StatusCodes } = require("../utils/StatusCodes");
const Response = require("../utils/Response");
const { CustumMessages } = require("../utils/CustumMessages");

const HospitalCommonCrud = new CommonCrud(HospitalModel);

// create hospital
// /hospital/create

async function CreateHospital( req ,res ){

    let response

    try {
        const hospitalData = { ...req.body };

        // If logo file is uploaded, add the file path
        if (req.file) {
            const logoPath = `/ima/hospitals/${req.file.filename}`;
            hospitalData.logo = logoPath;
        }

        response = await HospitalCommonCrud.creatEntery(hospitalData);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

//  get all servey
//   /servey/ 

async function GetAllHospitals( req ,res ){

    let response

    try {
    
        response = await HospitalCommonCrud.getAllEnteries({},req.query);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

async function GetSingleHospital( req ,res ){

    let response

    try {
    
        response = await HospitalCommonCrud.getSingleEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)
}

async function UpdateSingleHospital( req,res){
    let response

    try {
    
        response = await HospitalCommonCrud.updateEntery( req.params.id , req.body );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)
}

async function UploadHospitalLogo( req,res){
    let response

    try {
    
        response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , {} )

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)
}

module.exports = {
   CreateHospital,
   GetAllHospitals,
   GetSingleHospital,
   UpdateSingleHospital,
   UploadHospitalLogo
}