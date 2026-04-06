const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  questions: [
    {
      question: String,
      options: [String],
      correctOption: Number,
      marks: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);