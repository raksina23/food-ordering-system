import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setMessage("Please fill in all fields");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Registered successfully!");
      navigate("/menu");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", padding: "2rem", background: "#fff", borderRadius: "10px", border: "1px solid #ddd" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Register</h2>
      <input type="text" placeholder="Name" value={name}
        onChange={e => setName(e.target.value)}
        style={{ width: "100%", padding: "0.6rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }} />
      <input type="email" placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: "100%", padding: "0.6rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }} />
      <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleRegister()}
        style={{ width: "100%", padding: "0.6rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }} />
      <button onClick={handleRegister} disabled={loading}
        style={{ width: "100%", padding: "0.7rem", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        {loading ? "Registering..." : "Register"}
      </button>
      {message && <p style={{ marginTop: "1rem", color: message.includes("success") ? "green" : "red" }}>{message}</p>}
      <p style={{ marginTop: "1rem", textAlign: "center" }}>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}