import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders", { headers: { Authorization: `Bearer ${token}` } });
      setOrders(res.data);
    } catch (err) {
      setMessage("Failed to load orders");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      await axios.delete(`/api/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("Order cancelled!");
      fetchOrders();
    } catch (err) {
      setMessage(err.response?.data?.message || "Cancel failed");
    }
  };

  const statusColor = (status) => {
    if (status === "pending") return "#f39c12";
    if (status === "completed") return "#27ae60";
    if (status === "cancelled") return "#e74c3c";
    return "#888";
  };

  return (
    <div style={{ maxWidth: "700px", margin: "3rem auto", padding: "1rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>My Orders</h2>
      {message && <p style={{ color: "green", marginBottom: "1rem" }}>{message}</p>}
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "1.5rem", marginBottom: "1rem", background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>Order #{order.id}</strong>
                <p style={{ margin: "0.3rem 0", color: "#888", fontSize: "0.9rem" }}>
                  {new Date(order.created_at).toLocaleString()}
                </p>
                <p style={{ margin: "0.3rem 0" }}>Total: <strong>฿{order.total_price}</strong></p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ color: statusColor(order.status), fontWeight: "bold", textTransform: "capitalize" }}>
                  {order.status}
                </span>
                {order.status === "pending" && (
                  <div style={{ marginTop: "0.5rem" }}>
                    <button onClick={() => handleCancel(order.id)}
                      style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "6px", padding: "0.4rem 1rem", cursor: "pointer" }}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}