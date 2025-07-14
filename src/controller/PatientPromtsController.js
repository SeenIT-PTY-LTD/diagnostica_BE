const SectionModel = require("../models/SectionModel");
const BodyPartModel = require("../models/BodyPartModel");
const SubSectionModel = require("../models/SubSectionModel");
const AppoinmentModel = require('../models/AppointmentModel')
const PatientsPromtsModel = require("../models/PatientsPromtsModel");
const CommonCrud = require("../services/CommonCrud");
const { CustumMessages } = require("../utils/CustumMessages");
const Response = require("../utils/Response");
const { StatusCodes } = require("../utils/StatusCodes");

//common crud 
const SectionCommonCrud = new CommonCrud(SectionModel);
const SubSectionCommonCrud = new CommonCrud(SubSectionModel);
const PatientsPromtsCommonCrud  = new CommonCrud(PatientsPromtsModel);
const BodyPartCommonCrud  = new CommonCrud(BodyPartModel);
const appointmentCommonCrud = new CommonCrud(AppoinmentModel)

async function GetSectionsMetadata( req ,res ){

    let response

    try {

        const {  bodyPartId , patientId } =  req.query;

        const userAttenptedSectionResponse = await PatientsPromtsCommonCrud.getEnteryBasedOnCondition({ status : "" , bodyPartId : bodyPartId, patientId: patientId });

        if(!userAttenptedSectionResponse.isSuccess){
            return res.status(userAttenptedSectionResponse.statusCode).send(userAttenptedSectionResponse)
        }

        const sectioResponse = await SectionCommonCrud.getEnteryBasedOnCondition({ bodyPartId : bodyPartId });

        if(!sectioResponse.isSuccess){
            return res.status(sectioResponse.statusCode).send(sectioResponse)
        }

        let result = {};
        result.totalSections = sectioResponse.result.length;
        result.completedSections = userAttenptedSectionResponse.result.length

        const userPromts = userAttenptedSectionResponse.result;
        const sectionsData = sectioResponse.result;

        let sections = [];

        sectionsData.forEach( ( section ,index ) => {

            if(userPromts[index]){
                sections.push(userPromts[index])
            }else{
                let obj = JSON.parse(JSON.stringify(section))
                obj['sectionId'] = obj['_id']
                obj['status'] = "Pending"
                sections.push(obj)
            }

        });

        result.sections = sections;

        response = Response.sendResponse( false, StatusCodes.OK ,CustumMessages.SUCCESS, result )

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetSubSectionMetadata( req ,res ){

    let response

    try {

        const { bodyPartId , patientId , sectionId } = req.query;

        const userAttenptedSectionResponse = await PatientsPromtsCommonCrud.getEnteryBasedOnCondition({ bodyPartId : bodyPartId, patientId : patientId });
        if(!userAttenptedSectionResponse.isSuccess){
            return res.status(userAttenptedSectionResponse.statusCode).send(userAttenptedSectionResponse)
        }

        const subSectionsResponse = await SubSectionCommonCrud.getEnteryBasedOnCondition( { sectionId : sectionId });

        if(!subSectionsResponse.isSuccess){
            return res.status(subSectionsResponse.statusCode).send(subSectionsResponse)
        }

        let subSectionMetaData = [];
        const subSectionsData = subSectionsResponse.result;
        const userPromtsData = userAttenptedSectionResponse.result.length ? userAttenptedSectionResponse.result[0].sections :  [];

        let userPromtsSection = userPromtsData.filter((section)=> sectionId == section._id );

        subSectionsData.forEach((subSection,index) =>{

            if( userPromtsData.length ){
                if(userPromtsSection[0]['subSections'][index]){
                    subSectionMetaData.push(subSection)
                    console.log('exist')
                    return
                }
            } 

            let obj = JSON.parse(JSON.stringify(subSection));
            obj['status'] = "Pending"
            subSectionMetaData.push(obj)
            
            
        })

        response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , subSectionMetaData )

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)
}

async function UpdateSubSectionMetadata( req ,res ){

    let response

    try {

        const { bodyPartId , patientId , sectionId , subSectionData } = req.body;

        const userAttenptedSectionResponse = await PatientsPromtsCommonCrud.getSingleEntery(req.params.id);

        if(!userAttenptedSectionResponse.isSuccess){
            return res.status(userAttenptedSectionResponse.statusCode).send(userAttenptedSectionResponse)
        }

        let userAttenptedSectionData = {};

        const sectionResponse = await SectionCommonCrud.getEnteryBasedOnCondition( { bodyPartId : bodyPartId });

        if(!sectionResponse.isSuccess){
                return res.status(sectionResponse.statusCode).send(sectionResponse)
        }

        if( !userAttenptedSectionResponse.result.length ){

            let sectionData = sectionResponse.result

            userAttenptedSectionData.totalSections = sectionData.length;
            userAttenptedSectionData.completedSections = 0;
            userAttenptedSectionData.sections = [];
            userAttenptedSectionData.patientId = patientId;
            userAttenptedSectionData.bodyPartId = bodyPartId;

            sectionData.forEach((section,index) =>{

                section = JSON.parse(JSON.stringify(section))
                section.status = "Pending"

                if( section._id == sectionId ){
                    section.subSections = [subSectionData]
                }else{
                    section.subSections = []
                }

                userAttenptedSectionData.sections[index] = section
            })
        
            response = await PatientsPromtsCommonCrud.creatEntery( userAttenptedSectionData)

        }else{

            const userAttenptedData = JSON.parse(JSON.stringify(userAttenptedSectionResponse.result))[0];
            const userAttemotedDataSections = userAttenptedData['sections'];
            let updateData = {};

            userAttemotedDataSections.forEach((section) =>{

                if(section._id == sectionId){
                    section.subSections = subSectionData
                }

                let isPending = false
                subSectionData.forEach((subSection) =>{
                    if(subSection['status'] == "Pending"){
                        isPending = true
                    }
                })

                if(!isPending){
                    section.status = "Completed"
                }
                
            })

            let completedSectionCount = 0;
            let totalSectionCount = 0

            userAttemotedDataSections.forEach((section) =>{
                let totalSubSection = section['subSections'].length;
                let completedSubSections  = 0
                totalSectionCount++

                section['subSections'].forEach((subSection) =>{
                    if(subSection['status'] == "Completed"){
                        completedSubSections++
                    }
                })

                if( totalSubSection == completedSubSections){
                    completedSectionCount++
                }
            })


            if( completedSectionCount == totalSectionCount){
                updateData['status'] = "Completed";
                if(!userAttenptedData['appointmentRefId']){
                   
                   const bodyPartResponse = await BodyPartCommonCrud.getSingleEntery(bodyPartId);
                   
                   const appointmentId = bodyPartResponse['result'][0]['name'].split(" ").map(word => word[0]).join('').toUpperCase();

                   const checkAppointmentIdExist = await appointmentCommonCrud.getEnteryBasedOnCondition({ appointmentId : appointmentId });

                   if( checkAppointmentIdExist.result.length){
                        response = await createAppointment( bodyPartId , patientId , req.params.id)
                   }
                }
                
            }

            updateData['sections'] = userAttemotedDataSections;
            updateData['completedSections'] = completedSectionCount;
            updateData['totalSections'] = totalSectionCount;

            response = await PatientsPromtsCommonCrud.updateEntery( req.params.id , updateData )

            if(response.isSuccess){
                response = await PatientsPromtsCommonCrud.getSingleEntery( req.params.id )
            }

        }
       
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
            userAttenptedSectionData.patientId = patientId;
            userAttenptedSectionData.bodyPartId = bodyPartId;

            response = await PatientsPromtsCommonCrud.creatEntery( userAttenptedSectionData);

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

        if( !userAttenptedSectionResponse.result.length ){

            let sectionData = sectionResponse.result;

            userAttenptedSectionData.totalSections = sectionData.length;
            userAttenptedSectionData.completedSections = 0;
            userAttenptedSectionData.sections = [];
            userAttenptedSectionData.patientId = patientId;
            userAttenptedSectionData.bodyPartId = bodyPartId;
            userAttenptedSectionData.appointmentRefId = appointmentRefId;

            response = await PatientsPromtsCommonCrud.creatEntery( userAttenptedSectionData);

            if(response.isSuccess){
                
                const appointmentResponse = await appointmentCommonCrud.getSingleEntery(appointmentRefId);

                let updateData = {};
                let patientPromtIds = appointmentResponse.result[0]['patientPromtIds'];
                patientPromtIds.push(response.result[0]['_id'])
                updateData['patientPromtIds'] = patientPromtIds;
            
                response = await appointmentCommonCrud.updateEntery(updateData)
            }

        }else{
            response = Response.sendResponse( false, StatusCodes.NOT_ACCEPTABLE, "Sections not created for body part" , {} )

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
        response = await PatientsPromtsCommonCrud.getAllEnteriesWithoutLimit({},{bodyPartId : bodyPartId, patientId : patientId});

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
        response = await PatientsPromtsCommonCrud.getAllEnteriesWithoutLimit({},{bodyPartId : bodyPartId, patientId : patientId});
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

async function createAppointment( bodyPartId  , patientId , patientPromtId ){

    let response

    try {
     
        const bodyPartResponse = await BodyPartCommonCrud.getSingleEntery(bodyPartId);

        const bodyPartData = bodyPartResponse.result[0];
        const initials = appointmentId = bodyPartData['name'].split(" ").map(word => word[0]).join('').toUpperCase();

        let isAppointmentPresent = true;
        let number = 1;
        let appointmentId = ""

        while (isAppointmentPresent) {

            appointmentId = initials + "-" + number
            
            const appointmentResponse = await appointmentCommonCrud.getEnteryBasedOnCondition({ appointmentId : appointmentId })

            if(appointmentResponse.result.length){
                number++
            }else{
               isAppointmentPresent = false
            }

        }

        let data = {};
        data['appointmentId'] = appointmentId;
        data['patientId'] = patientId;
        // data['doctorId'] = doctorId
        data['patientPromtIds'] = [
            patientPromtId
        ]
        
        response = await appointmentCommonCrud.creatEntery(data)
        

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return response
}


module.exports = {
  GetSectionsMetadata,
  GetSubSectionMetadata,
  UpdateSubSectionMetadata,
  GetUserSelectedPromtsImages,
  GetUserAttemptedSubSectionPromtsDateWise,
  CreateNewPatientPromts,
  AssignPromtByDoctor
}