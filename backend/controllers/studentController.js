const Student = require('../models/studentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerStudent = async (req, res) => {
    try {
        console.log("Register request received:", req.body); // Debugging

        const { studentNumber, password, firstName, lastName, email, address, city, phoneNumber, program } = req.body;

        // ✅ Validate that all required fields exist
        if (!studentNumber || !password || !firstName || !lastName || !email || !address || !city || !phoneNumber || !program) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const studentExists = await Student.findOne({ email });

        if (studentExists) {
            return res.status(400).json({ message: "Student already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            studentNumber,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            address,
            city,
            phoneNumber,
            program
        });

        await student.save();
        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        console.error("Error in registerStudent:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const loginStudent = async (req, res) => {
    const { studentNumber, password } = req.body;
    const student = await Student.findOne({ studentNumber });

    if (student && (await bcrypt.compare(password, student.password))) {
        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

module.exports = { registerStudent, loginStudent, getStudents };
