import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ChangeSectionPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [newSection, setNewSection] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const studentId = jwtDecode(token).id;

            await axios.put(`http://localhost:3001/api/students/${studentId}/courses/${courseId}/change-section`,
                { newSection },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Section updated successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Failed to update section", error);
            alert("Failed to update section.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Change Course Section</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>New Section:</label>
                <input
                    type="text"
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    style={styles.input}
                    required
                />
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
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "80%",
        maxWidth: "400px",
    },
    label: {
        fontSize: "1rem",
        fontWeight: "bold",
    },
    input: {
        padding: "8px",
        fontSize: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
    }
};

export default ChangeSectionPage;
