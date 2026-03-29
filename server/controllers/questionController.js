const Question = require("../models/Question");

// CREATE QUESTION
exports.createQuestion = async (req, res) => {
  try {
    const { question, options, correctOption, marks } = req.body;

    const newQuestion = await Question.create({
      question,
      options,
      correctOption,
      marks
    });

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL QUESTIONS
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};