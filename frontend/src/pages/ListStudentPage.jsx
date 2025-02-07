import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ListStudentPage = () => {
    const [students, setStudents] = useState([]);
    const { courseId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:3001/api/courses/${courseId}/students`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setStudents(res.data))
            .catch(err => console.error("Error loading students for course:", err));
    }, [courseId]);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Students Enrolled in Course</h2>
            <ul style={styles.list}>
                {students.length > 0 ? (
                    students.map(student => (
                        <li key={student._id} style={styles.listItem}>{student.firstName} {student.lastName}</li>
                    ))
                ) : (
                    <p>No students enrolled yet.</p>
                )}
            </ul>
            <Link to="/admin" style={styles.button}>Back to Dashboard</Link>
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

export default ListStudentPage;
