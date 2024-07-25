const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    div: {
        type: String,
        required: true
    },
    rollno: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
