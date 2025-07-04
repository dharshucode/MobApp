CREATE TABLE Bookings (
  id SERIAL PRIMARY KEY,
  worker_id INT NOT NULL,
  customer_id INT NOT NULL,
  work_status VARCHAR(30) DEFAULT 'NOT YET STARTED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  FOREIGN KEY (worker_id) REFERENCES Users(id),
  FOREIGN KEY (customer_id) REFERENCES Users(id)
);
