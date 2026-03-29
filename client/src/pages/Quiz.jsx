import { useEffect, useState } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function Quiz() {
  const { id } = useParams();
  const nav = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [attemptId, setAttemptId] = useState("");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/quizzes").then(res => {
      setQuiz(res.data.find(q => q._id === id));
    });

    API.post("/attempts/start", {
      userId: user._id,
      quizId: id
    }).then(res => setAttemptId(res.data._id));
  }, []);

  if (!quiz) return <div className="container">Loading...</div>;

  const q = quiz.questions[current];

  const next = async () => {
    if (selected === null) return alert("Select an option");
    await API.post("/attempts/save", {
      attemptId,
      questionId: q._id,
      selectedOption: selected
    });

    setSelected(null);
    setCurrent(prev => prev + 1);
  };

  const submit = async () => {
    if (selected !== null) {
        await API.post("/attempts/save", {
        attemptId,
        questionId: q._id,
        selectedOption: selected
        });
    }
    await API.post("/attempts/submit", { attemptId });
    nav(`/report/${attemptId}`);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{quiz.title}</h2>
        <h3>{q.question}</h3>

        {q.options.map((opt, i) => (
          <div key={i}>
            <button
              style={{
                background: selected === i ? "#22c55e" : "#334155",
                marginTop: 10
              }}
              onClick={() => setSelected(i)}
            >
              {opt}
            </button>
          </div>
        ))}

        {current < quiz.questions.length - 1 ? (
          <button onClick={next}>Next</button>
        ) : (
          <button onClick={submit}>Submit</button>
        )}
      </div>
    </div>
  );
}