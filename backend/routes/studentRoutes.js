const express = require('express');
const { registerStudent, loginStudent, getStudents } = require('../controllers/studentController');
const protect = require('../middleware/authMiddleware');
const Student = require('../models/studentModel');
const Course = require('../models/courseModel');

const router = express.Router();

// @route   POST /api/students/register
// Register a new student
router.post('/register', registerStudent);

// @route   POST /api/students/login
// Login a student
router.post('/login', loginStudent);

// @route   GET /api/students
// Get all students (Admin access required)
router.get('/', protect, getStudents);

// Get All Courses Taken by a Student
router.get("/:studentId/courses", async (req, res) => {
    try {
        const { studentId } = req.params;

        // 🔹 Find courses where the "students" array contains the studentId
        const courses = await Course.find({ students: studentId });

        if (!courses.length) {
            return res.status(404).json({ message: "No enrolled courses found" });
        }

        res.json(courses);
    } catch (error) {
        console.error("Error fetching student courses:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Change Section for a Course
router.put("/:studentId/courses/:courseId/change-section", async (req, res) => {
    try {
        const { studentId, courseId } = req.params;
        const { newSection } = req.body;

        if (!newSection) {
            return res.status(400).json({ message: "New section is required" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Update the course section
        course.section = newSection;
        await course.save();

        res.json({ message: "Course section updated successfully" });
    } catch (error) {
        console.error("Error updating section:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Drop a Course
router.delete("/:studentId/courses/:courseId/drop", async (req, res) => {
    try {
        const { studentId, courseId } = req.params;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Remove student from the course's student array
        course.students = course.students.filter(
            (enrolledStudent) => enrolledStudent.toString() !== studentId
        );

        await course.save();
        await student.save();

        res.json({ message: "Dropped course successfully" });
    } catch (error) {
        console.error("Error dropping course:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

module.exports = router;
