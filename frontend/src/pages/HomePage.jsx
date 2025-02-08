import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>📚 Student Course System</h1>
                <p style={styles.subtitle}>Effortlessly manage your courses and students.</p>
                <div style={styles.buttonContainer}>
                    <Link to="/login" style={styles.button}>Get Started</Link>
                    <Link to="/courses" style={styles.buttonOutline}>View Courses</Link>
                </div>
            </header>

            <section style={styles.features}>
                <div style={styles.card}>
                    <h3>🎓 Student Portal</h3>
                    <p>Enroll in courses, track your progress, and stay updated.</p>
                </div>
                <div style={styles.card}>
                    <h3>🛠 Admin Dashboard</h3>
                    <p>Manage students, assign courses, and streamline learning.</p>
                </div>
                <div style={styles.card}>
                    <h3>🚀 Seamless Experience</h3>
                    <p>Modern, responsive, and intuitive course management system.</p>
                </div>
            </section>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
    },
    header: {
        width: "100%",
        maxWidth: "1200px",
        textAlign: "center",
        padding: "50px 20px",
    },
    title: {
        fontSize: "3rem",
        fontWeight: "bold",
        color: "#222",
    },
    subtitle: {
        fontSize: "1.3rem",
        color: "#555",
        marginTop: "10px",
    },
    buttonContainer: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "15px",
    },
    button: {
        textDecoration: "none",
        backgroundColor: "#D1DB41",
        color: "#464647",
        padding: "12px 24px",
        borderRadius: "6px",
        fontSize: "1.1rem",
        transition: "0.3s",
        fontWeight: "bold",
        border: "2px solid transparent",
    },
    buttonOutline: {
        textDecoration: "none",
        backgroundColor: "transparent",
        color: "#464647",
        padding: "12px 24px",
        borderRadius: "6px",
        fontSize: "1.1rem",
        fontWeight: "bold",
        border: "1px solid #464647",
        transition: "0.3s",
    },
    features: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        width: "100%",
        padding: "40px 20px",
    },
    card: {
        backgroundColor: "#fff",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        flex: "1 1 300px",
        maxWidth: "400px",
        transition: "transform 0.3s",
    },
};

document.body.style.overflowX = "hidden";

export default HomePage;
