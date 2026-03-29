const express = require("express");
const router = express.Router();
const {
  startAttempt,
  saveResponse,
  submitAttempt
} = require("../controllers/attemptController");

const { getReport } = require("../controllers/attemptController");

router.post("/start", startAttempt);
router.post("/save", saveResponse);
router.post("/submit", submitAttempt);
router.get("/report/:attemptId", getReport);

module.exports = router;