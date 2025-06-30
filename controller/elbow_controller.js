const { createElbowEntry } = require("../services/elbow_service");
const Elbow = require('../model/elbow_model');

const addElbowData = async (req, res) => {
  try {
    const images = (req.files || []).map((file) => file.filename);
    const { email, pree, pasesE, ases, dash } = req.body;

    if (!email || !pree || !pasesE || !ases || !dash) {
      return res.status(400).json({
        message: "Email and all question sets (PREE, PASES-E, ASES, DASH) are required.",
      });
    }

    const parsedData = {
      email,
      images,
      pree: JSON.parse(pree),
      pasesE: JSON.parse(pasesE),
      ases: JSON.parse(ases),
      dash: JSON.parse(dash),
    };

    const result = await createElbowEntry(parsedData);

    res.status(201).json({
      message: "Elbow questionnaire data saved successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error saving elbow data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getElbowData = async (req, res) => {
  try {
    const { email } = req.query;

    let query = {};
    if (email) {
      query.email = email;
    }

    const results = await Elbow.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Elbow data fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error("Error fetching elbow data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addElbowData,
  getElbowData,
};
