const Elbow = require("../model/elbow_model");

const createElbowEntry = async (data) => {
  const entry = new Elbow(data);
  return await entry.save();
};

module.exports = { createElbowEntry };
