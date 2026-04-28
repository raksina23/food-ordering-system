const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth",        require("./routes/auth"));
app.use("/api/restaurants", require("./routes/restaurants"));
app.use("/api/orders",      require("./routes/orders"));
app.use("/api/cart",        require("./routes/cart"));
app.use("/api/users",       require("./routes/users"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "CampusEats API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use("/api/menus", require("./routes/menus"));

app.use("/api/cart", require("./routes/cart"));