const BodyPartModel = require("../model/body_part_model");

class BodyPartsServices {

    // static async createEntery(data){
    //     try{

    //         const Data = new BodyPartModel(data);
    //         const result = Data.save();

    //         return { isSuccess : true ,statusCode : 200, result : result, message : "Entery Created Successfully"}
    //     }catch(err){
    //         return { isSuccess : false ,statusCode : 500, message : err.message , result : {} }

    //     }
    // }

  
    static async getEnteriesBasedOnCondition( condition ) {
        try {

            const result = await BodyPartModel.find( condition )

            return { isSuccess : true ,statusCode : 200, result : result, message : "Success"}
        } catch (error) {
            return { isSuccess : false ,statusCode : 500, result : {}, message : err.message}

        }
    }

  
    
}

module.exports = BodyPartsServices;