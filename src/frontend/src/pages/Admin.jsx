import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "", category: "" });
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("orders");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user.role !== "admin") { navigate("/"); return; }
    fetchOrders();
    fetchMenu();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders/all", { headers: { Authorization: `Bearer ${token}` } });
      setOrders(res.data);
    } catch (err) {
      setMessage("Failed to load orders");
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await axios.get("/api/menus");
      setMenuItems(res.data);
    } catch (err) {}
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage(`Order #${id} updated to ${status}`);
      fetchOrders();
    } catch (err) {
      setMessage("Update failed");
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post("/api/menus", { ...newItem, is_available: true },
        { headers: { Authorization: `Bearer ${token}` } });
      setNewItem({ name: "", description: "", price: "", category: "" });
      setMessage("Menu item added!");
      fetchMenu();
    } catch (err) {
      setMessage("Failed to add item");
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`/api/menus/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("Item deleted!");
      fetchMenu();
    } catch (err) {
      setMessage("Failed to delete item");
    }
  };

  const statusColor = (status) => {
    if (status === "pending") return "#f39c12";
    if (status === "completed") return "#27ae60";
    if (status === "cancelled") return "#e74c3c";
    return "#888";
  };

  return (
    <div style={{ maxWidth: "900px", margin: "3rem auto", padding: "1rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Admin Panel</h2>
      {message && <p style={{ color: "green", marginBottom: "1rem" }}>{message}</p>}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button onClick={() => setTab("orders")}
          style={{ padding: "0.6rem 1.5rem", borderRadius: "6px", border: "none", cursor: "pointer",
            background: tab === "orders" ? "#1a1a2e" : "#ddd", color: tab === "orders" ? "#fff" : "#000" }}>
          Orders
        </button>
        <button onClick={() => setTab("menu")}
          style={{ padding: "0.6rem 1.5rem", borderRadius: "6px", border: "none", cursor: "pointer",
            background: tab === "menu" ? "#1a1a2e" : "#ddd", color: tab === "menu" ? "#fff" : "#000" }}>
          Menu
        </button>
      </div>

      {/* Orders Tab */}
      {tab === "orders" && (
        <div>
          <h3 style={{ marginBottom: "1rem" }}>All Orders</h3>
          {orders.length === 0 ? <p>No orders.</p> : orders.map(order => (
            <div key={order.id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "1rem", marginBottom: "1rem", background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong>Order #{order.id}</strong> — User #{order.user_id}
                  <p style={{ margin: "0.3rem 0", color: "#888", fontSize: "0.9rem" }}>{new Date(order.created_at).toLocaleString()}</p>
                  <p style={{ margin: "0.3rem 0" }}>Total: <strong>฿{order.total_price}</strong></p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ color: statusColor(order.status), fontWeight: "bold" }}>{order.status}</span>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button onClick={() => handleUpdateStatus(order.id, "completed")}
                      style={{ background: "#27ae60", color: "#fff", border: "none", borderRadius: "6px", padding: "0.4rem 0.8rem", cursor: "pointer" }}>
                      Complete
                    </button>
                    <button onClick={() => handleUpdateStatus(order.id, "cancelled")}
                      style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "6px", padding: "0.4rem 0.8rem", cursor: "pointer" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Menu Tab */}
      {tab === "menu" && (
        <div>
          <h3 style={{ marginBottom: "1rem" }}>Add Menu Item</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <input placeholder="Name" value={newItem.name}
              onChange={e => setNewItem({ ...newItem, name: e.target.value })}
              style={{ flex: 1, padding: "0.6rem", borderRadius: "6px", border: "1px solid #ddd" }} />
            <input placeholder="Description" value={newItem.description}
              onChange={e => setNewItem({ ...newItem, description: e.target.value })}
              style={{ flex: 2, padding: "0.6rem", borderRadius: "6px", border: "1px solid #ddd" }} />
            <input placeholder="Price" type="number" value={newItem.price}
              onChange={e => setNewItem({ ...newItem, price: e.target.value })}
              style={{ width: "80px", padding: "0.6rem", borderRadius: "6px", border: "1px solid #ddd" }} />
            <input placeholder="Category" value={newItem.category}
              onChange={e => setNewItem({ ...newItem, category: e.target.value })}
              style={{ flex: 1, padding: "0.6rem", borderRadius: "6px", border: "1px solid #ddd" }} />
            <button onClick={handleAddItem}
              style={{ background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "6px", padding: "0.6rem 1.2rem", cursor: "pointer" }}>
              Add
            </button>
          </div>

          <h3 style={{ marginBottom: "1rem" }}>Menu Items</h3>
          {menuItems.map(item => (
            <div key={item.id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "1rem", marginBottom: "0.8rem", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{item.name}</strong> — ฿{item.price}
                <p style={{ margin: "0.2rem 0", color: "#888", fontSize: "0.9rem" }}>{item.description} | {item.category}</p>
              </div>
              <button onClick={() => handleDeleteItem(item.id)}
                style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: "6px", padding: "0.4rem 0.8rem", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}