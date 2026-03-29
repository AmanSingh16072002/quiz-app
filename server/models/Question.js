const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctOption: {
    type: Number, // index of correct option
    required: true
  },
  marks: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);