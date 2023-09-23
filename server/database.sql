--- create database
CREATE DATABASE loopy;

-- \c loopy
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    username VARCHAR(255) UNIQUE NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255) NULL,
    favorite_artist VARCHAR(255) NULL,
    favorite_song VARCHAR(255) NULL,
    favorite_genre VARCHAR(255) NULL,
    current_favorite_song VARCHAR(255) NULL
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    location VARCHAR(255) NULL,
    title VARCHAR(255) NULL,
    hash VARCHAR(255) UNIQUE NOT NULL DEFAULT substring(md5(random()::text), 0, 25),
    genre VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    embed_url VARCHAR(255) NOT NULL
);

-- TODO: tables not added to prod yet 
-- uid - user likes a song
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    song_id INT NOT NULL REFERENCES songs(id),
    song_hash VARCHAR(255) NOT NULL
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    sender_uid VARCHAR(255) NOT NULL, 
    receiver_uid VARCHAR(255) NOT NULL,
    type INT NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- alter table songs ADD column hash varchar(255) UNIQUE NOT NULL default substring(md5(random()::text),0,25);
-- ALTER TABLE songs ADD column caption VARCHAR(255) NULL;

-- TODO: not added yet : 
-- ALTER TABLE users ADD column last_time_checked_notifications TIMESTAMPTZ  NOT NULL DEFAULT NOW()
