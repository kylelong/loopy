require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? "production.env"
      : "development.env",
});

const express = require("express");
const config = require("./config");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const pool = require("./db");

const endpoint =
  process.env.NODE_ENV === "production"
    ? process.env.LIVE_URL
    : process.env.LOCAL_URL;

app.get("/", (req, res) => {
  res.send("LOOPY is on: " + process.env.NODE_ENV);
});

app.listen(config.PORT, () => {
  console.log(`server listening on port http://${config.HOST}:${config.PORT}`);
});
