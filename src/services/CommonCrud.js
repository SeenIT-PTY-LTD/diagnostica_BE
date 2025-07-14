const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
// internal modules
const Response = require('../utils/Response');
const { CustumMessages } = require('../utils/CustumMessages');
const { StatusCodes } = require('../utils/StatusCodes');


class CommonCrud{

    static Model 

    constructor(model){
        this.Model = model
    }

    // Create a new document
    creatEntery = async (data) => {
        try {

            let result = await this.Model.create( data);
        

            return Response.sendResponse( true , StatusCodes.CREATED , CustumMessages.CREATED , result  );

        } catch (error) {

            return Response.sendResponse( false , StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        }
    };
    
    // Get Single Entery
    getSingleEntery = async ( id ) => {
        try {
        
            const condition = { _id : id }
            let result = await this.Model.find( condition );

            return Response.sendResponse( true , StatusCodes.OK , CustumMessages.SUCCESS , result  );
    
        } catch (error) {
            return Response.sendResponse( false , StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        }
        };
        
    
    // Read documents
    getAllEnteries = async ( query , queryWhereCondition = {} ) => {
        try {
    
            let size = 10;
            let offset = 0;
            let page = 0;

            size = query['size'] ? parseInt(query['size']) : 10;
            page = query['page'] ? parseInt(query['page'] - 1) : 0;
            offset = size * page;

            let sort = {}
            
            if (query['sort'])
                sort = JSON.parse(query['sort'])
            else
                sort['createdAt'] = -1

           
            let filters = query['filters']

            if (filters != undefined) {
        
                filters = JSON.parse(filters);
                let filterKeys = Object.keys(filters);

                for (let x = 0; x < filterKeys.length; x++) {

                    if(filters[filterKeys[x]] instanceof Array){

                        if(filterKeys[x] == "id"){
                            queryWhereCondition["_id"] = {"$in": filters[filterKeys[x]]};
                        }else{
                            queryWhereCondition[filterKeys[x]] = {"$in": filters[filterKeys[x]]};
                        }

                    }else{

                        if( filterKeys[x] == "id" ){
                            queryWhereCondition["_id"] = filters[filterKeys[x]];
                        }else{
                            queryWhereCondition[filterKeys[x]] = filters[filterKeys[x]];
                        }
                    }

                }
            }   


            if( query.searchCriteria &&query.search  ){
         
                queryWhereCondition[query.searchCriteria] = {
                        '$regex': `^${query.search}`, "$options": "si"
                }
            
            }

            if( query.search && !query.searchCriteria ){

                queryWhereCondition['$or'] = [
                    {
                       name : new RegExp(query.search, "i")
                    },
                    {
                       code : new RegExp(query.search, "i")
                    }
                ]
            }
            
            let result = await this.Model.find(queryWhereCondition).skip(offset).limit(size).sort(sort);            
            let resultLength = await this.Model.find(queryWhereCondition).countDocuments()

            let obj = {}
            obj['list'] = result;
            obj['count'] = resultLength;

            return Response.sendResponse( true ,StatusCodes.OK , CustumMessages.SUCCESS , obj  )
    
        } catch (error) {
            
            return Response.sendResponse( false , StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        }
    };

    getAllEnteriesWithoutLimit = async ( query , queryWhereCondition = {} ) => {
        try {

            let sort = {}
            
            if (query['sort'])
                sort = JSON.parse(query['sort'])
            else
                sort['created_at'] = -1

           
            let filters = query['filters']

            if (filters != undefined) {
        
                filters = JSON.parse(filters);
                let filterKeys = Object.keys(filters);

                for (let x = 0; x < filterKeys.length; x++) {

                    if(filters[filterKeys[x]] instanceof Array){

                        if(filterKeys[x] == "id"){
                            queryWhereCondition["_id"] = {"$in": filters[filterKeys[x]]};
                        }else{
                            queryWhereCondition[filterKeys[x]] = {"$in": filters[filterKeys[x]]};
                        }

                    }else{

                        if( filterKeys[x] == "id" ){
                            queryWhereCondition["_id"] = filters[filterKeys[x]];
                        }else{
                            queryWhereCondition[filterKeys[x]] = filters[filterKeys[x]];
                        }
                    }

                }
            }   


            if( query.searchCriteria ){
         
                queryWhereCondition[query.searchCriteria] = {
                        '$regex': `^${query.search}`, "$options": "si"
                }
            
            }

            if( query.search && !query.searchCriteria ){

                queryWhereCondition['$or'] = [
                    {
                       name : new RegExp(query.search, "i")
                    },
                    {
                       code : new RegExp(query.search, "i")
                    }
                ]
            }
            
            
            let result = await this.Model.find(queryWhereCondition).sort(sort);            
            let resultLength = await this.Model.find(queryWhereCondition).countDocuments()

            console.log(result);

            let obj = {}
            obj['list'] = result;
            obj['count'] = resultLength;

            return Response.sendResponse( true ,StatusCodes.OK , CustumMessages.SUCCESS , obj  )
    
        } catch (error) {
            
            return Response.sendResponse( false , StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        }
    };
    
    // Get Single Entery
    getEnteryBasedOnCondition = async ( condition ) => {
        try {

            let result = await this.Model.find(  condition );   
            
            return Response.sendResponse( true ,  StatusCodes.OK , CustumMessages.SUCCESS , result )
    
        } catch (error) {
            
            return Response.sendResponse( false ,StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        }
    };

    // Get Single Entery
    getSingleEnteryBasedOnCondition = async ( condition ) => {
        try {

            let result = await this.Model.findOne(  condition );   
            
            return Response.sendResponse( true ,  StatusCodes.OK , CustumMessages.SUCCESS , result )
    
        } catch (error) {
            
            return Response.sendResponse( false ,StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        }
    };
    
    // Update a document
    updateEntery = async ( id, data) => {
        try {

            let checkExist = await this.Model.find({ _id : id });

            if( !checkExist.length ){
                return Response.sendResponse( false , StatusCodes.NOT_FOUND , CustumMessages.DATA_NOT_PRESENT , {} )
            }

            let result = await this.Model.updateOne( { _id : id }, { $set : data});
                
            return Response.sendResponse( true , StatusCodes.OK , CustumMessages.UPDATED , {} )
    
    } catch (error) {
            return Response.sendResponse( false , StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
    }
    };
    
    // Update a document on condition
    updateEnteryBasedOnCondition = async ( condition, data) => {
        try {
            console.log(data,'***************dtaa')
            console.log(condition,'****condition')
            let result = await this.Model.updateOne( condition , {$set : data});

            return Response.sendResponse( true , StatusCodes.OK , CustumMessages.SUCCESS , result )
        
        } catch (error) {
            return Response.sendResponse( false , StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        }
    };
        
    
    // Delete a document
    deleteEntery = async (id) => {
        try {

            const condition = { _id : id }

            let result = await this.Model.find( condition );

            if( result.length ){
                result = await this.Model.findByIdAndDelete(id);

                return Response.sendResponse( true , StatusCodes.OK , CustumMessages.SUCCESS , result )
            }else{

                return Response.sendResponse( false , StatusCodes.NOT_FOUND , CustumMessages.DATA_NOT_PRESENT , result )
            }

        } catch (error) {
            return Response.sendResponse( false ,  StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        }
    };

    // Delete a document
    getCount = async (condition) => {
        try {
            let count = await this.Model.countDocuments(condition)
            return Response.sendResponse( true , StatusCodes.OK , CustumMessages.SUCCESS , { count : count } )
        
        } catch (error) {
            return Response.sendResponse( false ,  StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        }
    };

    async getAggregatedEntries(aggregateQuery) {

        try {

            let list = await this.Model.aggregate(aggregateQuery);
            return Response.sendResponse( true , StatusCodes.OK , CustumMessages.SUCCESS , list )

        } catch (error) {

            return Response.sendResponse( false ,  StatusCodes.INTERNAL_SERVER_ERROR , error.message , {} )
        }
    }

}

module.exports = CommonCrud;