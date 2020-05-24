const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({

    collectionName: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }

});

module.exports = Collection = mongoose.model('collection', CollectionSchema);