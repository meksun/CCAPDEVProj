const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },

    Date: {
        type: Date,
        require: true
    },
    rating: {
        type: Number,
        require: true
    } ,

    text: {
        type: String,
        require: true
    },
    producttag:
    {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('comment', commentSchema);