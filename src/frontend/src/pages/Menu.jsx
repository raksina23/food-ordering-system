import { useEffect, useState } from "react";
import axios from "axios";

export default function Menu() {
  const [items,   setItems]   = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/menus").then(res => setItems(res.data));
  }, []);

  const addToCart = async (menuItemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/cart", { menu_item_id: menuItemId, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Added to cart!");
      setTimeout(() => setMessage(""), 2000);
    } catch {
      setMessage("Please login first");
    }
  };

  return (
    <div style={{ padding:"2rem" }}>
      <h2 style={{ marginBottom:"1rem" }}>Our Menu</h2>
      {message && <p style={{ color:"green", marginBottom:"1rem" }}>{message}</p>}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:"1rem" }}>
        {items.map(item => (
          <div key={item.id} style={{ background:"#fff", borderRadius:"10px", padding:"1.2rem", border:"1px solid #e0e0e0" }}>
            <h3>{item.name}</h3>
            <p style={{ color:"#888", fontSize:"0.9rem", margin:"0.4rem 0" }}>{item.description}</p>
            <p style={{ fontWeight:"bold", margin:"0.5rem 0" }}>฿{item.price}</p>
            <button onClick={() => addToCart(item.id)} style={{ width:"100%", padding:"0.5rem", background:"#4ecca3", border:"none", borderRadius:"6px", cursor:"pointer", fontWeight:"bold" }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
