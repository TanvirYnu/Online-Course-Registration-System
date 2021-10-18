const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    courseId: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    classRoomNum: {
        type: String,
        required: true,
    },
    classDay: {
        type: String,
        required: true,
    },
    courseTeacher: {
        type: String,
        required: true,
    },

    courseCredit: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    }
});

const Course = mongoose.model('course', CourseSchema);

module.exports = Course;