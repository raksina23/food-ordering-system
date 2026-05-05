import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/users/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data))
      .catch(() => navigate("/login"));
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put("/api/users/profile", { name: user.name, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } });
      localStorage.setItem("user", JSON.stringify(res.data));
      setMessage("Profile updated!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await axios.delete("/api/users/profile", { headers: { Authorization: `Bearer ${token}` } });
      localStorage.clear();
      navigate("/register");
    } catch (err) {
      setMessage("Delete failed");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "3rem auto", padding: "2rem", background: "#fff", borderRadius: "10px", border: "1px solid #ddd" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>My Profile</h2>
      <input type="text" placeholder="Name" value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
        style={{ width: "100%", padding: "0.6rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }} />
      <input type="email" placeholder="Email" value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        style={{ width: "100%", padding: "0.6rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }} />
      <button onClick={handleUpdate}
        style={{ width: "100%", padding: "0.7rem", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginBottom: "1rem" }}>
        Update Profile
      </button>
      {message && <p style={{ color: message.includes("updated") ? "green" : "red", marginBottom: "1rem" }}>{message}</p>}
      <button onClick={handleDelete}
        style={{ width: "100%", padding: "0.7rem", background: "#e74c3c", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        Delete Account
      </button>
    </div>
  );
}