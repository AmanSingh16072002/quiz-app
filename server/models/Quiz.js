const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);