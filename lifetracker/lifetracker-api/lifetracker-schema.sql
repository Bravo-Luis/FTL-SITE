CREATE TABLE nutrition (
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    calories VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE CHECK (position('@' IN email) > 1)
);