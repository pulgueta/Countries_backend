CREATE DATABASE IF NOT EXISTS `countries`;

USE `countries`;

CREATE TABLE IF NOT EXISTS `countries`(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
)