const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        trim: true,
        required: true
    },
    score: {
        type: Number,
        min: 0
    }
});

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;