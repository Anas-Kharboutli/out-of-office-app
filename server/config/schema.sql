CREATE DATABASE out_of_office_app;
use out_of_office_app;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name TEXT NOT NULL,
    subdivision VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active' NOT NULL,
    people_partner INT NOT NULL,
    leave_balance INT NOT NULL,
    photo BLOB,
    FOREIGN KEY (people_partner) REFERENCES employees(id)
);