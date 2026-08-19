import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminResults() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/results"
        );

        if (!response.ok) {
          throw new Error("Unable to load quiz results");
        }

        const data = await response.json();

        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching results:", error);
        setError(error.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="admin-results-page">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Student Quiz Results</h1>
          <p>View student quiz performance</p>
        </div>

        <button
          className="back-dashboard-btn"
          onClick={() => navigate("/admin-dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-results-content">

        <div className="results-heading">
          <div>
            <h2>Quiz Results</h2>

            <p>
              Total Attempts: <strong>{results.length}</strong>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="no-results">
            <h3>Loading Results...</h3>
            <p>Please wait while results are loading.</p>
          </div>
        ) : error ? (
          <div className="no-results">
            <h3>Unable to Load Results</h3>
            <p>{error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="no-results">
            <h3>No Results Available</h3>
            <p>Students have not completed any quizzes yet.</p>
          </div>
        ) : (
          <div className="admin-results-table-container">

            <table className="admin-results-table">

              <thead>
                <tr>
                  <th>Student Email</th>
                  <th>Quiz</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result) => {
                  const percentage = Number(
                    result.percentage || 0
                  );

                  const status =
                    result.status ||
                    (percentage >= 40
                      ? "PASSED"
                      : "FAILED");

                  return (
                    <tr key={result._id}>

                      <td>
                        {result.studentName ||
                          result.studentEmail ||
                          "Unknown Student"}
                      </td>

                      <td>
                        <span className="quiz-name">
                          {result.quizType
                            ? result.quizType.toUpperCase()
                            : "N/A"}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {result.obtainedMarks ?? 0} /{" "}
                          {result.totalMarks ?? 0}
                        </strong>
                      </td>

                      <td>
                        <strong>
                          {percentage}%
                        </strong>
                      </td>

                      <td>
                        <span
                          className={
                            status.toUpperCase() === "PASSED"
                              ? "status-pass"
                              : "status-fail"
                          }
                        >
                          {status}
                        </span>
                      </td>

                      <td>
                        {result.createdAt
                          ? new Date(
                              result.createdAt
                            ).toLocaleString()
                          : "N/A"}
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminResults;