const config = require("../config/config")
const { encryptObject, DefaultEncryptObject } = require("../utils/Crypto")
const {CustumMessages} = require("../utils/CustumMessages")
const Response = require("../utils/Response")
const { StatusCodes } = require("../utils/StatusCodes")


async function TestController( req ,res ){
    let response = Response.sendResponse( true, StatusCodes.OK , "Server is accessable required token" , { message : "Server is accessable required token"} )
    return res.status(response.statusCode).send(response)
}

module.exports = {
   TestController
}