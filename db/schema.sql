DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(35) NOT NULL,
    last_name VARCHAR(35) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    ON DELETE SET NULL
    PRIMARY KEY(id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    depName VARCHAR(35) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    job_title VARCHAR(35) NOT NULL,
    -- needed due to int only handles 1 byte
    salary DECIMAL,
    department_id INT NOT NULL,
    ON DELETE SET NULL
);