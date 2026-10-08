CREATE DATABASE milestone;

USE milestone;

CREATE TABLE IF NOT EXISTS customers (
	customer_id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50),
	email VARCHAR(50),
	password VARCHAR(50),
	login_status int DEFAULT(0)
);

CREATE TABLE IF NOT EXISTS contact_messages (
	contact_id INT AUTO_INCREMENT PRIMARY KEY,
	phone VARCHAR(50),
	message TEXT,
	email VARCHAR(50),
	subject VARCHAR(50),
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	customer_id int,
	FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE SET NULL
);
