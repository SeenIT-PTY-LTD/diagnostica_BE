require('dotenv').config();

const nodemailer = require("nodemailer");
const Response = require('./Response');
const { StatusCodes } = require('./StatusCodes');
const { CustumMessages } = require('./CustumMessages');


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
});

function SendEmail( emailObj ){

    try {

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailObj['to'],
            subject: emailObj['subject'],
            html : emailObj['html'],
        };
                  
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {                
              return Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {})
            }            
            return Response.sendResponse(true, StatusCodes.OK , "Email send successfully" , info )
        });
        
    } catch (error) {
        return Response.sendResponse(false, StatusCodes.INTERNAL_SERVER_ERROR , error.message , {})
    }
}

module.exports = SendEmail;