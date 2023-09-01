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

app.use(cors());
app.use(bodyParser.json());

const endpoint =
  process.env.NODE_ENV === "production"
    ? process.env.LIVE_URL
    : process.env.LOCAL_URL;

app.get("/", (req, res) => {
  res.send("LOOPY is on: " + process.env.NODE_ENV);
});

app.post("/register", async (req, res) => {
  try {
    const {email, uid, username} = req.body;
    const response = await pool.query(
      "INSERT INTO users (email, uid, username) VALUES($1, $2, $3) RETURNING *",
      [email, uid, username]
    );
    res.json(response.rows[0].id);
  } catch (err) {
    console.error(err);
  }
});

app.get("/user_data/:username", async (req, res) => {
  try {
    const {username} = req.params;
    const response = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.get("/user_data_from_uid/:uid", async (req, res) => {
  try {
    const {uid} = req.params;
    const response = await pool.query("SELECT * FROM users WHERE uid = $1", [
      uid,
    ]);
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.get("/is_username_null/:uid", async (req, res) => {
  try {
    const {uid} = req.params;
    const response = await pool.query(
      "SELECT username FROM users WHERE uid = $1",
      [uid]
    );
    res.json(response.rows[0].username === null);
  } catch (err) {
    console.error(err);
  }
});

app.get("/get_username/:uid", async (req, res) => {
  try {
    const {uid} = req.params;
    const response = await pool.query(
      "SELECT username FROM users WHERE uid = $1",
      [uid]
    );
    res.json(response.rows[0].username);
  } catch (err) {
    console.error(err);
  }
});

app.get("/username_exist/:username", async (req, res) => {
  try {
    const {username} = req.params;
    const response = await pool.query(
      "SELECT COUNT(*) FROM users WHERE username = $1",
      [username]
    );
    res.json(response.rows[0]).count;
  } catch (err) {
    console.error(err);
  }
});

app.put("/update_username", async (req, res) => {
  try {
    const {username, uid} = req.body;
    const response = await pool.query(
      "UPDATE users SET username = $1 WHERE uid = $2 RETURNING username",
      [username, uid]
    );
    res.json(response.rows[0].username);
  } catch (err) {
    console.error(err);
  }
});

app.put("/update_location", async (req, res) => {
  try {
    const {location, uid} = req.body;
    const response = await pool.query(
      "UPDATE users SET location = $1 WHERE uid = $2 RETURNING location",
      [location, uid]
    );
    res.json(response.rows[0].location);
  } catch (err) {
    console.error(err);
  }
});

app.put("/update_favorite_genre", async (req, res) => {
  try {
    const {favorite_genre, uid} = req.body;
    const response = await pool.query(
      "UPDATE users SET favorite_genre = $1 WHERE uid = $2 RETURNING favorite_genre",
      [favorite_genre, uid]
    );
    res.json(response.rows[0].favorite_genre);
  } catch (err) {
    console.error(err);
  }
});

app.put("/update_favorite_song", async (req, res) => {
  try {
    const {favorite_song, uid} = req.body;
    const response = await pool.query(
      "UPDATE users SET favorite_song = $1 WHERE uid = $2 RETURNING favorite_song",
      [favorite_song, uid]
    );
    res.json(response.rows[0].favorite_song);
  } catch (err) {
    console.error(err);
  }
});

app.put("/update_favorite_artist", async (req, res) => {
  try {
    const {favorite_artist, uid} = req.body;
    const response = await pool.query(
      "UPDATE users SET favorite_artist = $1 WHERE uid = $2 RETURNING favorite_artist",
      [favorite_artist, uid]
    );
    res.json(response.rows[0].favorite_artist);
  } catch (err) {
    console.error(err);
  }
});

app.put("/update_current_favorite_song", async (req, res) => {
  try {
    const {current_favorite_song, uid} = req.body;
    const response = await pool.query(
      "UPDATE users SET current_favorite_song = $1 WHERE uid = $2 RETURNING current_favorite_song",
      [current_favorite_song, uid]
    );
    res.json(response.rows[0].current_favorite_song);
  } catch (err) {
    console.error(err);
  }
});

app.listen(config.PORT, () => {
  console.log(`server listening on port http://${config.HOST}:${config.PORT}`);
});
