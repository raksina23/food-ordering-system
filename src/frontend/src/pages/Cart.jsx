import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [items,   setItems]   = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/cart", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setItems(res.data))
      .catch(() => setMessage("Please login first"));
  }, []);

  const placeOrder = async () => {
    try {
      await axios.post("/api/orders", {}, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("Order placed!");
      setItems([]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to place order");
    }
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div style={{ padding:"2rem", maxWidth:"600px", margin:"0 auto" }}>
      <h2 style={{ marginBottom:"1rem" }}>Your Cart</h2>
      {message && <p style={{ color:"green", marginBottom:"1rem" }}>{message}</p>}
      {items.length === 0 ? <p style={{ color:"#888" }}>Cart is empty</p> : (
        <>
          {items.map(item => (
            <div key={item.id} style={{ background:"#fff", padding:"1rem", borderRadius:"8px", border:"1px solid #ddd", marginBottom:"0.5rem", display:"flex", justifyContent:"space-between" }}>
              <span>{item.name} x{item.quantity}</span>
              <span>฿{item.price * item.quantity}</span>
            </div>
          ))}
          <p style={{ fontWeight:"bold", margin:"1rem 0" }}>Total: ฿{total}</p>
          <button onClick={placeOrder} style={{ padding:"0.8rem 2rem", background:"#1a1a2e", color:"#fff", border:"none", borderRadius:"8px", cursor:"pointer" }}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
