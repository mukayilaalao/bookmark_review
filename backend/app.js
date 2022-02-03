const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./controllers/bookmarcks");

//middlewares
app.use(express.json());
app.use(cors());
//Routes
app.get("/", (req, res) => {
  res.send("WELCOME TO THE BACKEND");
});
app.use("/bookmarks", router);

//Route 404
app.get("*", (req, res) => {
  res.send("Page not found");
});
module.exports = app;
