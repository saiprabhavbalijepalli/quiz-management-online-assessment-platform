const express = require("express");
const router = express.Router();

const Quiz = require("../models/Quiz");
const Result = require("../models/Result");

router.post("/submit", async (req, res) => {
  try {
    const { studentName, quizType, answers, timeTaken } = req.body;

    const quiz = await Quiz.findOne({ quizType });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    const totalQuestions = quiz.questions.length;

    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;

    quiz.questions.forEach((question, index) => {
      const studentAnswer = answers?.[index];

      if (
        studentAnswer === undefined ||
        studentAnswer === null ||
        studentAnswer === ""
      ) {
        unanswered++;
      } else if (studentAnswer === question.correctAnswer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    });

    const totalMarks = totalQuestions;
    const obtainedMarks = correctAnswers;

    const percentage =
      totalQuestions > 0
        ? Number(((obtainedMarks / totalMarks) * 100).toFixed(2))
        : 0;

    const status = percentage >= 40 ? "PASSED" : "FAILED";

    const result = new Result({
      studentName,
      quizType,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unanswered,
      totalMarks,
      obtainedMarks,
      percentage,
      status,
      timeTaken,
    });

    await result.save();

    res.status(201).json({
      message: "Quiz submitted successfully",
      result,
    });
  } catch (error) {
    console.error("Quiz submission error:", error);

    res.status(500).json({
      message: "Error submitting quiz",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching results",
      error: error.message,
    });
  }
});

module.exports = router;