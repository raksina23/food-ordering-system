const express = require("express");
const router = express.Router();
const { submitReview, getReviews, deleteReview } = require("../controllers/reviews");
const { authenticate } = require("../middleware/auth");

router.post("/",                        authenticate, submitReview);
router.get("/:menu_item_id",            getReviews);
router.delete("/:id",                   authenticate, deleteReview);

module.exports = router;