const AppoinmentModel = require("../models/AppointmentModel");
const PatientPromtsModel = require("../models/PatientsPromtsModel");
const SectionModel = require("../models/SectionModel");
const CommonCrud = require("../services/CommonCrud");
const { CustumMessages } = require("../utils/CustumMessages");
const Response = require("../utils/Response");
const { StatusCodes } = require("../utils/StatusCodes");

//common crud 
const AppointmentCommonCrud = new CommonCrud(AppoinmentModel);
const SectionCommonCrud = new CommonCrud(SectionModel);
const PatientPromtCommanCrud = new CommonCrud(PatientPromtsModel)

async function GetAppointmentByDoctor( req ,res ){

    let response

    try {
    
        response = await AppointmentCommonCrud.getAllEnteries({},req.query);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

async function GetSectionsByAppointment( req ,res ){

    let response

    try {
        response = await AppointmentCommonCrud.getEnteryBasedOnCondition({ appointmentId: req.query.appointmentId});

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetSectionAttemptedData( req ,res ){

    let response
    try {

        const {  appointmentRefId , sectionId } = req.query;
        
        response = await PatientPromtCommanCrud.getEnteryBasedOnCondition({ appointmentRefId: appointmentRefId });

        console.log('resposse', response)
        
        if(response.isSuccess && response.result.length){
            
            // let sectionData = await GetSectionAttemptedDataByDate( response.result , sectionId )

            let sectionData 

            let sections = response.result[0]['sections']

            sections.forEach(section => {
                
                if(section._id.toString() == sectionId.toString()){
                    
                    sectionData = section
                }

            });

            let questions = []

            if(!sectionData){
                response = Response.sendResponse( true, StatusCodes.NOT_FOUND , "No data found" , {})
                return res.status(response.statusCode).send(response) 
            }

            sectionData.subSections[0]['data'].forEach( data => {
                console.log('=======================data', ...data['questions'])
                questions = [...questions, ...data['questions']]
            })
            
            response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS ,  questions )

        }

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


// function GetSectionAttemptedDataByDate(data,sectionId) {
//     console.log()
//     const sectionByDate = {};

//     data.forEach((entery) =>{

//      entery.sections.forEach(section => {

//         console.log(section)
//         if( section._id.toString() == sectionId ){

//             section.subSections.forEach(subSection => {

//                 const date = new Date(subSection.createdAt);
//                 const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

//                 subSection.data.forEach(block => {

//                     if (block.questions) {

//                         block.questions.forEach(question => {
                            
//                             if(!sectionByDate[formattedDate]){
//                                 sectionByDate[formattedDate] = []
//                             }
//                             sectionByDate[formattedDate].push(question);
                            
//                         });
//                     }
//                 });

//             });
//         }
       
//     });
//    })
  
//   return Object.keys(sectionByDate).map(date => ({
//     date,
//     media: sectionByDate[date]
//   }));
// }



module.exports = {
    GetAppointmentByDoctor,
    GetSectionsByAppointment,
    GetSectionAttemptedData
}