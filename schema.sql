DROP DATABASE IF EXISTS empmangement_db;
-- Create the database task_saver_db and specified it for use.
CREATE DATABASE empmangement_db;
USE empmangement_db;
-- Create the table tasks.
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES emp_role(id)
);
CREATE TABLE emp_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10, 4) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id) FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);