const SectionModel = require("../models/SectionModel");
const BodyPartModel = require("../models/BodyPartModel");
const SubSectionModel = require("../models/SubSectionModel");
const AppoinmentModel = require('../models/AppointmentModel')
const PatientsPromtsModel = require("../models/PatientsPromtsModel");
const CommonCrud = require("../services/CommonCrud");
const { CustumMessages } = require("../utils/CustumMessages");
const Response = require("../utils/Response");
const { StatusCodes } = require("../utils/StatusCodes");
const Constats = require("../utils/Constants");
const { DefaultEncryptObject } = require("../utils/Crypto");

//common crud 
const SectionCommonCrud = new CommonCrud(SectionModel);
const SubSectionCommonCrud = new CommonCrud(SubSectionModel);
const PatientsPromptsCommonCrud  = new CommonCrud(PatientsPromtsModel);
const BodyPartCommonCrud  = new CommonCrud(BodyPartModel);
const AppointmentCommonCrud = new CommonCrud(AppoinmentModel)

async function GetSectionsMetadata( req ,res ){

    let response

    try {

        const {  patientPromtId ,sectionId } =  req.query;

        const userAttenptedSectionResponse = await PatientsPromptsCommonCrud.getSingleEntery(patientPromtId);

        if(!userAttenptedSectionResponse.isSuccess){
            return res.status(userAttenptedSectionResponse.statusCode).send(userAttenptedSectionResponse)
        }

        const userPromt = userAttenptedSectionResponse.result[0];

        let result = userPromt.sections.filter( section => section._id.toString() == sectionId)

        response = Response.sendResponse( false, StatusCodes.OK ,CustumMessages.SUCCESS, result )

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetSubSectionMetadata( req ,res ){

    let response

    try {

        const { bodyPartId , patientId , sectionId ,patientPromtId } = req.query;

        const userAttenptedSectionResponse = await PatientsPromptsCommonCrud.getSingleEntery(patientPromtId);
        if(!userAttenptedSectionResponse.isSuccess){
            return res.status(userAttenptedSectionResponse.statusCode).send(userAttenptedSectionResponse)
        }

        const userPromt = userAttenptedSectionResponse.result[0];
        

        response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , subSectionMetaData )

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)
}

async function UpdateSubSectionMetadata( req ,res ){

    let response

    try {

        let { sectionId , sectionData ,patientPromptId } = req.body;

        
        const userAttenptedSectionResponse = await PatientsPromptsCommonCrud.getSingleEntery(patientPromptId);

        if(!userAttenptedSectionResponse.isSuccess){
            let resBody = await DefaultEncryptObject(userAttenptedSectionResponse)
            return res.status(userAttenptedSectionResponse.statusCode).send(resBody)
        }

        const bodyPartId = userAttenptedSectionResponse.result[0]['bodyPartId']

        let userAttenptedData = JSON.parse( JSON.stringify(userAttenptedSectionResponse.result[0]));

        userAttenptedData.sections.forEach((section,sectionIndex) =>{

            if(section._id.toString() == sectionId.toString()){

                userAttenptedData.sections[sectionIndex].subSections[0]['data'] = sectionData;
                section.status = Constats.STATUS.COMPLETED;
                section.updatedAt = new Date();
               
            }

        });

        let totalSectionCount = 0;
        let completedSectionCount = 0;
        userAttenptedData.sections.forEach((section) =>{

            totalSectionCount++;

            if(section['status'] == Constats.STATUS.COMPLETED ){
                completedSectionCount++
            }
        })

        let appointmentRefId

        if(totalSectionCount == completedSectionCount){

            userAttenptedData['status'] = Constats.STATUS.COMPLETED;

            response = await BodyPartCommonCrud.getSingleEntery(bodyPartId)

            let appointmentId = response.result[0]['name'].split(' ').map((word) => word.charAt(0).toUpperCase()).join('')

            const appoinmentResponse = await AppointmentCommonCrud.getCount({ bodyPartId : bodyPartId });
            let count = appoinmentResponse.result.count + 1

            appointmentId = appointmentId + "-" + count;

            let data = {};
            data['bodyPartId'] = bodyPartId;
            data['appointmentId'] = appointmentId;
            data['patientId'] = userAttenptedData['patientId'];
            data['patientPromtIds'] = [ patientPromptId ]
            
            if(!userAttenptedData['appointmentRefId']){
                response = await AppointmentCommonCrud.creatEntery(data)
                appointmentRefId = response.result['_id'].toString()
            }
           
        }

        userAttenptedData['completedSections'] = completedSectionCount

        if(appointmentRefId){
            userAttenptedData['appointmentRefId'] = appointmentRefId
        }

        response = await PatientsPromptsCommonCrud.updateEntery( patientPromptId , userAttenptedData )
        if(response.isSuccess){
            response = await PatientsPromptsCommonCrud.getSingleEntery( patientPromptId  )
             
        }

    } catch (error) {
        console.log(error.message,'===================eror')
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    let resBody = await DefaultEncryptObject(response)
    return res.status(response.statusCode).send(resBody)
}

async function UploadImg( req ,res ){

    let response

    try {

        let image = JSON.parse(JSON.stringify(req.file)).filename;

        response = Response.sendResponse( true, StatusCodes.OK ,"Image uploaded successfully" , { image : image } )

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)
}


async function CreateNewPatientPromts(req,res){
     let response
    try {

        const { bodyPartId } = req.body;

        const patientId = req.user._id;

        let userAttenptedSectionData = {};

        const sectionResponse = await SectionCommonCrud.getEnteryBasedOnCondition( { bodyPartId : bodyPartId });

        if(!sectionResponse.isSuccess){
            const resBody = await DefaultEncryptObject(sectionResponse)
            return res.status(sectionResponse.statusCode).send(resBody)
        }

        if( sectionResponse.result.length ){

            let sectionData = sectionResponse.result;

            userAttenptedSectionData.totalSections = sectionData.length;
            userAttenptedSectionData.completedSections = 0;
            userAttenptedSectionData.sections = [];
            userAttenptedSectionData.patientId = patientId
            userAttenptedSectionData.bodyPartId = bodyPartId;

            for( let i = 0 ; i < sectionData.length; i++){

                let section = JSON.parse(JSON.stringify(sectionData[i]))

                const sebSectionResponse = await SubSectionCommonCrud.getEnteryBasedOnCondition( { sectionId : sectionData[i]['_id'] });
                const subSectionData = sebSectionResponse.result;

                section.subSections = [];
                section.status = Constats.STATUS.PENDING;
                section.createdAt = new Date();
                section.updatedAt = new Date()

                for( let k = 0; k < subSectionData.length; k++){
                
                    let subSection = JSON.parse(JSON.stringify(subSectionData[k]))
                    console.log('*****subSection',subSection)
                    subSection['status'] = Constats.STATUS.PENDING;
                    subSection.createdAt = new Date();
                    subSection.updatedAt = new Date();
                    section.subSections.push(subSection)
                }
               
                userAttenptedSectionData.sections.push(section)
            }
           
            // return res.status(200).send(userAttenptedSectionData )
            response = await PatientsPromptsCommonCrud.creatEntery( userAttenptedSectionData);

        }else{
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE, "Sections not created for body part" , {} )

        }


    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }
    const resBody = await DefaultEncryptObject(response)
    return res.status(response.statusCode).send(resBody)
}

async function AddImageInprompt(req, res) {
    let response;
    try {
        response = await PatientsPromptsCommonCrud.getSingleEntery(req.body.patientPromptId);

        if (!response?.result?.[0]) {
            return res.status(404).send(Response.sendResponse(false, 404, "Patient prompt not found", {}));
        }

        let data = JSON.parse(JSON.stringify(response.result[0]));

        let image = (req.files || []).map(file => file.filename);

        // First update sectionData if Images section exists
        data.sections?.forEach((section, index) => {
            if (section.sectionCode === "Images" && section.subSections?.[0]) {
                section.subSections[0].data = JSON.parse(req.body.sectionData || "[]");
            }
        });

        // Then update image inside questions
        data.sections?.forEach(section => {
            if (section.sectionCode === "Images" && Array.isArray(section.subSections)) {

                section.subSections.forEach(subSection => {
                    if (Array.isArray(subSection.data)) {
                        subSection.data.forEach(item => {
                            if (Array.isArray(item.questions)) {
                                item.questions.forEach(question => {
                                    if (Array.isArray(question.media)) {
                                        question.img = image;
                                    }
                                });
                            }
                        });
                    }
                });

                section.status = Constats.STATUS.COMPLETED; // Mark section as completed
            }
        });

        response = await PatientsPromptsCommonCrud.updateEntery(req.body.patientPromptId, data);

        if (response.isSuccess) {
            response = Response.sendResponse(true, StatusCodes.OK, "Image uploaded successfully", {});
        }

    } catch (error) {
        response = Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
    }
    return res.status(response.statusCode).send(response);
}

async function GetPromtsByBodypart(req,res){
     let response
    try {

        const { bodyPartId } = req.query;

        let userAttenptedSectionData = {};

        const sectionResponse = await SectionCommonCrud.getEnteryBasedOnCondition( { bodyPartId : bodyPartId });

        if(!sectionResponse.isSuccess){
            let resBody = await DefaultEncryptObject(sectionResponse)
            return res.status(sectionResponse.statusCode).send(resBody)
        }

        if( sectionResponse.result.length ){

            let sectionData = sectionResponse.result;

            userAttenptedSectionData.totalSections = sectionData.length;
            userAttenptedSectionData.completedSections = 0;
            userAttenptedSectionData.sections = [];
            userAttenptedSectionData.bodyPartId = bodyPartId;

            for( let i = 0 ; i < sectionData.length; i++){

                let section = JSON.parse(JSON.stringify(sectionData[i]))

                const sebSectionResponse = await SubSectionCommonCrud.getEnteryBasedOnCondition( { sectionId : sectionData[i]['_id'] });
                const subSectionData = sebSectionResponse.result;

                section.subSections = [];
                section.status = Constats.STATUS.PENDING

                for( let k = 0; k < subSectionData.length; k++){
                
                    let subSection = JSON.parse(JSON.stringify(subSectionData[k]))
                    subSection['status'] = Constats.STATUS.PENDING;
                    section.subSections.push(subSection)
                }
               
                userAttenptedSectionData.sections.push(section)
            }
           

            response = Response.sendResponse( true, StatusCodes.OK, CustumMessages.SUCCESS , userAttenptedSectionData )

        }else{
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE, "Sections not created for body part" , {} )

        }


    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    let resBody = await DefaultEncryptObject(response)
    return res.status(response.statusCode).send(resBody)
}

async function AssignPromtByDoctor(req,res){
     let response
    try {

        const { patientId , bodyPartId , appointmentRefId } = req.body;


        let userAttenptedSectionData = {};

        const sectionResponse = await SectionCommonCrud.getEnteryBasedOnCondition( { bodyPartId : bodyPartId });

        if(!sectionResponse.isSuccess){
            return res.status(sectionResponse.statusCode).send(sectionResponse)
        }

        if( sectionResponse.result.length ){

            let sectionData = sectionResponse.result;

            userAttenptedSectionData.totalSections = sectionData.length;
            userAttenptedSectionData.completedSections = 0;
            userAttenptedSectionData.sections = [];
            userAttenptedSectionData.patientId = patientId;
            userAttenptedSectionData.bodyPartId = bodyPartId;
            userAttenptedSectionData.isFollowUp = true;
            userAttenptedSectionData.appointmentRefId = appointmentRefId;

            for( let i = 0 ; i < sectionData.length; i++){

                let section = JSON.parse(JSON.stringify(sectionData[i]))

                const sebSectionResponse = await SubSectionCommonCrud.getEnteryBasedOnCondition( { sectionId : sectionData[i]['_id'] });
                const subSectionData = sebSectionResponse.result;

                section.subSections = [];
                section.status = Constats.STATUS.PENDING

                for( let k = 0; k < subSectionData.length; k++){
                
                    let subSection = JSON.parse(JSON.stringify(subSectionData[k]))
                    subSection['status'] = Constats.STATUS.PENDING;
                    section.subSections.push(subSection)
                }
               
                userAttenptedSectionData.sections.push(section)
            }
            

        }

        response = await PatientsPromptsCommonCrud.creatEntery( userAttenptedSectionData);

        if(response.isSuccess){

            const appointmentResponse = await AppointmentCommonCrud.getSingleEntery(appointmentRefId);

            let updateData = {};
            let patientPromtIds = appointmentResponse.result[0]['patientPromtIds'];
            patientPromtIds.push(response.result[0]['_id'])
            updateData['patientPromtIds'] = patientPromtIds;
            
            response = await AppointmentCommonCrud.updateEntery(updateData)            
             
        }

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }
    return res.status(response.statusCode).send(response)
}

async function GetUserSelectedPromtsImages( req ,res ){

    let response

    try {
        const { bodyPartId , patientId } = req.query;
        response = await PatientsPromptsCommonCrud.getAllEnteriesWithoutLimit({},{ patientId : patientId});

        console.log(response,'******response')
        if(response.isSuccess){
            let result = await extractMediaByDate(response.result.list)
            response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , result )

        }

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)
}

async function GetUserAttemptedSubSectionPromtsDateWise( req ,res ){

    let response

    try {
        const { bodyPartId , patientId , subSectionId } = req.query;
        response = await PatientsPromptsCommonCrud.getAllEnteriesWithoutLimit({},{bodyPartId : bodyPartId, patientId : patientId});
        if(response.isSuccess){
            let result = await getSubSectionByDate(response.result.list,subSectionId )
            response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , result )

        }

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)
}

function extractMediaByDate(data) {
    console.log()
    const mediaByDate = {};

    data.forEach((entery) =>{
     entery.sections.forEach(section => {
        section.subSections.forEach(subSection => {
        const date = new Date(subSection.createdAt);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

        subSection.data.forEach(block => {
            if (block.questions) {
            block.questions.forEach(question => {
                if (question.media && question.media.length) {
                if (!mediaByDate[formattedDate]) {
                    mediaByDate[formattedDate] = [];
                }
                mediaByDate[formattedDate].push(...question.media);
                }
            });
            }
        });
        });
    });
   })
  

  // Convert the mediaByDate object to an array
  return Object.keys(mediaByDate).map(date => ({
    date,
    media: mediaByDate[date]
  }));
}

function getSubSectionByDate(data, subSectionId) {

    let result = [];

    data.forEach((entery) =>{
        entery.sections.forEach(section => {
            section.subSections.forEach(subSection => {

                if (subSection._id === subSectionId) {
                    const dateObj = new Date(subSection.createdAt);
                    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;

                    result.push({
                        date: formattedDate,
                        subSectionId: subSection._id,
                        subSectionName: subSection.name,
                        status: subSection.status,
                        data: subSection.data
                    });
                }
            });
        });

    })
  
    return result
}

async function getPatientPromptByBodyPart(req, res) {
    let response;

    try {
        const patientId = req.user._id.toString(); 
        
        const { bodyPartId } = req.query; 

        if (!bodyPartId) {

            response = Response.sendResponse(false, StatusCodes.BAD_REQUEST, "Missing bodyPartId", {})
            let resBody = await DefaultEncryptObject(response)
            return res.status(StatusCodes.BAD_REQUEST).send(resBody);
        }

        let condition = {
            patientId : patientId,
            bodyPartId: bodyPartId,
            status : Constats.STATUS.COMPLETED
        }

        const data = await PatientsPromptsCommonCrud.getEnteryBasedOnCondition( condition )
        response = Response.sendResponse(true, StatusCodes.OK, "Patient prompt fetched successfully", data.result || []);

    } catch (error) {
        response = Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
    }

    let resBody = await DefaultEncryptObject(response)
    return res.status(response.statusCode).send(resBody)

}


async function getSinglePromById(req, res) {
    let response;

    try {
    
        response = await PatientsPromptsCommonCrud.getSingleEntery(req.params.id)
    } catch (error) {
        response = Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
    }

    let resBody = await DefaultEncryptObject(response)
    return res.status(response.statusCode).send(resBody)

}




module.exports = {
  GetSectionsMetadata,
  GetSubSectionMetadata,
  UpdateSubSectionMetadata,
  GetUserSelectedPromtsImages,
  GetUserAttemptedSubSectionPromtsDateWise,
  CreateNewPatientPromts,
  AssignPromtByDoctor,
  UploadImg,
  GetPromtsByBodypart,
  getPatientPromptByBodyPart,
  AddImageInprompt,
  getSinglePromById
}