const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    studentNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    program: { type: String, required: true },
    favoriteTopic: { type: String, default: "N/A" },
    strongestSkill: { type: String, default: "N/A" }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
