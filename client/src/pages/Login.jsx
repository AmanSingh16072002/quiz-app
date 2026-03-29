import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    nav("/dashboard");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}