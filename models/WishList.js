const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishListSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        default: []
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    availability: {
        type: Boolean,
        default: true
    }
});

module.exports = WishList = mongoose.model('wishlist', WishListSchema);