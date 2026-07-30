const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Notes API is running",
  });
});

module.exports = app;