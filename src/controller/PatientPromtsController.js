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

        let result = userPrompt.sections.filter( section => section._id.toString() == sectionId)

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

        const { sectionId , sectionData ,patientPromptId } = req.body;

        const userAttenptedSectionResponse = await PatientsPromptsCommonCrud.getSingleEntery(patientPromptId);

        if(!userAttenptedSectionResponse.isSuccess){
            return res.status(userAttenptedSectionResponse.statusCode).send(userAttenptedSectionResponse)
        }

        const bodyPartId = userAttenptedSectionResponse.result[0]['bodyPartId']

        const userAttenptedData = JSON.parse( JSON.stringify(userAttenptedSectionResponse.result[0]));

        userAttenptedData.sections.forEach((section,sectionIndex) =>{

            if(section._id.toString() == sectionId){

                section.subSections.forEach((subSection,subSectionIndex) =>{

                    if( sectionData._id.toString() == subSection._id.toString()){

                        userAttenptedData.sections[sectionIndex]['subSections'][subSectionIndex] = sectionData;

                        let totalSubSection = userAttenptedData.sections[sectionIndex]['subSections'].length;
                        let completedSubSectionCount = 0

                        userAttenptedData.sections[sectionIndex]['subSections'].forEach((subSection) =>{
                            if(subSection.status == Constats.STATUS.COMPLETED ){
                                completedSubSectionCount++
                            }
                        })  

                        if(totalSubSection == completedSubSectionCount){
                            userAttenptedData.sections[sectionIndex]['status'] = Constats.STATUS.COMPLETED;
                        }
                    }

                })
                
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

        console.log(totalSectionCount,completedSectionCount)
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
            
            response = await AppointmentCommonCrud.creatEntery(data)
            console.log('****create', response)
        }
        userAttenptedData['completedSections'] = completedSectionCount

        response = await PatientsPromptsCommonCrud.updateEntery( patientPromptId , userAttenptedData )
        if(response.isSuccess){
            response = await PatientsPromptsCommonCrud.getSingleEntery( patientPromptId  )
        }

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)
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

        const { patientId , bodyPartId } = req.body;

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
            userAttenptedSectionData.patientId = patientId
            userAttenptedSectionData.bodyPartId = bodyPartId;

            for( let i = 0 ; i < sectionData.length; i++){

                let section = JSON.parse(JSON.stringify(sectionData[i]))

                const sebSectionResponse = await SubSectionCommonCrud.getEnteryBasedOnCondition( { sectionId : sectionData[i]['_id'] });
                const subSectionData = sebSectionResponse.result;

                section.subSections = [];
                section.status = Constats.STATUS.PENDING

                for( let k = 0; k < subSectionData.length; k++){
                
                    let subSection = JSON.parse(JSON.stringify(subSectionData[k]))
                    console.log('*****subSection',subSection)
                    subSection['status'] = Constats.STATUS.PENDING;
                    section.subSections.push(subSection)
                }
               
                userAttenptedSectionData.sections.push(section)
            }
           
            console.log(userAttenptedSectionData['patientId'],'++++++++patientID')
            // return res.status(200).send(userAttenptedSectionData )
            response = await PatientsPromptsCommonCrud.creatEntery( userAttenptedSectionData);

        }else{
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE, "Sections not created for body part" , {} )

        }


    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }
    return res.status(response.statusCode).send(response)
}

async function GetPromtsByBodypart(req,res){
     let response
    try {

        const { bodyPartId } = req.query;

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
            userAttenptedSectionData.bodyPartId = bodyPartId;

            for( let i = 0 ; i < sectionData.length; i++){

                let section = JSON.parse(JSON.stringify(sectionData[i]))

                const sebSectionResponse = await SubSectionCommonCrud.getEnteryBasedOnCondition( { sectionId : sectionData[i]['_id'] });
                const subSectionData = sebSectionResponse.result;

                section.subSections = [];
                section.status = Constats.STATUS.PENDING

                for( let k = 0; k < subSectionData.length; k++){
                
                    let subSection = JSON.parse(JSON.stringify(subSectionData[k]))
                    console.log('*****subSection',subSection)
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
    return res.status(response.statusCode).send(response)
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
                    console.log('*****subSection',subSection)
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
            console.log(result,'****result')
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




module.exports = {
  GetSectionsMetadata,
  GetSubSectionMetadata,
  UpdateSubSectionMetadata,
  GetUserSelectedPromtsImages,
  GetUserAttemptedSubSectionPromtsDateWise,
  CreateNewPatientPromts,
  AssignPromtByDoctor,
  UploadImg,
  GetPromtsByBodypart
}