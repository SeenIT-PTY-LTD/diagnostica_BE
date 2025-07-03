const BodyPartsServices = require("../services/body_parts_service");


exports.create = async(req, res, next)=>{
    try{
    
        const response = await BodyPartsServices.createEntery( req.body );
        return res.status(response['statusCode']).send(response)

    }catch(error){
        const response = { isSuccess : false ,statusCode : 500, message : err.message , result : {} }
        return res.status(response['statusCode']).send(response)
    }
}


exports.getEnteries = async(req,res,next) => {
    try {
        const response = await BodyPartsServices.getEnteriesBasedOnCondition( {} );
        return res.status(response['statusCode']).send(response)
    } catch (error) {
        const response = { isSuccess : false ,statusCode : 500, message : err.message , result : {} }
        return res.status(response['statusCode']).send(response)
    }
}
