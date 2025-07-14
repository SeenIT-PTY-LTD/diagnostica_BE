var mongoose = require('mongoose');
const { Schema } = mongoose;

var schema = new Schema({
    name : {
        type : String,
        required : true
    }
});

const bodyPartModel = new mongoose.model('bodyPart', schema);

module.exports = bodyPartModel;