CREATE TABLE Users(
 id SERIAL PRIMARY KEY,
 name VARCHAR(30) NOT NULL,
 email VARCHAR(35) NOT NULL UNIQUE,
 password VARCHAR(25),
 gender VARCHAR(6),
 role VARCHAR(6) NOT NULL,
 address_id INT,
 FOREIGN KEY (address_id) REFERENCES Addresses(id)
);