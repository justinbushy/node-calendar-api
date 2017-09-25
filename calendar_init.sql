DROP DATABASE IF EXISTS calendar;
CREATE DATABASE calendar;

\c calendar;

CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    user_name VARCHAR,
    password VARCHAR
);

INSERT INTO users (first_name, last_name, email, user_name, password)
    VALUES ('Justin', 'Bush', 'justin@gmail.com', 'justinbushy', 'pass');
