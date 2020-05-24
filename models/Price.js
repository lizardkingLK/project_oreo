const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = Schema({
    itemId: {
        type: String,
        required: true
    },
    oldPrice: {
        type: String,
        required: true
    },
    newPrice: {
        type: String,
        default: null
    },
    discount: {
        type: String,
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = Price = mongoose.model('price', PriceSchema);

