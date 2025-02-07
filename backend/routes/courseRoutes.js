const express = require('express');
const {
    addCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    enrollStudent,
    getStudentsInCourse
} = require('../controllers/courseController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/', protect, addCourse);
router.get('/', protect, getCourses);
router.get('/:id', protect, getCourseById);
router.put('/:id', protect, updateCourse);
router.delete('/:id', protect, deleteCourse);
router.post('/:id/enroll', protect, enrollStudent);
router.get('/:id/students', protect, getStudentsInCourse);

module.exports = router;
