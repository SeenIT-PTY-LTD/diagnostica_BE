const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const answerSchema = new Schema({
  questionId: String,
  answer: Schema.Types.Mixed,
});

const elbowSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    images: [String],
    pree: [answerSchema],
    pasesE: [answerSchema],
    ases: [answerSchema],
    dash: [answerSchema],
  },
  { timestamps: true }
);

const EqModel = db.model('Elbow', elbowSchema);

module.exports = EqModel;
