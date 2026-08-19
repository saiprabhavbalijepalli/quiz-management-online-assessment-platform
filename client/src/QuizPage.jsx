import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function QuizPage() {
  const { quizType } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600);

  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoadingQuestions(true);

        const response = await fetch(
          "http://localhost:5000/api/quizzes"
        );

        if (!response.ok) {
          throw new Error("Unable to load quiz questions");
        }

        const data = await response.json();

        const selectedQuiz = data.find(
          (quiz) =>
            quiz.quizType?.toLowerCase() ===
            quizType?.toLowerCase()
        );

        if (!selectedQuiz) {
          setQuestions([]);
          setSelectedAnswers([]);
          return;
        }

        setQuestions(selectedQuiz.questions || []);

        setSelectedAnswers(
          Array(selectedQuiz.questions?.length || 0).fill("")
        );
      } catch (error) {
        console.error("Error loading quiz:", error);

        setQuestions([]);
        setSelectedAnswers([]);
      } finally {
        setLoadingQuestions(false);
      }
    };

    fetchQuiz();
  }, [quizType]);

  const formatTime = (seconds) => {
    const safeSeconds = Math.max(seconds, 0);

    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const submitQuiz = async () => {
    if (submitting || finished) {
      return;
    }

    try {
      setSubmitting(true);

      const studentName =
        localStorage.getItem("studentEmail") ||
        "Unknown Student";

      const timeTaken = 600 - timeLeft;

      const response = await fetch(
        "http://localhost:5000/api/results/submit",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            studentName,
            quizType,
            answers: selectedAnswers,
            timeTaken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit quiz"
        );
      }

      setResult(data.result || data);
      setFinished(true);
    } catch (error) {
      console.error("Quiz submission error:", error);

      alert(
        `Quiz submission failed: ${error.message}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (
      loadingQuestions ||
      questions.length === 0 ||
      finished ||
      submitting
    ) {
      return;
    }

    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((previousTime) =>
        Math.max(previousTime - 1, 0)
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    timeLeft,
    loadingQuestions,
    questions.length,
    finished,
    submitting,
  ]);

  const handleAnswerChange = (answer) => {
    setSelectedAnswers((previousAnswers) => {
      const updatedAnswers = [...previousAnswers];

      updatedAnswers[currentQuestion] = answer;

      return updatedAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    } else {
      submitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    } else {
      submitQuiz();
    }
  };

  const retryQuiz = () => {
    setCurrentQuestion(0);

    setSelectedAnswers(
      Array(questions.length).fill("")
    );

    setTimeLeft(600);
    setFinished(false);
    setResult(null);
    setSubmitting(false);
  };

  if (loadingQuestions) {
    return (
      <div className="quiz-page">
        <div className="quiz-box">
          <h2>Loading Quiz...</h2>

          <p>Please wait while questions are loading.</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="quiz-box">
          <h2>{quizType?.toUpperCase()} Quiz</h2>

          <h3>No Questions Available</h3>

          <p>
            Questions could not be loaded from the backend.
          </p>

          <button
            className="next-btn"
            onClick={() =>
              navigate("/student-dashboard")
            }
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (finished && result) {
    return (
      <div className="quiz-page">
        <div className="result-card">
          <h1>Quiz Completed!</h1>

          <h2>
            {quizType?.toUpperCase()} Quiz Result
          </h2>

          <p>
            <strong>Total Questions:</strong>{" "}
            {result.totalQuestions}
          </p>

          <p>
            <strong>Correct Answers:</strong>{" "}
            {result.correctAnswers}
          </p>

          <p>
            <strong>Incorrect Answers:</strong>{" "}
            {result.incorrectAnswers}
          </p>

          <p>
            <strong>Unanswered Questions:</strong>{" "}
            {result.unanswered}
          </p>

          <p>
            <strong>Total Marks:</strong>{" "}
            {result.totalMarks}
          </p>

          <p>
            <strong>Obtained Marks:</strong>{" "}
            {result.obtainedMarks}
          </p>

          <p>
            <strong>Percentage:</strong>{" "}
            {result.percentage}%
          </p>

          <p>
            <strong>Status:</strong>{" "}

            <span
              style={{
                fontWeight: "bold",
                color:
                  result.status === "PASSED"
                    ? "green"
                    : "red",
              }}
            >
              {result.status}
            </span>
          </p>

          <p>
            <strong>Time Taken:</strong>{" "}
            {formatTime(result.timeTaken)}
          </p>

          <div className="answer-review">
            <h2>Answer Review</h2>

            {questions.map((question, index) => {
              const studentAnswer =
                selectedAnswers[index];

              const unanswered =
                !studentAnswer;

              const correct =
                studentAnswer ===
                question.correctAnswer;

              return (
                <div
                  className="review-card"
                  key={question._id || index}
                >
                  <h3>
                    {index + 1}. {question.question}
                  </h3>

                  <p>
                    <strong>Your Answer:</strong>{" "}
                    {unanswered
                      ? "Unanswered"
                      : studentAnswer}
                  </p>

                  <p>
                    <strong>Correct Answer:</strong>{" "}
                    {question.correctAnswer}
                  </p>

                  <p>
                    <strong>Result:</strong>{" "}
                    {unanswered
                      ? "Unanswered ⚪"
                      : correct
                      ? "Correct ✅"
                      : "Incorrect ❌"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="result-buttons">
            <button
              onClick={() =>
                navigate("/student-dashboard")
              }
            >
              Back to Dashboard
            </button>

            <button onClick={retryQuiz}>
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-box">
        <div className="quiz-top">
          <h2>
            {quizType?.toUpperCase()} Quiz
          </h2>

          <div>
            <p>
              Question {currentQuestion + 1} of{" "}
              {questions.length}
            </p>

            <p
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                color:
                  timeLeft <= 60
                    ? "red"
                    : "black",
              }}
            >
              Time Left: {formatTime(timeLeft)}
            </p>
          </div>
        </div>

        <h3 className="question-text">
          {question.question}
        </h3>

        <div className="options">
          {question.options.map(
            (option, index) => (
              <label
                key={index}
                className={`option ${
                  selectedAnswers[
                    currentQuestion
                  ] === option
                    ? "selected-option"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={
                    selectedAnswers[
                      currentQuestion
                    ] === option
                  }
                  onChange={(event) =>
                    handleAnswerChange(
                      event.target.value
                    )
                  }
                />

                <span>{option}</span>
              </label>
            )
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          {currentQuestion > 0 && (
            <button
              className="next-btn"
              onClick={handlePrevious}
              disabled={submitting}
            >
              Previous
            </button>
          )}

          <button
            className="next-btn"
            onClick={handleSkip}
            disabled={submitting}
          >
            {currentQuestion ===
            questions.length - 1
              ? "Submit Without Answer"
              : "Skip"}
          </button>

          <button
            className="next-btn"
            onClick={handleNext}
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : currentQuestion ===
                questions.length - 1
              ? "Submit Quiz"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;