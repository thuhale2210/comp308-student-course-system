import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const StudentDashboard = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const decodedUser = jwtDecode(token);
        setUser(decodedUser);

        axios.get(`http://localhost:3001/api/students/${decodedUser.id}/courses`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                setCourses(res.data);
            })
            .catch((err) => console.error("Failed to load courses", err));
    }, [navigate]);

    const dropCourse = async (courseId) => {
        const confirmDrop = window.confirm("Are you sure you want to drop this course?");
        if (!confirmDrop) return;

        try {
            const token = localStorage.getItem("token");
            const studentId = jwtDecode(token).id;

            await axios.delete(`http://localhost:3001/api/students/${studentId}/courses/${courseId}/drop`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Course dropped successfully!");
            setCourses(courses.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error("Failed to drop course", error);
            alert("Failed to drop course.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <h2 style={styles.title}>Student Dashboard</h2>
                <h3 style={styles.subtitle}>Your Courses</h3>
            </div>

            <ul style={styles.courseList}>
                {courses.map((course) => (
                    <li key={course._id} style={styles.courseItem}>
                        <div style={styles.actions}>
                            <Link to={`/course/${course._id}/change-section`} style={styles.button}>
                                Change Section
                            </Link>
                            <button
                                onClick={() => dropCourse(course._id)}
                                style={styles.buttonDanger}
                            >
                                Drop
                            </button>
                        </div>
                        {course.courseName} - {course.semester} (Section: {course.section})
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
        padding: "30px 60px",
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
        marginTop: "60px",
        marginBottom: "10px",
    },
    subtitle: {
        fontSize: "1.5rem",
        color: "#555",
        textAlign: "left",
        marginBottom: "15px",
    },
    courseList: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
        width: "80%",
        maxWidth: "900px",
    },
    courseItem: {
        backgroundColor: "#fff",
        padding: "15px",
        margin: "10px auto",
        borderRadius: "8px",
        border: "1px solid #ddd",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
    },
    actions: {
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        alignItems: "center",
    },
    button: {
        textDecoration: "none",
        backgroundColor: "#D1DB41",
        color: "#464647",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "1rem",
        transition: "0.3s",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
    },
    buttonDanger: {
        textDecoration: "none",
        color: "#464647",
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #dc3545",
        fontSize: "1rem",
        transition: "0.3s",
        cursor: "pointer",
        fontWeight: "bold",
    }
};

export default StudentDashboard;
