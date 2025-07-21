const Response = require('../utils/Response');
const JWT = require('../utils/JwtAuthToken')


const AuthMiddleware = async(req, res, next) => {
  const exemptedRoutes = [
    { method: "POST" , path: "/test" },
    { method: "POST", path: "/patient/registration" },
    { method: "POST", path: "/patient/login" },
    { method: "POST", path: "/patient/varify-phone" },
    { method: "PUT",  path: "/patient/reset-password-by-phone" },
    { method: "PUT",  path: "/patient/reset-password-by-email" },
    { method: "POST", path: "/user/registration"},
    { method: "POST", path: "/user/login" },
    { method: "POST", path: "/user/varify-email" },
    { method: "POST", path: "/user/forgot-password" },
    { method: "PUT",  path: "/user/reset-password" }
  ];

  // Check if route is exempted
  const isExempted = exemptedRoutes.some(
    (route) => route.method === req.method && route.path === req.path
  );  

  if (isExempted ) {
    return next();
  }
  
  // Extract token from headers
  const token = req.header('Authorization')
  if (!token) {
    let response = Response.sendResponse( false , 401 ,'Access denied. No token provided.', {})
    return res.status(response.statusCode).json(response);
  }

  try {
    // Verify token
    const decoded = await JWT.verify( token )
    req.user = decoded['result']['data']; // Attach user info to the request object
    next();
  } catch (err) {

    let message = err.message;
    if(err.message=="jwt expired"){
      message = "Auth credentials is expaired"
    }
    
    let response = Response.sendResponse( false , 401 ,message, {})

    res.status(response.statusCode).json(response);
  }
};

module.exports = AuthMiddleware;