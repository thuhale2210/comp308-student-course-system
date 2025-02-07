const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
    section: { type: String, required: true },
    semester: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
