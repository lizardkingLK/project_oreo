const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    categoryName: {
        type: String,
        required: true
    },
    categoryType: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = Category = mongoose.model('category', CategorySchema);