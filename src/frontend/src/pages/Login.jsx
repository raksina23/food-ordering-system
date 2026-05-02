import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [message,  setMessage]  = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",  JSON.stringify(res.data.user));
      setMessage("Login successful!");
      window.location.href = "/menu";
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth:"400px", margin:"4rem auto", padding:"2rem", background:"#fff", borderRadius:"10px", border:"1px solid #ddd" }}>
      <h2 style={{ marginBottom:"1.5rem" }}>Login</h2>
      <input type="email"    placeholder="Email"    value={email}    onChange={e => setEmail(e.target.value)}    style={{ width:"100%", padding:"0.6rem", marginBottom:"1rem", borderRadius:"6px", border:"1px solid #ddd" }} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width:"100%", padding:"0.6rem", marginBottom:"1rem", borderRadius:"6px", border:"1px solid #ddd" }} /><br/>
      <button onClick={handleLogin} style={{ width:"100%", padding:"0.7rem", background:"#1a1a2e", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" }}>Login</button>
      {message && <p style={{ marginTop:"1rem", color:"green" }}>{message}</p>}
    </div>
  );
}
