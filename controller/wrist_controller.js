const { createShouldersEntry } = require("../services/shoulders_service");
const Shoulders = require('../model/shoulders_model');
const WristModel = require("../model/wrist_model");
const { createWristEntry } = require("../services/wrist_service");

const addWristData = async (req, res) => {
  try {
    let images 

    if( req.files ){
      images =   (req.files || []).map((file) => file.filename)
    }
  
    const { email , prwhe } = req.body;

    if (!email ) {
      return res.status(400).json({
        message: "Email are required.",
      });
    }

    let parsedData = {
      email
    };

    parsedData['images'] = images;
    if( prwhe ) parsedData['prwhe'] = JSON.parse(prwhe)

    const result = await createWristEntry(parsedData);

    res.status(201).json({
      message: "Wrist questionnaire data saved successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error saving Wrist data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getWristData = async (req, res) => {
  try {
    const { email } = req.query;

    let query = {};
    if (email) {
      query.email = email;
    }

    const results = await WristModel.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Wrist data fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error("Error fetching Wrist data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addWristData,
  getWristData
};
