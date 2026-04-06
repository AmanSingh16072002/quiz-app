import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CMSDashboard from "./pages/CMSDashboard";
import CreateQuiz from "./pages/CreateQuiz";
import Quiz from "./pages/Quiz";
import Report from "./pages/Report";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Student Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/report/:id" element={<Report />} />
        {/* CMS Routes */}
        <Route path="/cms-dashboard" element={<CMSDashboard />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}