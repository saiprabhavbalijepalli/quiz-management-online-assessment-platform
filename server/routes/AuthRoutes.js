const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/student/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const studentEmail = "student@gmail.com";
    const studentPassword = "student123";

    if (email !== studentEmail) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = password === studentPassword;

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        email: studentEmail,
        role: "student",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.json({
      message: "Student login successful",
      token,
      email: studentEmail,
      role: "student",
    });
  } catch (error) {
    console.error("Student login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;