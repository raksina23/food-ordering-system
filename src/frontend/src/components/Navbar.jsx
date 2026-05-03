import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    else setUser(null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={{ background: "#1a1a2e", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/" style={{ color: "#4ecca3", fontWeight: "bold", fontSize: "1.2rem", textDecoration: "none" }}>
        🍔 CampusEats
      </Link>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/menu" style={{ color: "#fff", textDecoration: "none" }}>Menu</Link>
        {user ? (
          <>
            <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>Cart</Link>
            <Link to="/orders" style={{ color: "#fff", textDecoration: "none" }}>Orders</Link>
            <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>Profile</Link>
            <span style={{ color: "#4ecca3" }}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "6px", padding: "0.4rem 1rem", cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "#4ecca3", textDecoration: "none", fontWeight: "bold" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}