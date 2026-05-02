import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [message,  setMessage]  = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("/api/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",  JSON.stringify(res.data.user));
      setMessage("Register successful!");
      window.location.href = "/menu";
    } catch (err) {
      setMessage(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div style={{ maxWidth:"400px", margin:"4rem auto", padding:"2rem", background:"#fff", borderRadius:"10px", border:"1px solid #ddd" }}>
      <h2 style={{ marginBottom:"1.5rem" }}>Register</h2>
      <input type="text"     placeholder="Name"     value={name}     onChange={e => setName(e.target.value)}     style={{ width:"100%", padding:"0.6rem", marginBottom:"1rem", borderRadius:"6px", border:"1px solid #ddd" }} /><br/>
      <input type="email"    placeholder="Email"    value={email}    onChange={e => setEmail(e.target.value)}    style={{ width:"100%", padding:"0.6rem", marginBottom:"1rem", borderRadius:"6px", border:"1px solid #ddd" }} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width:"100%", padding:"0.6rem", marginBottom:"1rem", borderRadius:"6px", border:"1px solid #ddd" }} /><br/>
      <button onClick={handleRegister} style={{ width:"100%", padding:"0.7rem", background:"#4ecca3", color:"#000", border:"none", borderRadius:"6px", cursor:"pointer" }}>Register</button>
      {message && <p style={{ marginTop:"1rem", color:"green" }}>{message}</p>}
    </div>
  );
}
