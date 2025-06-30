const KneeModel = require("../model/knee_model");
const { createKneeEntry } = require("../services/knee_service");

const addKneeData = async (req, res) => {
  try {
    let images 

    if( req.files ){
      images = (req.files || []).map((file) => file.filename)
    }
  
    const { email , oks , koos } = req.body;

    if (!email ) {
      return res.status(400).json({
        message: "Email are required.",
      });
    }

    let parsedData = {
      email
    };

    if( images ) parsedData['images'] = images;
    if( oks ) parsedData['oks'] = JSON.parse(oks)
    if( koos ) parsedData['koos'] = JSON.parse(koos)

    const result = await createKneeEntry(parsedData);

    res.status(201).json({
      message: "Knee questionnaire data saved successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error saving Knee data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getKneeData = async (req, res) => {
  try {
    const { email } = req.query;

    let query = {};
    if (email) {
      query.email = email;
    }

    const results = await KneeModel.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Knee data fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error("Error fetching Knee data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addKneeData,
  getKneeData
};
