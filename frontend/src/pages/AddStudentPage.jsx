import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudentPage = () => {
    const [studentData, setStudentData] = useState({
        studentNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        phoneNumber: "",
        program: "",
        favoriteTopic: "N/A",
        strongestSkill: "N/A"
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found.");
                return;
            }

            const response = await axios.post("http://localhost:3001/api/students/register", studentData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            console.log("Student added successfully:", response.data);
            alert("Student added successfully!");
            
            navigate("/admin");
        } catch (error) {
            console.error("Error adding student:", error.response?.data || error.message);
            alert("Error adding student. Check console for details.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Add Student</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>Student Number:</label>
                <input type="text" name="studentNumber" placeholder="Student Number" style={styles.input} onChange={handleInputChange} required />
                <label style={styles.label}>Password:</label>
                <input type="password" name="password" placeholder="Password: Student@123" style={styles.input} onChange={handleInputChange} required />
                <label style={styles.label}>First Name:</label>
                <input type="text" name="firstName" placeholder="First Name" style={styles.input} onChange={handleInputChange} required />
                <label style={styles.label}>Last Name:</label>
                <input type="text" name="lastName" placeholder="Last Name" style={styles.input} onChange={handleInputChange} required />
                <label style={styles.label}>Email:</label>
                <input type="email" name="email" placeholder="Email" style={styles.input} onChange={handleInputChange} required />
                <label style={styles.label}>Address:</label>
                <input type="text" name="address" placeholder="Address" style={styles.input} onChange={handleInputChange} required />
                <label style={styles.label}>City:</label>
                <input type="text" name="city" placeholder="City" style={styles.input} onChange={handleInputChange} required />
                <label style={styles.label}>Phone Number:</label>
                <input type="text" name="phoneNumber" placeholder="Phone Number" style={styles.input} onChange={handleInputChange} required />
                <label style={styles.label}>Program:</label>
                <input type="text" name="program" placeholder="Program" style={styles.input} onChange={handleInputChange} required />
                <label style={styles.label}>Favorite Topic (Optional):</label>
                <input type="text" name="favoriteTopic" placeholder="Favorite Topic" style={styles.input} onChange={handleInputChange} />
                <label style={styles.label}>Strongest Skills (Optional):</label>
                <input type="text" name="strongestSkill" placeholder="Strongest Skill" style={styles.input} onChange={handleInputChange} />
                <button type="submit" style={styles.button}>Submit</button>
            </form>
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
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        width: "100vw",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "80%",
        maxWidth: "600px",
    },
    label: {
        textAlign: "left",
        fontSize: "1rem",
        fontWeight: "bold",
        marginLeft: "-20px",
        width: "100%"
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "10px",
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
    }
};

export default AddStudentPage;
