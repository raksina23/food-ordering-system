const express = require("express");
const router  = express.Router();
const { getAll, getOne, create, update, remove } = require("../controllers/menu");
const { authenticate } = require("../middleware/auth");

router.get("/",       getAll);
router.get("/:id",    getOne);
router.post("/",      authenticate, create);
router.put("/:id",    authenticate, update);
router.delete("/:id", authenticate, remove);

module.exports = router;