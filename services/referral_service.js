const ReferralModel = require("../model/referral_model");

class ReferralServices {

    static async createEntery(data){
        try{

            const Data = new ReferralModel(data);
            const result = Data.save();

            return { isSuccess : true ,statusCode : 200, result : result, message : "Entery Created Successfully"}
        }catch(err){
            return { isSuccess : false ,statusCode : 500, message : err.message , result : {} }

        }
    }

  
    static async getEnteriesBasedOnCondition( condition ) {
        try {

            const result = await ReferralModel.find( condition )

            return { isSuccess : true ,statusCode : 200, result : result, message : "Success"}
        } catch (error) {
            return { isSuccess : false ,statusCode : 500, result : {}, message : err.message}

        }
    }
    
}

module.exports = ReferralServices;