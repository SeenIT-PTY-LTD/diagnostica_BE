const DiagnosticsModel = require("../models/DiagnosticsModel");
const CommonCrud = require("../services/CommonCrud");
const { CustumMessages } = require("../utils/CustumMessages");
const Response = require("../utils/Response");
const { StatusCodes } = require("../utils/StatusCodes");

//common crud 
const DiagnosticsCommonCrud = new CommonCrud(DiagnosticsModel);

async function CreateEntery( req ,res ){

    let response

    try {
    

        response = await DiagnosticsCommonCrud.creatEntery(req.body);

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )

    }

    return res.status(response.statusCode).send(response)

}

async function UpdateEntery( req ,res ){

    let response

    try {

        response = await DiagnosticsCommonCrud.updateEntery(req.params.id, req.body);

        if(response.isSuccess){
            response = await DiagnosticsCommonCrud.getSingleEntery(req.params.id)
        }

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function DeleteEntery( req ,res ){

    let response

    try {
        response = await DiagnosticsCommonCrud.deleteEntery( req.params.id );

    } catch (error) {
        response = Response.sendResponse( false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        
    }

    return res.status(response.statusCode).send(response)

}


async function GetAllEnteries(req, res) {
    let response;

    try {
        let query = req.query;
        let queryWhereCondition = {};

        // Pagination
        let size = query['size'] ? parseInt(query['size']) : 10;
        let page = query['page'] ? parseInt(query['page']) - 1 : 0;
        let offset = size * page;

        // Sorting
        let sort = {};
        if (query['sort']) {
            sort = JSON.parse(query['sort']);
        } else {
            sort['createdAt'] = -1;
        }

        // Filters
        let filters = query['filters'];
        if (filters !== undefined) {
            filters = JSON.parse(filters);
            let filterKeys = Object.keys(filters);

            for (let x = 0; x < filterKeys.length; x++) {
                if (filters[filterKeys[x]] instanceof Array) {
                    if (filterKeys[x] === "id") {
                        queryWhereCondition["_id"] = { "$in": filters[filterKeys[x]] };
                    } else {
                        queryWhereCondition[filterKeys[x]] = { "$in": filters[filterKeys[x]] };
                    }
                } else {
                    if (filterKeys[x] === "id") {
                        queryWhereCondition["_id"] = filters[filterKeys[x]];
                    } else {
                        queryWhereCondition[filterKeys[x]] = filters[filterKeys[x]];
                    }
                }
            }
        }

        // Search
        if (query.searchCriteria && query.search) {
            queryWhereCondition[query.searchCriteria] = {
                '$regex': `^${query.search}`,
                "$options": "si"
            };
        }

        if (query.search && !query.searchCriteria) {
            queryWhereCondition['$or'] = [
                { name: new RegExp(query.search, "i") },
                { code: new RegExp(query.search, "i") }
            ];
        }

        // Query execution with populate
        let result = await DiagnosticsModel.find(queryWhereCondition)
            .skip(offset)
            .limit(size)
            .sort(sort)
            .populate('doctorId', '_id firstName lastName')
            .populate('patientId', '_id firstName lastName')
            .lean(); // returns plain JS objects
            console.log("DiagnosticsModel", result);

        // Convert populated objects back to just IDs
        result = result.map(item => ({
            ...item,
            doctorId:  item.doctorId,
            patientId:  item.patientId
        }));
            console.log("result", result);

        let resultLength = await DiagnosticsModel.countDocuments(queryWhereCondition);

        let obj = {
            list: result,
            count: resultLength
        };

        response = Response.sendResponse(true, StatusCodes.OK, CustumMessages.SUCCESS, obj);

    } catch (error) {
        response = Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, error.message, {});
    }

    return res.status(response.statusCode).send(response);
}

async function GetSingleEntery( req ,res ){

    let response

    try {

        response = await DiagnosticsCommonCrud.getSingleEntery( req.params.id );

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