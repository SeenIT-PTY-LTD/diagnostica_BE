// const mongoose = require('mongoose');
// const { Schema } = require('mongoose');

// const schema = new Schema({
//     name :{
//         type : String,
//         required : true,
//         uniq : true
//     },
//     sectionId  : {
//         type: Schema.Types.ObjectId, 
//         ref: 'sections',
//         required : true
//     },
//     data : {
//         type : [],
//         required : true
//     }
// },{ timestamps : true }
// );

// const SubSectionModel = new mongoose.model('sub_section', schema);

// module.exports = SubSectionModel;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: [String], required: true }
}, { _id: true }); // ensures each question gets its own _id

const DataSchema = new Schema({
  instruction: { type: String, required: true },
  questions: { type: [QuestionSchema], required: true }
}, { _id: true }); // each data entry also gets an _id

const SubSectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: 'sections',
    required: true
  },
  data: { type: [DataSchema], required: true }
}, { timestamps: true });

const SubSectionModel = mongoose.model('sub_section', SubSectionSchema);

module.exports = SubSectionModel;