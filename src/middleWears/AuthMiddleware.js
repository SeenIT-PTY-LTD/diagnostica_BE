const Response = require("../utils/Response");
const JWT = require("../utils/JwtAuthToken");
const PatientModel = require("../models/PatientModel");
const UserModel = require("../models/UserModel");

const CommonCrud = require("../services/CommonCrud");

const PatientCommonCrud = new CommonCrud(PatientModel);
const UserCommanCrud = new CommonCrud(UserModel);

const AuthMiddleware = async (req, res, next) => {
  const exemptedRoutes = [
    { method: "POST", path: "/test" },
     { method: "GET", path: "/test" },
    { method: "POST", path: "/patient/registration" },
    { method: "POST", path: "/patient/login" },
    { method: "POST", path: "/patient/varify-phone" },
    { method: "PUT", path: "/patient/reset-password-by-phone" },
    { method: "PUT", path: "/patient/reset-password-by-email" },
    { method: "POST", path: "/user/registration" },
    { method: "POST", path: "/user/login" },
    { method: "POST", path: "/user/varify-email" },
    { method: "POST", path: "/user/forgot-password" },
    { method: "PUT", path: "/user/reset-password" },
    { method: "PUT", path: "/patient/reset-password" },
    { method: "POST", path: "/patient/token" },
  ];

  // ✅ First: allow verify-email/:token
  if (req.method === "GET" && req.path.includes("/verify-email/")) {
    return next();
  }

  // Check if route is exempted
  const isExempted = exemptedRoutes.some(
    (route) => route.method === req.method && route.path === req.path
  );

  if (isExempted) {
    return next();
  }

  if (req.path.includes("/footAndAnkle")) {
    return next();
  }

  if (req.path.startsWith("/images")) {
    return next();
  }

  if (!req.header("Authorization")) {
    let response = Response.sendResponse(
      false,
      401,
      "Access denied. No token provided.",
      {}
    );
    return res.status(response.statusCode).json(response);
  }
  // Extract token from headers
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    let response = Response.sendResponse(
      false,
      401,
      "Access denied. No token provided.",
      {}
    );
    return res.status(response.statusCode).json(response);
  }

  try {
    // Verify token
    const decoded = await JWT.verify(token);

    if (!decoded["status"]) {
      let response = Response.sendResponse(false, 401, decoded["error"], {});

      return res.status(response.statusCode).json(response);
    }

    const { id, role, secretKey } = decoded["result"]["data"];

    if (role == "patient") {
      let response = await PatientCommonCrud.getSingleEntery(id);

      if (!response.isSuccess) res.status(response.statusCode).json(response);

      const patient = response.result[0];

      if (patient["secretKey"] != secretKey) {
        let response = Response.sendResponse(false, 401, "Session expired", {});
        return res.status(response.statusCode).json(response);
      }
      req.user = patient;
    } else {
      let response = await UserCommanCrud.getSingleEntery(id);

      if (!response.isSuccess) res.status(response.statusCode).json(response);

      const user = response.result[0];

      // if(user['secretKey'] != secretKey ){
      //   let response = Response.sendResponse( false , 401 ,'Session expired', {})
      //   return res.status(response.statusCode).json(response);
      // }
      req.user = user;
    }

    next();
  } catch (err) {
    let message = err.message;
    if (err.message == "jwt expired") {
      message = "Session expired";
    }

    let response = Response.sendResponse(false, 401, message, {});

    res.status(response.statusCode).json(response);
  }
};

module.exports = AuthMiddleware;