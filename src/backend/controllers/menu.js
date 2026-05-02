const pool = require("../config/db");

const getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menu_items WHERE is_available = true");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menu_items WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Item not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  const { name, description, price, category, image_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO menu_items (name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, price, category, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  const { name, description, price, category, is_available } = req.body;
  try {
    const result = await pool.query(
      "UPDATE menu_items SET name=$1, description=$2, price=$3, category=$4, is_available=$5 WHERE id=$6 RETURNING *",
      [name, description, price, category, is_available, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await pool.query("DELETE FROM menu_items WHERE id = $1", [req.params.id]);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
