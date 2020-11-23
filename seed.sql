
insert into department (name)
values 
("Finance"),
("Sales"),
("Marketing"),
("Information Technology");

insert into emp_role (title, salary, department_id)
values ("Engineer", 120000, (SELECT id from department WHERE name = "Information Technology")),
    ("Manager", 150000, (SELECT id from department WHERE name = "Information Technology")),
    ("Intern", 60000, (SELECT id from department WHERE name = "Information Technology")),
    ("Developer", 80000,(SELECT id from department WHERE name = "Information Technology")),
    ("Finance Manager", 120000, (SELECT id from department WHERE name = "Finance")),
    ("Accountant", 60000, (SELECT id from department WHERE name = "Finance")),
    ("Sales Manager", 120000, (SELECT id from department WHERE name = "Sales")),
    ("Sales Assistant", 60000, (SELECT id from department WHERE name = "Sales")),
    ("Marketing Manager", 120000, (SELECT id from department WHERE name = "Marketing")),
    ("Content Creator", 60000, (SELECT id from department WHERE name = "Marketing")),
    ("QA Engineer", 90000, (SELECT id from department WHERE name = "Information Technology"));

insert into employee (first_name, last_name, role_id)
values ("Malcon", "Smith", (SELECT id from emp_role WHERE title = "Manager")),
    ("Harvey", "Horta", (SELECT id from emp_role WHERE title = "Finance Manager")),
    ("Lean", "Mirkovick", (SELECT id from emp_role WHERE title = "Sales Manager")),
    ("Bob", "Smith", (SELECT id from emp_role WHERE title = "Marketing Manager"));
    
insert into employee (first_name, last_name, role_id, manager_id)
values 
    ("Alex", "Mirkovick", (SELECT id from emp_role WHERE title = "Engineer"), 01),
    ("Aline", "Ferreira", (SELECT id from emp_role WHERE title = "Intern"), 01),
    ("John", "Smith", (SELECT id from emp_role WHERE title = "Developer"), 01),
    ("Mary", "Horta", (SELECT id from emp_role WHERE title = "Accountant"), 02),
    ("Felipe", "Mirkovick", (SELECT id from emp_role WHERE title = "Content Creator"), 04),
    ("Daniel", "Horta", (SELECT id from emp_role WHERE title = "Sales Assistant"), 03);
