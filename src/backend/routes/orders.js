const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { placeOrder, getMyOrders, getOne, updateStatus, cancelOrder } = require("../controllers/orders");
const { authenticate } = require("../middleware/auth");

router.post("/",        authenticate, placeOrder);
router.get("/",         authenticate, getMyOrders);
router.get("/all",      authenticate, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id",      authenticate, getOne);
router.put("/:id",      authenticate, updateStatus);
router.delete("/:id",   authenticate, cancelOrder);

module.exports = router;