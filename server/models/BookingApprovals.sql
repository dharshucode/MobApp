CREATE TABLE BookingApprovals (
  id SERIAL PRIMARY KEY,
  request_id INT NOT NULL,
  approver_role VARCHAR(10) NOT NULL, 
  status VARCHAR(10) NOT NULL DEFAULT 'PENDING', --- ['PENDING','APPROVED','DENIED']
  approved_at TIMESTAMP,
  reason TEXT,
  FOREIGN KEY (request_id) REFERENCES BookingRequests(id)
);
