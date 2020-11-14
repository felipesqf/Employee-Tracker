insert into employee (first_name, last_name, role_id)
values ("Malcon", "Smith", 2),
    ("Harvey", "Horta", 9),
    ("Lean", "Mirkovick", 9),
    ("Bob", "Smith", 8);


insert into employee (first_name, last_name, role_id, manager_id)
values ("Malcon", "Smith", 2),
    ("Alex", "Mirkovick", 1, 01),
    ("Harvey", "Horta", 9),
    ("Aline", "Ferreira", 4, 01),
    ("John", "Smith",11, 01),
    ("Lean", "Mirkovick", 9),
    ("Mary", "Horta", 10, 06),
    ("Bob", "Smith", 8),
    ("Felipe", "Mirkovick", 4, 08),
    ("Daniel", "Horta", 3, 01);


insert into emp_role (title, salary, department_id)
values ("Engineer", 120000, 7),
    ("Manager", 150000, 7),
    ("Intern", 60000, 7),
    ("Developer", 80000,7),
    ("Finance Manager", 120000, 2),
    ("Accountant", 60000, 2),
    ("Sales Manager", 120000,6),
    ("Sales Assistant", 60000, 6),
    ("Marketing Manager", 120000, 4),
    ("Content Creator", 60000, 4),
    ("QA Engineer", 90000, 7);


insert into department (name)
values 
("Finance"),
("Sales"),
("Marketing"),
("Finance"),
("Sales"),
("Information Technology");