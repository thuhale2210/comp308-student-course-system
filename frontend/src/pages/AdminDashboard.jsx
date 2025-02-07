/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [enrolledStudents, setEnrolledStudents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:3001/api/students", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setStudents(res.data))
            .catch((err) => console.error("Error loading students:", err));

        axios.get("http://localhost:3001/api/courses", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setCourses(res.data))
            .catch((err) => console.error("Error loading courses:", err));
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Dashboard</h2>

            <div style={styles.buttonContainer}>
                <Link to="/add-student" style={styles.button}>Add Student</Link>
                <Link to="/add-course" style={styles.button}>Add Course</Link>
            </div>

            <h3 style={styles.subtitle}>All Students</h3>
            <ul style={styles.list}>
                {students.map(student => (
                    <li key={student._id} style={styles.listItem}>{student.firstName} {student.lastName} - {student.program}</li>
                ))}
            </ul>

            <h3 style={styles.subtitle}>All Courses</h3>
            <ul style={styles.list}>
                {courses.map(course => (
                    <li key={course._id} style={styles.listItem}>
                        {course.courseName} ({course.courseCode})
                        <Link to={`/course/${course._id}/students`} style={styles.button}>View Students</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        width: "100vw",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "20px",
    },
    button: {
        textDecoration: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "6px",
        fontSize: "1.1rem",
        transition: "0.3s",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: "1.8rem",
        marginBottom: "10px",
        fontWeight: "bold",
    },
    list: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
        width: "80%",
        maxWidth: "600px",
    },
    listItem: {
        backgroundColor: "#fff",
        padding: "15px",
        margin: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }
};

export default AdminDashboard;
