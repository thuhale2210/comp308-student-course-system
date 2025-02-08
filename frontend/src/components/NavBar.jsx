import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav style={styles.navbar}>
            <img src="src/assets/Centennial.jpeg" alt="logo" style={styles.logo}/>
            <h2 style={styles.appname}>Student Course System</h2>
            <ul style={styles.navLinks}>
                <li><Link to="/" style={styles.link}>Home</Link></li>
                {token ? (
                    <>
                        <li><Link to="/dashboard" style={styles.link}> Student Dashboard</Link></li>
                        <li><Link to="/courses" style={styles.link}>Course Enrolment</Link></li>
                        <li><Link to="/admin" style={styles.link}>Admin</Link></li>
                        <li>
                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/login" style={styles.signInButton}>
                            Sign In
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#333",
        padding: "15px 30px",
        color: "white",
        width: "100%",
        minHeight: "60px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        boxSizing: "border-box",
    },
    logo: {
        width: "200px",
        height: "60px",
        objectFit: "cover",
    },
    appname: {
        margin: 0,
        fontSize: "1.5rem",
        fontWeight: "bold",
        whiteSpace: "nowrap",
    },
    navLinks: {
        listStyle: "none",
        display: "flex",
        gap: "20px",
        alignItems: "center",
        margin: 0,
        padding: 0,
        flexWrap: "nowrap",
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
        padding: "8px 12px",
        transition: "0.3s",
    },
    logoutButton: {
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        padding: "10px 15px",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s",
        whiteSpace: "nowrap",
    },
    signInButton: {
        backgroundColor: "#D1DB41",
        color: "white",
        textDecoration: "none",
        padding: "10px 15px",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s",
        whiteSpace: "nowrap",
    }
};

document.body.style.overflowX = "hidden";

export default NavBar;
