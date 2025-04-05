const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Report = new Schema({
    name : {
        type : String,
        required : true
    },
    settings : {
        type : Schema.Types.Mixed
    }
}, { timestamps:true });

module.exports = mongoose.model('Report', Report );