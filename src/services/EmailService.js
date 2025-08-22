const Handlebars = require('handlebars')
const fs = require('fs');
const { StatusCodes } = require('../utils/StatusCodes');
const config = require('../config/config');
const Response = require('../utils/Response')
const nodemailer = require("nodemailer")

async function SendRefferalEmail( to , fullName ){

  let response 
  try {
            
    let tempPath =  process.cwd() + "/src/templates/patient/RefferalTemp.hbs";             
    let file = fs.readFileSync( tempPath, 'utf8').toString();            
    let temp = Handlebars.compile(file);            

    let obj = {
      fullName : fullName
    }

    let emailText = temp(obj); 

    let emailObj = {
      to : to,
      subject : "Refferal Email",
      html : emailText
    }

    response = await SendEmail( emailObj );            

  } catch (err) {            

    response = Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
  }

  return response;
}

async function DoctorForgotPasswordEmail( to , fullName, token  ){
  let response
    try {
            
      let tempPath =  process.cwd() + "/src/templates/doctor/ForgotPassword.hbs";  
      const link = `${config.ClientHost}/reset-password?token=${token}`           
      let file = fs.readFileSync( tempPath, 'utf8').toString();            
      let temp = Handlebars.compile(file);            

      let obj = {
        fullName : fullName,
        link : link
      }

      let emailText = temp(obj); 

      let emailObj = {
        to : to,
        subject : "Refferal Email",
        html : emailText
      }

      response = await SendEmail( emailObj );            

    } catch (err) {            

      response = Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, err.message, {});
    }

    return response;
        
}

// Register Handlebars helpers
Handlebars.registerHelper("formatDate", function (date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
});

Handlebars.registerHelper("now", function () {
  return new Date();
});

async function Email2FAVerification(to, verificationUrl, expirationTime) {
  let response;
  try {
    const tempPath = process.cwd() + "/src/templates/patient/Email2FAVerification.hbs";
    const file = fs.readFileSync(tempPath, "utf8").toString();
    const template = Handlebars.compile(file);

    // dynamic data for template
    const obj = {
      verificationUrl,
      expirationTime, 
      now: new Date()
    };

    const emailHtml = template(obj);

    const emailObj = {
      to,
      subject: "Email Verification",
      html: emailHtml,
    };

    response = await SendEmail(emailObj);
  } catch (err) {
    response = Response.sendResponse(
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err.message,
      {}
    );
  }

  return response;
}

async function DiagnosticSupportEmail(toAdmin, userEmail, subject, content, imageUrls, pdfUrls) {
  let response;
  try {
    const tempPath = process.cwd() + "/src/templates/patient/DiagnosticSupport.hbs";
    const file = fs.readFileSync(tempPath, "utf8").toString();
    const template = Handlebars.compile(file);

    const obj = {
      email: userEmail,
      subject,
      content,
      imageUrls: imageUrls || [],
      pdfUrls: pdfUrls || [],
    };

    const emailHtml = template(obj);

    const emailObj = {
      to: toAdmin,
      subject: `Diagnostic Support - ${subject}`,
      html: emailHtml,
    };

    response = await SendEmail(emailObj);
  } catch (err) {
    response = Response.sendResponse(
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      err.message,
      {}
    );
  }
  return response;
}


async function SendEmail(data) {
  let response;

  try {

    // const transporter = nodemailer.createTransport({
    //    host: "smtpout.secureserver.net",
    //    port: 465,
    //    secure: true,
    //    auth: {
    //     user: "info@diagnostica.app", // Ensure correct email
    //     pass: "Info@Diag@2052", // Ensure correct password or app password
    //   },
    // });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kunal.dignizant@gmail.com", // Gmail
        pass: "whik ogms rqnt zeak",        // App password
      },
    });

    const mailOptions = {
      from: `${data.subject || "Website Enquiry Form"} <kunal.dignizant@gmail.com>`,
      to: data.to,
      subject: data.subject,
      html: data.html,
    };

    const info = await transporter.sendMail(mailOptions);

    response = Response.sendResponse(
      true,
      StatusCodes.OK,
      "Email Send Successfully",
      info
    );
  } catch (error) {
    console.error("Error sending email:", error);
    response = Response.sendResponse(
      false,
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message,
      {}
    );
  }

  return response;
}

module.exports = {
    SendRefferalEmail,
    Email2FAVerification,
    DiagnosticSupportEmail,
    SendEmail,
    DoctorForgotPasswordEmail
};