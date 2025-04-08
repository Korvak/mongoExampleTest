const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Config = new Schema({
    name : {
        type : String,
        minlength : [3, "creator must have a viable name"],
        maxlength : [100, "creator name is too long"],
        required : true
    },
    creator : {
        type : String,
        minlength : [3, "creator must have a viable name"],
        maxlength : [100, "creator name is too long"],
        required : true
    },
    data : {
        type : Schema.Types.Mixed,
        required : true
    }
}, { timestamps:true } );

module.exports = mongoose.model('Config', Config );