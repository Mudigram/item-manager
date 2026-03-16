
CREATE DATABASE IF NOT EXISTS item_manager;
USE item_manager;

CREATE TABLE IF NOT EXISTS users (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    username     VARCHAR(100)  NOT NULL UNIQUE,
    email        VARCHAR(255)  NOT NULL UNIQUE,
    password     VARCHAR(255)  NOT NULL,
    created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(150)  NOT NULL,
    description  TEXT,
    user_id      INT           NOT NULL,
    created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
