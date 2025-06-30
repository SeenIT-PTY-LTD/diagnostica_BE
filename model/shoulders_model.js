const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const answerSchema = new Schema({
  questionId: String,
  answer: Schema.Types.Mixed,
});

const shoulderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    images: [String],
    dash: [answerSchema],
    spadi: [answerSchema],
    sst: [answerSchema],
    worc: [answerSchema],
    asf: [answerSchema],
  },
  { timestamps: true }
);

const EqModel = db.model('Shoulder', shoulderSchema);

module.exports = EqModel;
