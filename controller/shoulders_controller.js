const { createShouldersEntry } = require("../services/shoulders_service");
const Shoulders = require('../model/shoulders_model');

const addShouldersData = async (req, res) => {
  try {
    let images 

    if( req.files){
      images = (req.files || []).map((file) => file.filename);
    }
   
    const { email, dash, spadi, sst, worc, asf } = req.body;

    if (!email ) {
      return res.status(400).json({
        message: "Email are required.",
      });
    }

    let parsedData = {
      email
    };

    if( images ) parsedData['images'] = images;
    if( dash ) parsedData['dash'] = JSON.parse(dash);
    if( spadi ) parsedData['spadi'] = JSON.parse(spadi);
    if( sst ) parsedData['sst'] = JSON.parse(sst);
    if( worc ) parsedData['worc'] = JSON.parse(worc);
    if( asf ) parsedData['asf'] = JSON.parse(asf)

    const result = await createShouldersEntry(parsedData);

    res.status(201).json({
      message: "Shoulders questionnaire data saved successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error saving Shoulders data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getShouldersData = async (req, res) => {
  try {
    const { email } = req.query;

    let query = {};
    if (email) {
      query.email = email;
    }

    const results = await Shoulders.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Shoulders data fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error("Error fetching Shoulders data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addShouldersData,
  getShouldersData,
};
