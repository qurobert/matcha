CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    verify_email BOOLEAN DEFAULT FALSE,
    notification BOOLEAN DEFAULT TRUE,
    code_password_reset VARCHAR(255) DEFAULT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(50),
    interested_in VARCHAR(50),
    biography TEXT,
    location_lat FLOAT,
    location_lng FLOAT,
    interests TEXT[],
    pictures TEXT[]
);