const Quiz = require("../models/Quiz");

// CREATE QUIZ
exports.createQuiz = async (req, res) => {
  try {
    const { title, duration, totalMarks, questions } = req.body;

    const quiz = await Quiz.create({
      title,
      duration,
      totalMarks,
      questions
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL QUIZZES
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("questions");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};