const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Config = new Schema({
    name : {
        type : String,
        required : true
    },
    settings : {
        type : Schema.Types.Mixed
    }
}, { timestamps:true });

module.exports = mongoose.model('Config', Config );