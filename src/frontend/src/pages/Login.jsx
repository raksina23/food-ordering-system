import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Login successful!");
      navigate("/menu");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", padding: "2rem", background: "#fff", borderRadius: "10px", border: "1px solid #ddd" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Login</h2>
      <input type="email" placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleLogin()}
        style={{ width: "100%", padding: "0.6rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }} />
      <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleLogin()}
        style={{ width: "100%", padding: "0.6rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }} />
      <button onClick={handleLogin} disabled={loading}
        style={{ width: "100%", padding: "0.7rem", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {message && <p style={{ marginTop: "1rem", color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
      <p style={{ marginTop: "1rem", textAlign: "center" }}>No account? <a href="/register">Register</a></p>
    </div>
  );
}