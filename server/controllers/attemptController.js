const Attempt = require("../models/Attempt");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

// START QUIZ
exports.startAttempt = async (req, res) => {
  try {
    const { userId, quizId } = req.body;

    let attempt = await Attempt.findOne({ userId, quizId });

    if (!attempt) {
      attempt = await Attempt.create({ userId, quizId });
    }

    res.json(attempt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SAVE ANSWER
exports.saveResponse = async (req, res) => {
  try {
    const { attemptId, questionId, selectedOption } = req.body;

    const attempt = await Attempt.findById(attemptId);

    const existing = attempt.responses.find(
      r => r.questionId.toString() === questionId
    );

    if (existing) {
      existing.selectedOption = selectedOption;
    } else {
      attempt.responses.push({ questionId, selectedOption });
    }

    await attempt.save();

    res.json({ msg: "Saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SUBMIT QUIZ
exports.submitAttempt = async (req, res) => {
  try {
    const { attemptId } = req.body;

    const attempt = await Attempt.findById(attemptId);
    const quiz = await Quiz.findById(attempt.quizId); // removed .populate()

    let score = 0;

    quiz.questions.forEach(q => {
      const response = attempt.responses.find(
        r => r.questionId.toString() === q._id.toString()
      );

      if (response && response.selectedOption === q.correctOption) {
        score += q.marks;
      }
    });

    attempt.score = score;
    attempt.status = "completed";
    await attempt.save();

    res.json({ score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET REPORT
exports.getReport = async (req, res) => {
  try {
    const { attemptId } = req.params;

    const attempt = await Attempt.findById(attemptId);
    const quiz = await Quiz.findById(attempt.quizId); // removed .populate()

    const report = quiz.questions.map(q => {
      const response = attempt.responses.find(
        r => r.questionId.toString() === q._id.toString()
      );

      return {
        question: q.question,
        options: q.options,
        correctOption: q.correctOption,
        selectedOption: response ? response.selectedOption : null,
        marks: q.marks
      };
    });

    res.json({ score: attempt.score, report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};