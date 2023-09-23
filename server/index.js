require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? "production.env"
      : "development.env",
});

const express = require("express");
const config = require("./config");
const {http, https} = require("follow-redirects");
const bodyParser = require("body-parser");
const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
  methods: "POST, PUT, GET ,OPTIONS, DELETE",
};

const cors = require("cors");
const pool = require("./db");

app.use(cors(corsOptions));
app.use(bodyParser.json());

const endpoint =
  process.env.NODE_ENV === "production"
    ? process.env.LIVE_URL
    : process.env.LOCAL_URL;

app.get("/", (req, res) => {
  res.send("LOOPY is on: " + process.env.NODE_ENV);
});
// TODO:

// app.get("/spotify", async (req, res) => {
//   try {
//     // Get the Spotify URL from the query parameter
//     const {url} = req.query;
//     const apiUrl = `https://open.spotify.com/oembed?url=${url}&format=json`;
//     const response = await axios.get(apiUrl);
//     // Make the Axios GET request to Spotify

//     // Set appropriate CORS headers
//     // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your front-end's origin
//     // res.setHeader("Access-Control-Allow-Credentials", "true");

//     // Send the data as JSON in the response
//     res.json(response.data.html);
//   } catch (error) {
//     console.error("Error making Axios GET request:", error);
//     res.status(500).json({error: "Internal Server Error"});
//   }
// });

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
      "SELECT uid,created_at,location, favorite_artist, favorite_song, current_favorite_song, favorite_genre, username FROM users WHERE username = $1",
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

app.get("/get_genre/:uid", async (req, res) => {
  try {
    const {uid} = req.params;
    const response = await pool.query(
      "SELECT favorite_genre FROM users WHERE uid = $1",
      [uid]
    );
    res.json(response.rows[0].favorite_genre);
  } catch (err) {
    console.error(err);
  }
});

app.get("/get_location/:uid", async (req, res) => {
  try {
    const {uid} = req.params;
    const response = await pool.query(
      "SELECT location FROM users WHERE uid = $1",
      [uid]
    );
    res.json(response.rows[0].location);
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

// SONGS
// get songs a user posted
app.get("/get_user_songs/:uid", async (req, res) => {
  try {
    const {uid} = req.params;
    const response = await pool.query(
      "SELECT id, uid AS user, location, title, source, hash, genre, embed_url AS link, created_at, caption FROM songs WHERE uid = $1 ORDER BY created_at DESC",
      [uid]
    );
    res.json(response.rows); // [] if no songs
  } catch (err) {
    console.error(err);
  }
});

// INSERT INTO songs
app.post("/add_song", async (req, res) => {
  try {
    const {uid, location, title, genre, link, source, embed_url, caption} =
      req.body;
    await pool.query(
      "INSERT INTO songs (uid,location,title,genre,link,source,embed_url,hash, caption) VALUES($1, $2, $3, $4, $5, $6, $7, substring(md5(random()::text), 0, 25), $8) RETURNING *",
      [uid, location, title, genre, link, source, embed_url, caption]
    );
    res.json({status: 200});
  } catch (err) {
    console.error(err);
  }
});

// update caption
app.put("/update_caption", async (req, res) => {
  try {
    const {caption, hash} = req.body;
    await pool.query("UPDATE songs SET caption = $1 WHERE hash = $2", [
      caption,
      hash,
    ]);
    res.json({status: 200});
  } catch (err) {
    console.error(err);
  }
});

app.get("/get_songs", async (req, res) => {
  const {page, genres} = req.query;
  const limit = 15;
  const offset = (page - 1) * limit;
  try {
    const genreFilter = Array.isArray(genres)
      ? "genre = ANY($3::text[])"
      : "genre = $3";
    const response = await pool.query(
      `SELECT id, uid AS user, hash, source, caption, location, title, genre, embed_url AS link, created_at
      FROM songs WHERE ${genreFilter} ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset, genres]
    );
    res.json(response.rows); // [] if no songs
  } catch (err) {
    console.error(err);
  }
});

app.get("/get_song/:hash", async (req, res) => {
  // select id, uid AS user, location, title, genre, embed_url AS link, created_at FROM songs ORDER BY created_at DESC LIMIT 20 OFFSET 0;
  const {hash} = req.params;

  try {
    const response = await pool.query(
      `SELECT id, uid AS user, hash, source, location, title, genre, embed_url AS link, created_at, caption
      FROM songs WHERE hash = $1`,
      [hash]
    );
    res.json(response.rows); // [] if no songs
  } catch (err) {
    console.error(err);
  }
});

//FILTERING
app.get("/get_genres", async (req, res) => {
  try {
    const response = await pool.query("SELECT DISTINCT(genre) FROM songs");
    res.json(response.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/get_favorites", async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT uid, favorite_song, current_favorite_song, created_at FROM users WHERE ( current_favorite_song IS NOT NULL OR favorite_song IS NOT NULL )  AND (current_favorite_song != ''  OR favorite_song != '') ORDER BY created_at DESC"
    );
    res.json(response.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/get_spotify_link/*", async (req, res) => {
  const link = req.params[0];
  try {
    const url = new URL(link);
    const {hostname, pathname} = url;
    const request = await https.request(
      {
        host: hostname,
        path: pathname,
      },
      (response) => {
        let link = response.responseUrl;
        link = link.substring(0, link.indexOf("&"));
        res.json(link);
      }
    );
    request.end();
  } catch (err) {
    console.error(err);
  }
});

// DASHBOARD
app.get("/user_count", async (req, res) => {
  try {
    const response = await pool.query("SELECT COUNT(*) FROM users");
    res.json(parseInt(response.rows[0].count));
  } catch (err) {
    console.error(err);
  }
});

app.get("/users_registered_today", async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT count(*) FROM users WHERE date(created_at) = CURRENT_DATE"
    );
    res.json(parseInt(response.rows[0].count));
  } catch (err) {
    console.error(err);
  }
});

// leaderboard
app.get("/weekly_leaderboard", async (req, res) => {
  try {
    const response =
      await pool.query(`select u.username, count(*) as song_count 
    from users u inner join songs s  on u.uid = s.uid 
    WHERE s.created_at >= CURRENT_DATE - INTERVAL '1 week' 
    AND s.created_at < CURRENT_DATE 
    GROUP BY u.username 
    ORDER BY song_count 
    DESC LIMIT 5`);
    res.json(response.rows);
  } catch (err) {
    console.error(err);
  }
});

// LIKES
app.post("/add_like", async (req, res) => {
  try {
    const {uid, song_id, song_hash} = req.body;
    const response = await pool.query(
      "INSERT INTO likes (uid, song_id, song_hash) VALUES($1, $2, $3) RETURNING *",
      [uid, song_id, song_hash]
    );
    res.json({status: "OK!"});
  } catch (err) {
    console.error(err);
  }
});

app.delete("/remove_like", async (req, res) => {
  try {
    const {uid, song_id, song_hash} = req.body;
    await pool.query(
      "DELETE FROM likes WHERE uid = $1 AND song_id = $2 AND song_hash = $3",
      [uid, song_id, song_hash]
    );
    res.json("song deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/get_like", async (req, res) => {
  try {
    const {uid, song_hash} = req.query;
    const response = await pool.query(
      `SELECT s.id, s.uid AS user, s.location,s.title, s.source, s.hash, s.genre, s.embed_url AS link, s.created_at, s.caption
       FROM songs s 
       INNER JOIN likes l 
       ON l.song_id = s.id 
       WHERE l.uid = $1
       AND s.hash = $2`,
      [uid, song_hash]
    );
    res.json(response.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/get_user_likes", async (req, res) => {
  try {
    const {uid} = req.query;
    const response = await pool.query(
      `SELECT s.id, s.uid AS user, s.location,s.title, s.source, s.hash, s.genre, s.embed_url AS link, s.created_at, s.caption
       FROM songs s 
       INNER JOIN likes l 
       ON l.song_id = s.id 
       WHERE l.uid = $1
       ORDER BY l.created_at DESC`,
      [uid]
    );
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/send_notification", async (req, res) => {
  try {
    const {sender_uid, receiver_uid, type, content_id, content_hash} = req.body;
    await pool.query(
      "INSERT INTO notifications (sender_uid, receiver_uid, type, content_id, content_hash) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [sender_uid, receiver_uid, type, content_id, content_hash]
    );
    res.json({status: "OK"});
  } catch (err) {
    console.error(err);
  }
});

/*

app.delete("/remove_like", async (req, res) => {
  try {
    const {uid, song_id, song_hash} = req.body;
    await pool.query(
      "DELETE FROM likes WHERE uid = $1 AND song_id = $2 AND song_hash = $3",
      [uid, song_id, song_hash]
    );
    res.json("song deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

*/

app.delete("/unsend_notification", async (req, res) => {
  try {
    const {sender_uid, receiver_uid, type, content_id, content_hash} = req.body;

    // Check if any required fields are missing in the request
    if (!sender_uid || !receiver_uid || !type || !content_id || !content_hash) {
      return res.status(400).json({error: "Missing required fields"});
    }

    await pool.query(
      "DELETE FROM notifications WHERE sender_uid = $1 AND receiver_uid = $2 AND type = $3 AND content_id = $4 AND content_hash = $5",
      [sender_uid, receiver_uid, type, content_id, content_hash]
    );
    res.json({status: "notification unsent"});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: "Internal server error"});
  }
});

app.listen(config.PORT, () => {
  console.log(`server listening on port http://${config.HOST}:${config.PORT}`);
});
