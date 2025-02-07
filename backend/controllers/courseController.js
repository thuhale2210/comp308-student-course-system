const Course = require('../models/courseModel');
const Student = require('../models/studentModel');

// Add Course
const addCourse = async (req, res) => {
    const { courseCode, courseName, section, semester } = req.body;

    const course = new Course({ courseCode, courseName, section, semester });
    await course.save();

    res.status(201).json({ message: 'Course added successfully', course });
};

// Get All Courses
const getCourses = async (req, res) => {
    const courses = await Course.find().populate('students', 'firstName lastName email');
    res.json(courses);
};

// Get Specific Course by ID
const getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id).populate('students', 'firstName lastName email');

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
};

// Update Course
const updateCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    course.courseName = req.body.courseName || course.courseName;
    course.section = req.body.section || course.section;
    course.semester = req.body.semester || course.semester;

    await course.save();
    res.json({ message: 'Course updated successfully', course });
};

// Delete Course
const deleteCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    await course.remove();
    res.json({ message: 'Course deleted successfully' });
};

// Enroll Student in Course
// const enrollStudent = async (req, res) => {
//     const course = await Course.findById(req.params.id);
//     const student = await Student.findById(req.body.studentId);

//     if (!course || !student) {
//         return res.status(404).json({ message: 'Course or Student not found' });
//     }

//     if (!course.students.includes(student._id)) {
//         course.students.push(student._id);
//         await course.save();
//     }

//     res.json({ message: 'Student enrolled successfully', course });
// };

const enrollStudent = async (req, res) => {
    try {
        const { id } = req.params; // Course ID from URL
        const { studentId } = req.body; // Student ID from request body

        const course = await Course.findById(id);
        const student = await Student.findById(studentId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Check if student is already enrolled
        if (course.students.includes(studentId)) {
            return res.status(400).json({ message: "Student already enrolled" });
        }

        // Add student to the course
        course.students.push(studentId);
        await course.save();

        res.status(200).json({ message: "Student enrolled successfully", course });
    } catch (error) {
        console.error("Error enrolling student:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Students in a Course
const getStudentsInCourse = async (req, res) => {
    const course = await Course.findById(req.params.id).populate('students', 'firstName lastName email');

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course.students);
};

// ✅ Ensure all functions are properly exported
module.exports = { addCourse, getCourses, getCourseById, updateCourse, deleteCourse, enrollStudent, getStudentsInCourse };
