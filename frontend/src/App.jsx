import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import CourseEnrolmentPage from "./pages/CourseEnrolmentPage";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AddCoursePage from "./pages/AddCoursePage";
import AddStudentPage from "./pages/AddStudentPage";
import ListStudentPage from "./pages/ListStudentPage";
import ChangeSectionPage from "./pages/ChangeSectionPage";

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<StudentDashboard />} />
                    <Route path="/courses" element={<CourseEnrolmentPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/add-course" element={<AddCoursePage />} />
                    <Route path="/add-student" element={<AddStudentPage />} />
                    <Route path="/course/:courseId/students" element={<ListStudentPage />} />
                    <Route path="/course/:courseId/change-section" element={<ChangeSectionPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
