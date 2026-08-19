import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminResults() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchEmail, setSearchEmail] = useState("");
  const [quizFilter, setQuizFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
        "https://quiz-management-backend-gje1.onrender.com/api/results"
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

  const filteredResults = results.filter((result) => {
    const student =
      result.studentName ||
      result.studentEmail ||
      "";

    const quiz = result.quizType
      ? result.quizType.toUpperCase()
      : "";

    const percentage = Number(result.percentage || 0);

    const status = (
      result.status ||
      (percentage >= 40 ? "PASSED" : "FAILED")
    ).toUpperCase();

    const matchesSearch = student
      .toLowerCase()
      .includes(searchEmail.toLowerCase());

    const matchesQuiz =
      quizFilter === "ALL" ||
      quiz === quizFilter;

    const matchesStatus =
      statusFilter === "ALL" ||
      status === statusFilter;

    return (
      matchesSearch &&
      matchesQuiz &&
      matchesStatus
    );
  });

  const clearFilters = () => {
    setSearchEmail("");
    setQuizFilter("ALL");
    setStatusFilter("ALL");
  };

  return (
    <div className="admin-results-page">

      {/* ================= HEADER ================= */}

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

      {/* ================= MAIN CONTENT ================= */}

      <div className="admin-results-content">

        {/* Results Heading */}

        <div className="results-heading">
          <div>
            <h2>Quiz Results</h2>

            <p>
              Total Attempts:{" "}
              <strong>{results.length}</strong>
              {" | "}
              Showing Results:{" "}
              <strong>{filteredResults.length}</strong>
            </p>
          </div>
        </div>

        {/* ================= FILTERS ================= */}

        {!loading && !error && results.length > 0 && (
          <div className="results-filters">

            {/* Search Student */}

            <input
              type="text"
              placeholder="Search by student email..."
              value={searchEmail}
              onChange={(e) =>
                setSearchEmail(e.target.value)
              }
            />

            {/* Quiz Filter */}

            <select
              value={quizFilter}
              onChange={(e) =>
                setQuizFilter(e.target.value)
              }
            >
              <option value="ALL">
                All Quizzes
              </option>

              <option value="HTML">
                HTML
              </option>

              <option value="CSS">
                CSS
              </option>

              <option value="JAVASCRIPT">
                JavaScript
              </option>
            </select>

            {/* Status Filter */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="ALL">
                All Status
              </option>

              <option value="PASSED">
                Passed
              </option>

              <option value="FAILED">
                Failed
              </option>
            </select>

            {/* Clear Filters */}

            <button
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>
        )}

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="no-results">
            <h3>Loading Results...</h3>

            <p>
              Please wait while results are loading.
            </p>
          </div>

        ) : error ? (

          /* ================= ERROR ================= */

          <div className="no-results">
            <h3>Unable to Load Results</h3>
            <p>{error}</p>
          </div>

        ) : results.length === 0 ? (

          /* ================= NO RESULTS ================= */

          <div className="no-results">
            <h3>No Results Available</h3>

            <p>
              Students have not completed any
              quizzes yet.
            </p>
          </div>

        ) : filteredResults.length === 0 ? (

          /* ================= NO FILTER MATCH ================= */

          <div className="no-results">
            <h3>No Matching Results</h3>

            <p>
              Try changing your search or filters.
            </p>
          </div>

        ) : (

          /* ================= RESULTS TABLE ================= */

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

                {filteredResults.map((result) => {
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

                      {/* Student */}

                      <td>
                        {result.studentName ||
                          result.studentEmail ||
                          "Unknown Student"}
                      </td>

                      {/* Quiz */}

                      <td>
                        <span className="quiz-name">
                          {result.quizType
                            ? result.quizType.toUpperCase()
                            : "N/A"}
                        </span>
                      </td>

                      {/* Score */}

                      <td>
                        <strong>
                          {result.obtainedMarks ?? 0}
                          {" / "}
                          {result.totalMarks ?? 0}
                        </strong>
                      </td>

                      {/* Percentage */}

                      <td>
                        <strong>
                          {percentage}%
                        </strong>
                      </td>

                      {/* Status */}

                      <td>
                        <span
                          className={
                            status.toUpperCase() ===
                            "PASSED"
                              ? "status-pass"
                              : "status-fail"
                          }
                        >
                          {status}
                        </span>
                      </td>

                      {/* Date */}

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