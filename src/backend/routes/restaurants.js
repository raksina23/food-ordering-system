const express = require("express");
const router  = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "restaurants works" });
});

module.exports = router;