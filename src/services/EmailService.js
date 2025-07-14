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

async function SendEmail( data ) {

  let response 

    try {

      const transporter = nodemailer.createTransport({
         host: "smtpout.secureserver.net",
         port: 465,
         secure: true,
         auth: {
          user: "info@diagnostica.app", // Ensure correct email
          pass: "Info@Diag@2052", // Ensure correct password or app password
        },
      });

      const mailOptions = {
        from: '"Website Enquiry Form" <support@diagnostica.app>',
        to: data.to,
        subject: data.subject,
        html: data.html
      };

      console.log(mailOptions)
      const info = await transporter.sendMail(mailOptions);

      response =  Response.sendResponse(true, StatusCodes.OK, "Email Send Successfully", info );
      
    } catch (error) {
      console.error('Error sending email:', error);
      response = Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR, error.message , {} );
    }
    return response
    
}

module.exports = {
    SendRefferalEmail,
    SendEmail,
    DoctorForgotPasswordEmail
};