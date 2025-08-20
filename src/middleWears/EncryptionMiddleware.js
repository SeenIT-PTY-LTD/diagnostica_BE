const { decryptObject } = require("../utils/Crypto");
const Response = require("../utils/Response");
const { StatusCodes } = require("../utils/StatusCodes");
const config = require('../config/config')

const decryptReqMiddleware = async(req, res, next) => {
  try {

    if( !req.body.token){
      let response = Response.sendResponse(false, 406, "token is required", {})
      return res.status(response.statusCode).send(response)
    }
   
    let token = await decryptObject(req.body.token, config.CryptoSecretKey);
    if (!token) {
      let response = Response.sendResponse(false, 400, "Invalid token", {})
      return res.status(response.statusCode).send(response)
    }
    req.body = token;
    // console.log(req.body, 'decryptUserReq')
    return next();
  } catch (err) {
    console.log(err, "decryptUserReq");
    let response = Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, {})
    return res.status(response.statusCode).send(response)
  }
};

module.exports = {
    decryptReqMiddleware
}