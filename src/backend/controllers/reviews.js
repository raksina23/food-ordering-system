const pool = require("../config/db");

const submitReview = async (req, res) => {
  const { menu_item_id, rating, comment } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO reviews (user_id, menu_item_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.id, menu_item_id, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT reviews.*, users.name as user_name
       FROM reviews
       JOIN users ON reviews.user_id = users.id
       WHERE reviews.menu_item_id = $1
       ORDER BY reviews.created_at DESC`,
      [req.params.menu_item_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await pool.query(
      "SELECT * FROM reviews WHERE id = $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );
    if (review.rows.length === 0)
      return res.status(404).json({ message: "Review not found" });

    await pool.query("DELETE FROM reviews WHERE id = $1", [req.params.id]);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { submitReview, getReviews, deleteReview };