const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const schema = new Schema({
    name :{
      type : String,
        required : true,
        uniq : true
    },
    bodyPartId : {
        type: Schema.Types.ObjectId,
        ref: 'bodyParts',
        required : true
    },
    sectionCode : {
        type :String,
        required : true
    }
},{ timestamps : true }
);

const SectionModel = new mongoose.model('section', schema);

module.exports = SectionModel;