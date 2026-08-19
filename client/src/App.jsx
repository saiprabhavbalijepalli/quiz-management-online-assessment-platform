import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import StudentLogin from "./StudentLogin";
import StudentDashboard from "./StudentDashboard";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminResults from "./AdminResults";
import QuizPage from "./QuizPage";
import ManageQuiz from "./ManageQuiz";
import ProtectedRoute from "./ProtectedRoute";

import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="home">
        <div className="home-card">
          <h1>
            Quiz Management & Online
            <br />
            Assessment Platform
          </h1>

          <p>
            Test your knowledge, improve your skills, and
            track your performance.
          </p>

          <div className="login-buttons">
            <button
              className="student-btn"
              onClick={() => navigate("/student-login")}
            >
              Student Login
            </button>

            <button
              className="admin-btn"
              onClick={() => navigate("/admin-login")}
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Student Login */}
        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        {/* Admin Login */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute type="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student Quiz */}
        <Route
          path="/quiz/:quizType"
          element={
            <ProtectedRoute type="student">
              <QuizPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute type="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Manage Quiz */}
        <Route
          path="/admin/manage/:quizType"
          element={
            <ProtectedRoute type="admin">
              <ManageQuiz />
            </ProtectedRoute>
          }
        />

        {/* Admin Results */}
        <Route
          path="/admin-results"
          element={
            <ProtectedRoute type="admin">
              <AdminResults />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;