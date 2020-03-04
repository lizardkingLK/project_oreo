const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema( {
    name: {
        type: String,
        default: '',
        lowercase: true
    },
    type: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        default: ''
    },
    size: {
        type: String,
        default: '',
        uppercase: true
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

module.exports = Item = mongoose.model('item', ItemSchema);