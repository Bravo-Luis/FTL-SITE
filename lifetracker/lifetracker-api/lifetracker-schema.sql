CREATE TABLE nutrition (
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    calories VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL
);

CREATE TABLE exercise (
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    intensity VARCHAR(255) NOT NULL,
    duration VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL
);

CREATE TABLE sleep (
    start_time VARCHAR(255) NOT NULL,
    end_time VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id VARCHAR(255) NOT NULL, 
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE CHECK (position('@' IN email) > 1),
    created_at TIMESTAMP DEFAULT NOW()
);

