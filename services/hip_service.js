const hipModel = require("../model/hip_model");

const createHipEntry = async (data) => {
  const entry = new hipModel(data);
  return await entry.save();
};

module.exports = { createHipEntry };