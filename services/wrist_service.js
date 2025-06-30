const WristModel = require("../model/wrist_model");

const createWristEntry = async (data) => {
  const entry = new WristModel(data);
  return await entry.save();
};

module.exports = { createWristEntry };