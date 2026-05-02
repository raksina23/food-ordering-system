import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders,  setOrders]  = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data))
      .catch(() => setMessage("Please login first"));
  }, []);

  return (
    <div style={{ padding:"2rem", maxWidth:"600px", margin:"0 auto" }}>
      <h2 style={{ marginBottom:"1rem" }}>My Orders</h2>
      {message && <p style={{ color:"red" }}>{message}</p>}
      {orders.length === 0 ? <p style={{ color:"#888" }}>No orders yet</p> : (
        orders.map(order => (
          <div key={order.id} style={{ background:"#fff", padding:"1rem", borderRadius:"8px", border:"1px solid #ddd", marginBottom:"0.5rem" }}>
            <p><strong>Order #{order.id}</strong></p>
            <p>Status: <span style={{ color:"#4ecca3" }}>{order.status}</span></p>
            <p>Total: ฿{order.total_price}</p>
            <p style={{ color:"#888", fontSize:"0.85rem" }}>{new Date(order.created_at).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
