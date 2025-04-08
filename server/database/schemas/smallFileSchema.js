const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SmallFile = new Schema({
    name : {
        type : String,
        required : true,
    },
    buffer : {
        type : Buffer,
    },
    contentType : String,
    uploader : String
}, { timestamps:true });

module.exports = mongoose.model('SmallFile', SmallFile );