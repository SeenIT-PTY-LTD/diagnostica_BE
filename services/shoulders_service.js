const Shoulder = require("../model/shoulders_model");

const createShouldersEntry = async (data) => {
  const entry = new Shoulder(data);
  return await entry.save();
};

module.exports = { createShouldersEntry };
