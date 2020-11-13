-- DROP DATABASE IF EXISTS empmangement_db;
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
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);
insert into department (name)
values ("Information Technology");
SELECT employee.id,
    employee.first_name,
    employee.last_name,
    emp_role.title,
    emp_role.salary,
    department.name
FROM employee
    JOIN emp_role ON employee.role_id = emp_role.id
    JOIN department ON emp_role.department_id = department.id;
DELETE FROM employee
WHERE id = 2;
UPDATE employee
SET role_id = 2
WHERE id = 1;
insert into employee (first_name, last_name, role_id, manager_id)
values ("Malcon", "Smith", 25, 05),
    ("Alex", "Mirkovick", 26, 05),
    ("Harvey", "Horta", 31, 05),
    ("Aline", "Ferreira", 32, 05);
insert into emp_role (title, salary, department_id)
values ("Engineer", 120000, 4),
    ("Manager", 150000, 4),
    ("Intern", 60000, 4),
    ("Developer", 80000, 4),
    ("Finance Manager", 120000, 1),
    ("Accountant", 60000, 1),
    ("Sales Manager", 120000, 2),
    ("Sales Assistant", 60000, 2),
    ("Marketing Manager", 120000, 3),
    ("Content Creator", 60000, 3),
    ("QA Engineer", 90000, 4);