import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background:"#1a1a2e", padding:"1rem 2rem", display:"flex", gap:"1.5rem", alignItems:"center" }}>
      <Link to="/"      style={{ color:"#4ecca3", fontWeight:"bold", fontSize:"1.2rem", textDecoration:"none" }}>🍔 CampusEats</Link>
      <Link to="/menu"  style={{ color:"#ccc", textDecoration:"none" }}>Menu</Link>
      <Link to="/cart"  style={{ color:"#ccc", textDecoration:"none" }}>Cart</Link>
      <Link to="/orders" style={{ color:"#ccc", textDecoration:"none" }}>Orders</Link>
      <div style={{ marginLeft:"auto", display:"flex", gap:"1rem" }}>
        <Link to="/login"    style={{ color:"#ccc", textDecoration:"none" }}>Login</Link>
        <Link to="/register" style={{ color:"#4ecca3", textDecoration:"none" }}>Register</Link>
      </div>
    </nav>
  );
}
