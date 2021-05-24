
var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    stars:{
        type: Number,
        required: true
    },




});

module.exports = mongoose.model('Rating', RatingSchema);
