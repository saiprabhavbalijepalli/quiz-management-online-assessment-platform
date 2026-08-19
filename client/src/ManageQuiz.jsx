import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ManageQuiz() {
  const { quizType } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/quizzes/${quizType}`
        );

        if (response.status === 404) {
          setQuestions([]);
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load quiz");
        }

        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Error loading quiz:", error);
        setQuestions([]);
      }
    };

    loadQuestions();
  }, [quizType]);

  const saveQuiz = async (updatedQuestions) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/quizzes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizType: quizType,
            questions: updatedQuestions,
          }),
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        console.error("Backend response:", data);

        alert(
          "Backend error: " +
            (data.message || `Request failed with status ${response.status}`)
        );

        return false;
      }

      setQuestions(data.questions || updatedQuestions);

      return true;
    } catch (error) {
      console.error("Network/save error:", error);

      alert("Network error: " + error.message);

      return false;
    }
  };

  const clearForm = () => {
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer("");
    setEditIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !question.trim() ||
      !option1.trim() ||
      !option2.trim() ||
      !option3.trim() ||
      !option4.trim() ||
      !correctAnswer.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    const options = [
      option1.trim(),
      option2.trim(),
      option3.trim(),
      option4.trim(),
    ];

    if (!options.includes(correctAnswer.trim())) {
      alert("Correct answer must exactly match one of the four options.");
      return;
    }

    const newQuestion = {
      question: question.trim(),
      options: options,
      correctAnswer: correctAnswer.trim(),
    };

    let updatedQuestions;

    if (editIndex !== null) {
      updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
    } else {
      updatedQuestions = [...questions, newQuestion];
    }

    const success = await saveQuiz(updatedQuestions);

    if (success) {
      clearForm();
    }
  };

  const deleteQuestion = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedQuestions = questions.filter(
      (_, questionIndex) => questionIndex !== index
    );

    const success = await saveQuiz(updatedQuestions);

    if (success) {
      if (editIndex === index) {
        clearForm();
      } else if (editIndex !== null && index < editIndex) {
        setEditIndex(editIndex - 1);
      }
    }
  };

  const editQuestion = (index) => {
    const selectedQuestion = questions[index];

    setQuestion(selectedQuestion.question || "");

    setOption1(selectedQuestion.options?.[0] || "");
    setOption2(selectedQuestion.options?.[1] || "");
    setOption3(selectedQuestion.options?.[2] || "");
    setOption4(selectedQuestion.options?.[3] || "");

    setCorrectAnswer(selectedQuestion.correctAnswer || "");

    setEditIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="manage-page">
      <div className="manage-header">
        <div>
          <h1>Manage {quizType?.toUpperCase()} Quiz</h1>
          <p>Add, edit and delete quiz questions</p>
        </div>

        <button onClick={() => navigate("/admin-dashboard")}>
          Back to Dashboard
        </button>
      </div>

      <div className="manage-content">
        <div className="question-form">
          <h2>
            {editIndex !== null ? "Edit Question" : "Add New Question"}
          </h2>

          <form onSubmit={handleSubmit}>
            <label>Question</label>
            <input
              type="text"
              placeholder="Enter question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <label>Option 1</label>
            <input
              type="text"
              placeholder="Enter option 1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />

            <label>Option 2</label>
            <input
              type="text"
              placeholder="Enter option 2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />

            <label>Option 3</label>
            <input
              type="text"
              placeholder="Enter option 3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
            />

            <label>Option 4</label>
            <input
              type="text"
              placeholder="Enter option 4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
            />

            <label>Correct Answer</label>
            <input
              type="text"
              placeholder="Enter correct answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />

            <button type="submit">
              {editIndex !== null ? "Update Question" : "Add Question"}
            </button>

            {editIndex !== null && (
              <button type="button" onClick={clearForm}>
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="questions-list">
          <h2>Questions ({questions.length})</h2>

          {questions.length === 0 ? (
            <p>No questions found.</p>
          ) : (
            questions.map((item, index) => (
              <div
                className="admin-question-card"
                key={item._id || index}
              >
                <h3>
                  {index + 1}. {item.question}
                </h3>

                <p>A. {item.options?.[0]}</p>
                <p>B. {item.options?.[1]}</p>
                <p>C. {item.options?.[2]}</p>
                <p>D. {item.options?.[3]}</p>

                <p>
                  <strong>Correct Answer:</strong>{" "}
                  {item.correctAnswer}
                </p>

                <button
                  type="button"
                  onClick={() => editQuestion(index)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteQuestion(index)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageQuiz;