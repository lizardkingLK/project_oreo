const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema( {
    name: {
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
    userSince: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: ''
    },
    images: {
        type: Array,
        default: []
    },
    availability: {
        type: Boolean,
        default: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);