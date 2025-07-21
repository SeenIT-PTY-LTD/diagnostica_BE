const config = require("../config/config")
const { encryptObject, DefaultencryptObject } = require("../utils/Crypto")
const {CustumMessages} = require("../utils/CustumMessages")
const Response = require("../utils/Response")
const { StatusCodes } = require("../utils/StatusCodes")


async function TestController( req ,res ){
    let token = await DefaultencryptObject(req.body)
    let response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , { "token": token} )
    return res.status(response.statusCode).send(response)
}

module.exports = {
   TestController
}