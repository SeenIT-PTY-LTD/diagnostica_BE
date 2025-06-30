const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const answerSchema = new Schema({
  questionId: String,
  answer: Schema.Types.Mixed,
});

const kneeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    images: [String],
    oks : [answerSchema],
    koos : [answerSchema]
   
  },
  { timestamps: true }
);

const KneeModel = db.model('Knee', kneeSchema);

module.exports = KneeModel;
