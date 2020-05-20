const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategories: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    images: {
        type: Array,
        default: []
    },
    storyUrl: {
        type: String,
        default: ''
    },
    sizes: {
        type: Array,
        default: []
    },
    price: {
        type: String,
        required: true
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

ItemSchema.index({name: "text"})

module.exports = Item = mongoose.model('item', ItemSchema);