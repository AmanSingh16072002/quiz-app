const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  },
  selectedOption: Number
});

const attemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },
  responses: [responseSchema],
  score: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress"
  }
}, { timestamps: true });

module.exports = mongoose.model("Attempt", attemptSchema);