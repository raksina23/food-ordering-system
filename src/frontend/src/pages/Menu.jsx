import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState({});
  const [reviewForm, setReviewForm] = useState({});
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("/api/menus");
      setItems(res.data);
    } catch (err) {
      setMessage("Failed to load menu");
    }
  };

  const fetchReviews = async (menuItemId) => {
    try {
      const res = await axios.get(`/api/reviews/${menuItemId}`);
      setReviews(prev => ({ ...prev, [menuItemId]: res.data }));
    } catch (err) {}
  };

  const handleAddToCart = async (menuItemId) => {
    if (!token) { navigate("/login"); return; }
    try {
      await axios.post("/api/cart", { menu_item_id: menuItemId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } });
      setMessage("Added to cart!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Failed to add to cart");
    }
  };

  const handleSubmitReview = async (menuItemId) => {
    if (!token) { navigate("/login"); return; }
    const form = reviewForm[menuItemId] || {};
    try {
      await axios.post("/api/reviews", {
        menu_item_id: menuItemId,
        rating: form.rating || 5,
        comment: form.comment || ""
      }, { headers: { Authorization: `Bearer ${token}` } });
      setReviewForm(prev => ({ ...prev, [menuItemId]: {} }));
      fetchReviews(menuItemId);
    } catch (err) {
      setMessage("Failed to submit review");
    }
  };

  const handleDeleteReview = async (reviewId, menuItemId) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchReviews(menuItemId);
    } catch (err) {
      setMessage("Failed to delete review");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "3rem auto", padding: "1rem" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Menu</h2>
      {message && <p style={{ color: message.includes("Added") ? "green" : "red", marginBottom: "1rem" }}>{message}</p>}
      {items.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        items.map(item => (
          <div key={item.id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "1.5rem", marginBottom: "1.5rem", background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ fontSize: "1.1rem" }}>{item.name}</strong>
                <p style={{ margin: "0.3rem 0", color: "#888" }}>{item.description}</p>
                <p style={{ margin: "0.3rem 0" }}>฿{item.price} — <span style={{ color: "#888" }}>{item.category}</span></p>
              </div>
              <button onClick={() => handleAddToCart(item.id)}
                style={{ background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "6px", padding: "0.5rem 1.2rem", cursor: "pointer" }}>
                Add to Cart
              </button>
            </div>

            {/* Reviews section */}
            <div style={{ marginTop: "1rem", borderTop: "1px solid #eee", paddingTop: "1rem" }}>
              <button onClick={() => fetchReviews(item.id)}
                style={{ background: "none", border: "none", color: "#1a1a2e", cursor: "pointer", textDecoration: "underline", padding: 0 }}>
                Show Reviews
              </button>
              {reviews[item.id] && (
                <div style={{ marginTop: "0.5rem" }}>
                  {reviews[item.id].length === 0 ? (
                    <p style={{ color: "#888", fontSize: "0.9rem" }}>No reviews yet.</p>
                  ) : (
                    reviews[item.id].map(r => (
                      <div key={r.id} style={{ background: "#f9f9f9", borderRadius: "6px", padding: "0.5rem 1rem", marginBottom: "0.5rem" }}>
                        <strong>{r.user_name}</strong> — ⭐{r.rating}
                        <p style={{ margin: "0.2rem 0", fontSize: "0.9rem" }}>{r.comment}</p>
                        {token && (
                          <button onClick={() => handleDeleteReview(r.id, item.id)}
                            style={{ background: "none", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: "0.8rem" }}>
                            Delete
                          </button>
                        )}
                      </div>
                    ))
                  )}
                  {token && (
                    <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <select value={reviewForm[item.id]?.rating || 5}
                        onChange={e => setReviewForm(prev => ({ ...prev, [item.id]: { ...prev[item.id], rating: e.target.value } }))}
                        style={{ padding: "0.4rem", borderRadius: "6px", border: "1px solid #ddd" }}>
                        {[5,4,3,2,1].map(n => <option key={n} value={n}>⭐{n}</option>)}
                      </select>
                      <input placeholder="Write a review..." value={reviewForm[item.id]?.comment || ""}
                        onChange={e => setReviewForm(prev => ({ ...prev, [item.id]: { ...prev[item.id], comment: e.target.value } }))}
                        style={{ flex: 1, padding: "0.4rem", borderRadius: "6px", border: "1px solid #ddd" }} />
                      <button onClick={() => handleSubmitReview(item.id)}
                        style={{ background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "6px", padding: "0.4rem 1rem", cursor: "pointer" }}>
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}