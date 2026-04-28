const express = require("express");
const router  = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "register works" });
});

router.post("/login", (req, res) => {
  res.json({ message: "login works" });
});

module.exports = router;