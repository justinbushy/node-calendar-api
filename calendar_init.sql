DROP DATABASE IF EXISTS calendar;
CREATE DATABASE calendar;

\c calendar;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    user_name VARCHAR,
    password VARCHAR
);

CREATE TABLE events (
    ID SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    title VARCHAR,
    description VARCHAR,
    start_date DATE,
    end_date DATE,
    start_time TIME,
    end_time TIME
);

INSERT INTO users (first_name, last_name, email, user_name, password)
    VALUES ('Justin', 'Bush', 'justin@gmail.com', 'justinbushy', 'pass');

INSERT INTO events (user_id, title, description, start_date, end_date,
                   start_time, end_time)
    VALUES(1, 'PT', 'Physical therapy', '2017-10-03', '2017-10-03',
            '09:00', '10:00');
