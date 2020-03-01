const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema( {
    name: {
        type: String,
        available: true
    },
    amount: {
        type: Number,
        available: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);