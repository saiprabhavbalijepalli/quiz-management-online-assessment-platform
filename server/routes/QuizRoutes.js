const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:quizType", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      quizType: req.params.quizType,
    });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { quizType, questions } = req.body;

    const quiz = await Quiz.findOneAndUpdate(
      { quizType },
      { quizType, questions },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:quizType", async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({
      quizType: req.params.quizType,
    });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.json({
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;