import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const studentEmail =
    localStorage.getItem("studentEmail") || "Unknown Student";

  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const quizResponse = await fetch(
          "https://quiz-management-backend-gje1.onrender.com/api/quizzes"
        );

        if (!quizResponse.ok) {
          throw new Error("Unable to load quizzes");
        }

        const quizData = await quizResponse.json();

        setQuizzes(quizData);

        const resultResponse = await fetch(
          "https://quiz-management-backend-gje1.onrender.com/api/results"
        );

        if (!resultResponse.ok) {
          throw new Error("Unable to load results");
        }

        const resultData = await resultResponse.json();

        const studentResults = resultData.filter(
          (result) =>
            result.studentName === studentEmail ||
            result.studentEmail === studentEmail
        );

        studentResults.sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        setResults(studentResults);
      } catch (error) {
        console.error(
          "Dashboard loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [studentEmail]);

  const getQuiz = (type) => {
    return quizzes.find(
      (quiz) =>
        quiz.quizType?.toLowerCase() ===
        type.toLowerCase()
    );
  };

  const quizCards = [
    {
      type: "html",
      title: "HTML Quiz",
      description: "Test your HTML knowledge.",
    },
    {
      type: "css",
      title: "CSS Quiz",
      description: "Test your CSS knowledge.",
    },
    {
      type: "javascript",
      title: "JavaScript Quiz",
      description: "Test your JavaScript knowledge.",
    },
  ];

  const logout = () => {
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("studentToken");

    navigate("/student-login", {
      replace: true,
    });
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1>Student Dashboard</h1>

          <p>
            Welcome to your Quiz & Assessment Platform
          </p>

          <p>
            Logged in as:{" "}
            <strong>{studentEmail}</strong>
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      {/* Dashboard Content */}
      <section className="dashboard-content">

        <h2>Available Quizzes</h2>

        {/* Quiz Cards */}
        <div className="quiz-grid">

          {quizCards.map((card) => {
            const backendQuiz = getQuiz(card.type);

            const totalQuestions =
              backendQuiz?.questions?.length || 0;

            return (
              <div
                className="quiz-card"
                key={card.type}
              >
                <h3>{card.title}</h3>

                <p>{card.description}</p>

                <p>
                  <strong>
                    {totalQuestions} Questions
                  </strong>
                </p>

                <button
                  onClick={() =>
                    navigate(`/quiz/${card.type}`)
                  }
                  disabled={totalQuestions === 0}
                >
                  Start Quiz
                </button>
              </div>
            );
          })}

        </div>

        {/* Student Results */}
        <div className="student-results-area">

          <h2>My Quiz Results</h2>

          {results.length === 0 ? (
            <p>No quiz results available yet.</p>
          ) : (
            <div className="student-results-table-wrapper">

              <table className="results-table">

                <thead>
                  <tr>
                    <th>Quiz</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  {results.map((result) => (
                    <tr key={result._id}>

                      <td>
                        {result.quizType?.toUpperCase()}
                      </td>

                      <td>
                        {result.obtainedMarks} /{" "}
                        {result.totalMarks}
                      </td>

                      <td>
                        {result.percentage}%
                      </td>

                      <td>
                        {result.status}
                      </td>

                      <td>
                        {result.createdAt
                          ? new Date(
                              result.createdAt
                            ).toLocaleString()
                          : "-"}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </section>

    </div>
  );
}

export default StudentDashboard;