import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

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

            <div style={styles.dashboardGrid}>
                {/* Left Section - Students */}
                <div style={styles.section}>
                    <Link to="/add-student" style={styles.button}>Add Student ➕ </Link>
                    <h3 style={styles.subtitle}>All Students </h3>
                    <ul style={styles.list}>
                        {students.map(student => (
                            <li key={student._id} style={styles.listItem}>
                                {student.firstName} {student.lastName} - {student.program}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Section - Courses */}
                <div style={styles.section}>
                    <Link to="/add-course" style={styles.button}>Add Course ➕ </Link>
                    <h3 style={styles.subtitle}>All Courses</h3>
                    <ul style={styles.list}>
                        {courses.map(course => (
                            <li key={course._id} style={styles.listItem}>
                                {course.courseCode} {course.courseName} (Section {course.section})
                                <Link to={`/course/${course._id}/students`} style={styles.viewButton}>
                                    View Students
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        width: "100vw",
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#222",
        textAlign: "center",
        marginTop: "100px",
        marginBottom: "20px",
    },
    dashboardGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        padding: "20px 0",
    },
    section: {
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "670px",
    },
    button: {
        textDecoration: "none",
        backgroundColor: "#D1DB41",
        color: "#464647",
        width: "97%",
        padding: "12px 12px",
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
        textAlign: "center",
    },
    list: {
        listStyleType: "none",
        padding: 0,
        margin: 6,
        width: "100%",
    },
    listItem: {
        padding: "15px",
        margin: "15px 0",
        borderRadius: "8px",
        border: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "635px",
        width: "100%",
    },
    viewButton: {
        backgroundColor: "#D1DB41",
        color: "#464647",
        padding: "8px 12px",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize: "1rem",
        transition: "0.3s",
        border: "none",
        cursor: "pointer",
    },
};

export default AdminDashboard;
