import { useEffect, useState } from "react";
import axios from "axios";

const StudentPage = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:3001/api/students", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setStudents(res.data))
            .catch((err) => console.error("Error loading students:", err));
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>All Students</h2>
            <ul style={styles.studentList}>
                {students.map(student => (
                    <li key={student._id} style={styles.studentItem}>
                        {student.firstName} {student.lastName} - {student.program}
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
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#222",
        marginBottom: "10px",
    },
    studentList: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
    },
    studentItem: {
        backgroundColor: "#fff",
        padding: "15px",
        margin: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "80%",
        maxWidth: "600px",
    }
};

export default StudentPage;
