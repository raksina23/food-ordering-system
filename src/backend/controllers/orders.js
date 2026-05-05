const pool = require("../config/db");

const placeOrder = async (req, res) => {
  try {
    const cartResult = await pool.query(
      `SELECT cart_items.menu_item_id, cart_items.quantity, menu_items.price
       FROM cart_items
       JOIN menu_items ON cart_items.menu_item_id = menu_items.id
       WHERE cart_items.user_id = $1`,
      [req.user.id]
    );
    if (cartResult.rows.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const total = cartResult.rows.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *",
      [req.user.id, total]
    );
    const order = orderResult.rows[0];

    for (const item of cartResult.rows) {
      await pool.query(
        "INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price) VALUES ($1, $2, $3, $4)",
        [order.id, item.menu_item_id, item.quantity, item.price]
      );
    }

    await pool.query("DELETE FROM cart_items WHERE user_id = $1", [req.user.id]);
    res.status(201).json({ message: "Order placed!", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const order = await pool.query(
      "SELECT * FROM orders WHERE id = $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );
    if (order.rows.length === 0)
      return res.status(404).json({ message: "Order not found" });

    const items = await pool.query(
      `SELECT order_items.*, menu_items.name
       FROM order_items
       JOIN menu_items ON order_items.menu_item_id = menu_items.id
       WHERE order_items.order_id = $1`,
      [req.params.id]
    );
    res.json({ ...order.rows[0], items: items.rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await pool.query(
      "SELECT * FROM orders WHERE id = $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );
    if (order.rows.length === 0)
      return res.status(404).json({ message: "Order not found" });
    if (order.rows[0].status !== "pending")
      return res.status(400).json({ message: "Only pending orders can be cancelled" });

    const result = await pool.query(
      "UPDATE orders SET status = 'cancelled' WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    res.json({ message: "Order cancelled", order: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { placeOrder, getMyOrders, getOne, updateStatus, cancelOrder };