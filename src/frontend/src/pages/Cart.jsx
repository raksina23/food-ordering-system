import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/cart", { headers: { Authorization: `Bearer ${token}` } });
      setCart(res.data);
    } catch (err) {
      setMessage("Failed to load cart");
    }
  };

  const handleUpdate = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`/api/cart/${id}`, { quantity }, { headers: { Authorization: `Bearer ${token}` } });
      fetchCart();
    } catch (err) {
      setMessage("Update failed");
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/api/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchCart();
    } catch (err) {
      setMessage("Remove failed");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await axios.post("/api/orders", {}, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("Order placed!");
      fetchCart();
    } catch (err) {
      setMessage(err.response?.data?.message || "Order failed");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: "700px", margin: "3rem auto", padding: "1rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>My Cart</h2>
      {message && <p style={{ color: message.includes("placed") ? "green" : "red", marginBottom: "1rem" }}>{message}</p>}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "1rem", marginBottom: "1rem", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{item.name}</strong>
                <p style={{ margin: "0.3rem 0", color: "#888" }}>฿{item.price} each</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button onClick={() => handleUpdate(item.id, item.quantity - 1)}
                  style={{ background: "#ddd", border: "none", borderRadius: "4px", padding: "0.3rem 0.7rem", cursor: "pointer", fontSize: "1rem" }}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdate(item.id, item.quantity + 1)}
                  style={{ background: "#ddd", border: "none", borderRadius: "4px", padding: "0.3rem 0.7rem", cursor: "pointer", fontSize: "1rem" }}>+</button>
                <button onClick={() => handleRemove(item.id)}
                  style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "4px", padding: "0.3rem 0.7rem", cursor: "pointer" }}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <strong style={{ fontSize: "1.2rem" }}>Total: ฿{total}</strong>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={handlePlaceOrder}
                style={{ background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "6px", padding: "0.7rem 2rem", cursor: "pointer", fontSize: "1rem" }}>
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}