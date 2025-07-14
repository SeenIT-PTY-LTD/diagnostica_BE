const Response = require("../utils/Response");
const { StatusCodes } = require("../utils/StatusCodes");


exports.validate = (schema) => (req, res, next) => {   
  

  if( !Object.keys(req.body).length && ( req.method == "PATCH" || req.method == "PUT" || req.method == "POST" )){
    let response = Response.sendResponse(false , StatusCodes.NOT_ACCEPTABLE ,"Payload should not be empty", {})
    return res.status(response.statusCode).send(response);
  }  
  
  if( Object.keys(req.body).length ){
    
    const { error } = schema.body.validate(req.body);
    if (error) {
      let response = Response.sendResponse(false , StatusCodes.NOT_ACCEPTABLE ,error.details[0].message, {})
      return res.status(response.statusCode).send(response);
    } 

  }

  if( Object.keys(req.params).length ){ 

    const { error } = schema.params.validate(req.params);

    if (error) {
      let response = Response.sendResponse(false , StatusCodes.NOT_ACCEPTABLE ,error.details[0].message, {})
      return res.status(response.statusCode).send(response);
    } 

  }

  if( Object.keys(req.query).length ){

    const { error } = schema.query.validate(req.query);
    if (error) {
      let response = Response.sendResponse(false , StatusCodes.NOT_ACCEPTABLE ,error.details[0].message, {})
      return res.status(response.statusCode).send(response);
    } 
    
  }

  next()
  
};