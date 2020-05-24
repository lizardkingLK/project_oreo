const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    rating: {
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    helpful: {
        type: String,
        default: '0'
    },
    notHelpful: {
        type: String,
        default: '0'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Review = mongoose.model('review', ReviewSchema);