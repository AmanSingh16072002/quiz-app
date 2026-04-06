import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  const nav = useNavigate();

  // Step 1 fields
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [numQuestions, setNumQuestions] = useState("");

  // Step 2 fields
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [marks, setMarks] = useState("");

  const goToStep2 = () => {
    if (!title || !duration || !totalMarks || !numQuestions) {
      return alert("Please fill all fields");
    }
    setStep(2);
  };

  const saveQuestion = () => {
    if (!questionText || options.some(o => o === "")) {
      return alert("Please fill question and all options");
    }

    const newQuestion = {
      question: questionText,
      options,
      correctOption,
      marks: Number(marks)
    };

    const updated = [...questions, newQuestion];
    setQuestions(updated);

    // reset fields
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectOption(0);
    setMarks("");

    if (updated.length < Number(numQuestions)) {
      setCurrent(prev => prev + 1);
    }
  };

  const submit = async () => {
    if (questions.length < Number(numQuestions)) {
      return alert(`Please add all ${numQuestions} questions`);
    }

    try {
      await API.post("/quizzes", {
        title,
        duration: Number(duration),
        totalMarks: Number(totalMarks),
        questions
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("Quiz created successfully!");
      nav("/cms-dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to create quiz");
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>Create Quiz</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => nav("/cms-dashboard")} style={{ background: "#334155" }}>Dashboard</button>
          <button style={{ background: "#6366f1" }}>Create Quiz</button>
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="card">
          <h3>Step 1 — Quiz Details</h3>
          <input
            placeholder="Quiz Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            placeholder="Number of Questions"
            type="number"
            value={numQuestions}
            onChange={e => setNumQuestions(e.target.value)}
          />
          <input
            placeholder="Total Marks"
            type="number"
            value={totalMarks}
            onChange={e => setTotalMarks(e.target.value)}
          />
          <input
            placeholder="Duration (minutes)"
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
          />
          <button onClick={goToStep2} style={{ marginTop: 15 }}>Next →</button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card">
          <h3>Step 2 — Question {current + 1} of {numQuestions}</h3>
          <input
            placeholder="Question"
            value={questionText}
            onChange={e => setQuestionText(e.target.value)}
          />

          {options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={e => {
                const updated = [...options];
                updated[i] = e.target.value;
                setOptions(updated);
              }}
            />
          ))}

          <select
            value={correctOption}
            onChange={e => setCorrectOption(Number(e.target.value))}
            style={{ marginTop: 10, padding: 8, width: "100%", background: "#1e293b", color: "white" }}
          >
            {options.map((opt, i) => (
              <option key={i} value={i}>Correct: Option {i + 1} {opt ? `— ${opt}` : ""}</option>
            ))}
          </select>

          <input
            placeholder="Marks for this question"
            type="number"
            value={marks}
            onChange={e => setMarks(e.target.value)}
            style={{ marginTop: 10 }}
          />

          <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
            {questions.length < Number(numQuestions) - 1 && (
              <button onClick={saveQuestion}>Save & Next →</button>
            )}
            {questions.length === Number(numQuestions) - 1 && (
              <button onClick={saveQuestion} style={{ background: "#22c55e" }}>Save Question</button>
            )}
            {questions.length === Number(numQuestions) && (
              <button onClick={submit} style={{ background: "#6366f1" }}>Create Quiz ✓</button>
            )}
          </div>

          <p style={{ marginTop: 10, color: "#94a3b8" }}>
            {questions.length} of {numQuestions} questions added
          </p>
        </div>
      )}
    </div>
  );
}