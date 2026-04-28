const express = require("express");
const router  = express.Router();
const { getCart, addItem, updateItem, removeItem, clearCart } = require("../controllers/cart");
const { authenticate } = require("../middleware/auth");

router.get("/",       authenticate, getCart);
router.post("/",      authenticate, addItem);
router.put("/:id",    authenticate, updateItem);
router.delete("/clear", authenticate, clearCart);
router.delete("/:id", authenticate, removeItem);

module.exports = router;