const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreManagerSchema = new Schema({

    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    employeeSince: {
        type: Date,
        default: Date.now
    },
});

module.exports = StoreManager = mongoose.model('storeManager', StoreManagerSchema);