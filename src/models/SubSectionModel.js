const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const schema = new Schema({
    name :{
        type : String,
        required : true,
        uniq : true
    },
    sectionId  : {
        type: Schema.Types.ObjectId, 
        ref: 'sections',
        required : true
    },
    data : {
        type : [],
        required : true
    }
},{ timestamps : true }
);

const SubSectionModel = new mongoose.model('subSection', schema);

module.exports = SubSectionModel;