const {CustumMessages} = require("../utils/CustumMessages")
const Response = require("../utils/Response")
const { StatusCodes } = require("../utils/StatusCodes")


function TestController( req ,res ){
    let response = Response.sendResponse( true, StatusCodes.OK , CustumMessages.SUCCESS , { "message": "This test api"} )
    return res.status(response.statusCode).send(response)
}

module.exports = {
   TestController
}