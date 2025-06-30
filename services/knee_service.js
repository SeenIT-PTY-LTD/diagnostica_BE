const KneeModel = require("../model/knee_model");

const createKneeEntry = async (data) => {
  const entry = new KneeModel(data);
  return await entry.save();
};

module.exports = { createKneeEntry };