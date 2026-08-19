const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const quizRoutes = require("./routes/QuizRoutes");
const resultRoutes = require("./routes/ResultRoutes");
const authRoutes = require("./routes/AuthRoutes");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/quizzes",quizRoutes);
app.use("/api/results",resultRoutes);
app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Quiz Management Platform Backend is running!"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});