const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const answerSchema = new Schema({
  questionId: String,
  answer: Schema.Types.Mixed,
});

const wristSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    images: [String],
    prwhe : [answerSchema]
   
  },
  { timestamps: true }
);

const WristModel = db.model('Wrist', wristSchema);

module.exports = WristModel;
