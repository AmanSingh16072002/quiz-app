import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CMSDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/quizzes").then(res => setQuizzes(res.data));
  }, []);

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>Welcome, {user?.name} 👋</h2>
        <button onClick={logout} style={{ background: "#dc2626" }}>Logout</button>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button style={{ background: "#6366f1" }}>Dashboard</button>
        <button onClick={() => nav("/create-quiz")} style={{ background: "#334155" }}>Create Quiz</button>
      </div>

      <h3>All Quizzes</h3>

      {quizzes.length === 0 && <p>No quizzes yet. Create one!</p>}

      {quizzes.map(q => (
        <div className="card" key={q._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3>{q.title}</h3>
            <p>Duration: {q.duration} min | Questions: {q.questions?.length}</p>
          </div>
          <button 
            onClick={() => nav(`/participants/${q._id}`)}
            style={{ background: "#6366f1" }}
          >
            View Participants
          </button>
        </div>
      ))}
    </div>
  );
}