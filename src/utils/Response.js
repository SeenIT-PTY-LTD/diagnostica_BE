

class Response {
    
    sendResponse(isSuccess, statusCode, message,result) {
        return {
            isSuccess,
            statusCode,
            message,
            result
        }; 
    };
}

module.exports = new Response();