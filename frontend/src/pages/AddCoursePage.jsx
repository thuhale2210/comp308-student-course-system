import { useState } from "react";
import axios from "axios";

const AddCoursePage = () => {
    const [courseData, setCourseData] = useState({
        courseCode: "",
        courseName: "",
        section: "",
        semester: ""
    });

    const handleInputChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload

        try {
            console.log("Submitting course data:", courseData); // Debugging log

            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found.");
                return;
            }

            const response = await axios.post("http://localhost:3001/api/courses", courseData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            console.log("Course added successfully:", response.data);
            alert("Course added successfully!");
        } catch (error) {
            console.error("Error adding course:", error.response?.data || error.message);
            alert("Error adding course. Check console for details.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Add Course</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <input type="text" name="courseCode" placeholder="Course Code" style={styles.input} onChange={handleInputChange} required />
                <input type="text" name="courseName" placeholder="Course Name" style={styles.input} onChange={handleInputChange} required />
                <input type="text" name="section" placeholder="Section" style={styles.input} onChange={handleInputChange} required />
                <input type="text" name="semester" placeholder="Semester" style={styles.input} onChange={handleInputChange} required />
                <button type="submit" style={styles.button}>Submit</button>
            </form>
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
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "80%",
        maxWidth: "400px",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
    }
};

export default AddCoursePage;
