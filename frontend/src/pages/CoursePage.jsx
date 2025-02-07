import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CoursePage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found, user is not authenticated.");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                console.error("Token expired, please log in again.");
                localStorage.removeItem("token");
                return;
            }

            axios.get("http://localhost:3001/api/courses", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => setCourses(res.data))
                .catch((err) => console.error("Failed to fetch courses", err));

        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem("token");
        }
    }, []);

    const enrollInCourse = async (courseId) => {
        try {
            const token = localStorage.getItem("token");
            const studentId = jwtDecode(token).id;

            await axios.post(`http://localhost:3001/api/courses/${courseId}/enroll`, { studentId }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Enrolled successfully!");
        } catch (error) {
            alert("Enrollment failed!");
            console.error("Enrollment error:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>All Courses Available</h2>
            <ul style={styles.courseList}>
                {courses.map((course) => (
                    <li key={course._id} style={styles.courseItem}>
                        {course.courseName} ({course.courseCode}) - {course.semester}
                        <button onClick={() => enrollInCourse(course._id)} style={styles.button}>Enroll</button>
                    </li>
                ))}
            </ul>
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
        padding: "70px 60px",
        width: "100vw",
    },
    headerContainer: {
        marginTop: "40px",
        maxWidth: "1200px",
        alignSelf: "flex-start",
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#222",
        textAlign: "left",
        marginBottom: "20px",
    },
    courseList: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
    },
    courseItem: {
        backgroundColor: "#fff",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "80%",
        maxWidth: "900px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        textDecoration: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "6px",
        fontSize: "1rem",
        transition: "0.3s",
        border: "none",
        cursor: "pointer",
    }
};

export default CoursePage;
