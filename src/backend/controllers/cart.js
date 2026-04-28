const pool = require("../config/db");

const getCart = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT cart_items.id, menu_items.name, menu_items.price, cart_items.quantity
       FROM cart_items
       JOIN menu_items ON cart_items.menu_item_id = menu_items.id
       WHERE cart_items.user_id = $1`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addItem = async (req, res) => {
  const { menu_item_id, quantity } = req.body;
  try {
    const existing = await pool.query(
      "SELECT id FROM cart_items WHERE user_id = $1 AND menu_item_id = $2",
      [req.user.id, menu_item_id]
    );
    if (existing.rows.length > 0) {
      const result = await pool.query(
        "UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND menu_item_id = $3 RETURNING *",
        [quantity, req.user.id, menu_item_id]
      );
      return res.json(result.rows[0]);
    }
    const result = await pool.query(
      "INSERT INTO cart_items (user_id, menu_item_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, menu_item_id, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateItem = async (req, res) => {
  const { quantity } = req.body;
  try {
    const result = await pool.query(
      "UPDATE cart_items SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [quantity, req.params.id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeItem = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM cart_items WHERE id = $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await pool.query("DELETE FROM cart_items WHERE user_id = $1", [req.user.id]);
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCart, addItem, updateItem, removeItem, clearCart };