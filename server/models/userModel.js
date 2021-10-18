const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'student',
        enum: ["student", "teacher", "admin"]
    },
    accessToken: {
        type: String
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;