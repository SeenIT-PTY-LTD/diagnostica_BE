const hipModel = require("../model/hip_model");
const { createHipEntry } = require("../services/hip_service");

const addHipData = async (req, res) => {
  try {
    let images 
    
    if( req.files){
      images = (req.files || []).map((file) => file.filename);
    }
    
    const { email, hagos,hos,sra,ohs} = req.body;

    if (!email ) {
      return res.status(400).json({
        message: "Email are required.",
      });
    }

    let parsedData = {
      email
    };

    if( images ) parsedData['images'] = images;
    if( hagos ) parsedData['hagos'] = JSON.parse(hagos);
    if( hos ) parsedData['hos'] = JSON.parse(hos);
    if( sra ) parsedData['sra'] = JSON.parse(sra);
    if( ohs) parsedData['ohs'] = JSON.parse(ohs)

    const result = await createHipEntry(parsedData);

    res.status(201).json({
      message: "Hip questionnaire data saved successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error saving Hip data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getHipData = async (req, res) => {
  try {
    const { email } = req.query;

    let query = {};
    if (email) {
      query.email = email;
    }

    const results = await hipModel.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Hip data fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error("Error fetching hip data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addHipData,
  getHipData,
};
