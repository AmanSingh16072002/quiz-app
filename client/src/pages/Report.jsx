import { useEffect, useState } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";

export default function Report() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/attempts/report/${id}`).then(res => setData(res.data));
  }, []);

  if (!data) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1 style={{ marginBottom: 20 }}>Quiz Report</h1>
      <h2 style={{ color: "#22c55e" }}>Score: {data.score}</h2>

      {data.report.map((q, i) => (
        <div className="card" key={i}>
          <p><strong>{q.question}</strong></p>

          {q.options.map((opt, idx) => {
            let bg = "#334155";

            if (idx === q.correctOption) bg = "#16a34a"; // green
            if (idx === q.selectedOption && idx !== q.correctOption) bg = "#dc2626"; // red

            return (
              <div key={idx}>
                <button style={{ background: bg, marginTop: 5 }}>
                  {opt}
                </button>
              </div>
            );
          })}

          <p>
            Your Answer:{" "}
            {q.selectedOption !== null
              ? q.options[q.selectedOption]
              : "Not Answered"}
          </p>
        </div>
      ))}
    </div>
  );
}