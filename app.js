const express = require("express");
const body_parser = require("body-parser");
const router = require("./routers/router");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use("/images", express.static("img"));

app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  })
);
app.use(body_parser.json());
app.use("/", router);
app.use(express.json());

//Presale token form details form code start

// Create transporter
const transporter = nodemailer.createTransport({
  // service: "gmail",
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: "info@diagnostica.app", // Ensure correct email
    pass: "Info@Diag@2052", // Ensure correct password or app password
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Received data:", message);

  const structuredMessageRows = message
    ?.split("\n")
    .map((line) => {
      const [label, value] = line.split(":").map((s) => s.trim());
      if (!label || !value) return "";
      return `<tr>
      <td style="padding: 8px; font-weight: bold;">${label}:</td>
      <td style="padding: 8px;">${value}</td>
    </tr>`;
    })
    .filter((row) => row) // remove empty
    .join("");

  const isStructured = structuredMessageRows.length > 0;

  const mailOptions = {
    from: '"Website Enquiry Form" <support@diagnostica.app>',
    to: "info@diagnostica.app",
    subject: "New Token Presale Submission",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
      <h2 style="text-align: center; color: #2c3e50;">🚀 New Token Presale Submission</h2>
      <p style="font-size: 16px; color: #555;">You have received a new presale request. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Name:</td>
          <td style="padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Email:</td>
          <td style="padding: 8px;">${email}</td>
        </tr>
        ${
          isStructured
            ? structuredMessageRows
            : `<tr>
                <td style="padding: 8px; font-weight: bold;">Message:</td>
                <td style="padding: 8px;">${message}</td>
              </tr>`
        }
      </table>
      <p style="text-align: center; margin-top: 30px; font-size: 14px; color: #999;">
        This message was sent from the Diagnostica Token Presale Form.
      </p>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending mail:", error);
      return res.status(500).send({ success: false, error });
    }
    res.send({ success: true, message: "Email sent successfully!" });
  });
});

//Presale token form details form code end

module.exports = app;
