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
    genre VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    embed_url VARCHAR(255) NOT NULL
);