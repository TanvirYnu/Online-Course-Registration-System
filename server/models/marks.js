const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
    courseName: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    marks: {
        type: String,
        required: true
    },
});

const Result = mongoose.model('result', ResultSchema);

module.exports = Result;