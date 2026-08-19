import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");

    navigate("/admin-login", { replace: true });
  };

  return (
    <div className="student-dashboard">

      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage quizzes, questions and assessments</p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* ================= DASHBOARD CONTENT ================= */}
      <div className="dashboard-content">

        <h2>Quiz Management</h2>

        {/* ================= QUIZ CARDS ================= */}
        <div className="quiz-container">

          {/* HTML Quiz */}
          <div className="quiz-card">
            <h3>Manage HTML Quiz</h3>

            <p>
              Add, edit or delete HTML questions.
            </p>

            <button
              onClick={() =>
                navigate("/admin/manage/html")
              }
            >
              Manage Quiz
            </button>
          </div>

          {/* CSS Quiz */}
          <div className="quiz-card">
            <h3>Manage CSS Quiz</h3>

            <p>
              Add, edit or delete CSS questions.
            </p>

            <button
              onClick={() =>
                navigate("/admin/manage/css")
              }
            >
              Manage Quiz
            </button>
          </div>

          {/* JavaScript Quiz */}
          <div className="quiz-card">
            <h3>Manage JavaScript Quiz</h3>

            <p>
              Add, edit or delete JavaScript questions.
            </p>

            <button
              onClick={() =>
                navigate("/admin/manage/javascript")
              }
            >
              Manage Quiz
            </button>
          </div>

        </div>

        {/* ================= STUDENT RESULTS ================= */}
      <div className="student-results-wrapper">
        <div className="quiz-card">
          <h3>Student Results</h3>

          <p>
           View quiz scores and performance of students.
          </p>

          <button
            onClick={() => navigate("/admin-results")}
          >
            View Student Results
          </button>
       </div>
    </div>

      </div>

    </div>
  );
}

export default AdminDashboard;