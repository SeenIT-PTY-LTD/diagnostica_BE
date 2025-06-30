const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const answerSchema = new Schema({
  questionId: String,
  answer: Schema.Types.Mixed,
});

const hipSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    images: [String],
    hagos: [answerSchema],
    hos : [answerSchema],
    sra : [answerSchema],
    ohs : [answerSchema]
  },
  { timestamps: true }
);

const hipModel = db.model('Hip', hipSchema);

module.exports = hipModel;
