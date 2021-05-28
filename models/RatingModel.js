
var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema({
    user : {
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    stars:{
        type: Number,
        required: true
    },
    product:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    }




}
,{ collection: 'reviews' });

module.exports = mongoose.model('Rating', RatingSchema);
