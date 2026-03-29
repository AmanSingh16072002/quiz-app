import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    API.get("/quizzes").then(res => setQuizzes(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Available Quizzes</h2>

      {quizzes.map(q => (
        <div className="card" key={q._id}>
          <h3>{q.title}</h3>
          <p>Duration: {q.duration} min</p>
          <button onClick={() => nav(`/quiz/${q._id}`)}>Start Quiz</button>
        </div>
      ))}
    </div>
  );
}