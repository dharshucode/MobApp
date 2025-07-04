CREATE TABLE BookingRequests (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL,
  worker_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Users(id),
  FOREIGN KEY (worker_id) REFERENCES Users(id)
);
