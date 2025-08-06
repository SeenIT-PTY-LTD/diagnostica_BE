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

        const {  appointmentRefId , sectionId ,startDate , endDate} = req.query;

        let condition = {}
        condition['appointmentRefId'] = appointmentRefId;

        console.log(startDate,endDate)

        if( startDate && endDate){

            let startSplit = startDate.split('/');
            let endSplit = endDate.split('/');
            let startTime = startSplit[2] + "-" + startSplit[1] + '-' + startSplit[0];
            let endTime = endSplit[2] + "-" + endSplit[1] + '-' + endSplit[0];

            console.log(startTime)

            condition['createdAt'] = {
                $gte : new Date(startTime),
                $lte : new Date(endTime)
            }
        }
        

        response = await PatientPromtCommanCrud.getEnteryBasedOnCondition(condition);

        let result = []
        
        if( response.result.length){
            
            // let sectionData = await GetSectionAttemptedDataByDate( response.result , sectionId )

            let sectionData 

            for( let i = 0; i < response.result.length; i++){

                let sections = response.result[i]['sections']
                const date = response.result[i]['createdAt']
             
                const formatted = `${String(date.getDate()).padStart(2, '0')}/${
                String(date.getMonth() + 1).padStart(2, '0')}/${
                date.getFullYear()}`;

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
                    questions = [...questions, ...data['questions']]
                })

                let object = {};
                object['date'] = formatted;
                object['data'] = questions
                result.push(object)
            }
            
            response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS ,  result )

        }else{
            response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , [] )

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