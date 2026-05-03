const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders, getOne, updateStatus, cancelOrder } = require("../controllers/orders");
const { authenticate } = require("../middleware/auth");

router.post("/",        authenticate, placeOrder);
router.get("/",         authenticate, getMyOrders);
router.get("/:id",      authenticate, getOne);
router.put("/:id",      authenticate, updateStatus);
router.delete("/:id",   authenticate, cancelOrder);

module.exports = router;