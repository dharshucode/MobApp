CREATE TABLE Workers (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    profession VARCHAR(15) NOT NULL,
    is_online VARCHAR(1) NOT NULL,
    warning_count INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
