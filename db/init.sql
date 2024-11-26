CREATE TABLE users (
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
    pictures TEXT[],
    age_preference_min INT DEFAULT 18,
    age_preference_max INT DEFAULT 30,
    fame_rating_preference_min INT DEFAULT 0,
    fame_rating_preference_max INT DEFAULT 100,
    distance_preference INT DEFAULT 80,
    interests_preference TEXT[],
    is_online BOOLEAN DEFAULT FALSE,
    last_connection TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_actions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    target_user_id INT NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, target_user_id, action_type),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (target_user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE NOT NULL,
    target_user_id INT REFERENCES Users(id) ON DELETE CASCADE NOT NULL,
    notification_type VARCHAR(100) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    target_user_id INTEGER,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (target_user_id) REFERENCES users(id)
);