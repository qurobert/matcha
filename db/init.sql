CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    verify_email BOOLEAN DEFAULT FALSE,
    notification BOOLEAN DEFAULT TRUE,
    code_password_reset VARCHAR(255) DEFAULT NULL
);