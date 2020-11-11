const inquirer = require("inquirer");
const cTable = require("console.table");
var mysql = require("mysql");
const { Console } = require("console");
const choices = ["Add departments","Add roles", "Add employees", "View departments", "View roles", "View Employees", "Update employee roles" ]
let departments;
let managers;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Fel!pe012021",
    database: "empmangement_db"
});

connection.connect(function(err) {
    if (err) throw err;
    init();
});



//propmt user question
init = () =>{
    selectDepartments();
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "Choose an option:",
        choices: choices
        }
    ])
    .then((choices) => {
        switch(choices.choice) {
            case "Add departments":
                insertDepartment();
                break;
            case "Add roles":
                insertRole();
                break;
            case "Add employees":
                selectManagers()
                init();
                break;
            case "View departments":
                console.table(departments);
                init();
                break;
            case "View roles":
                selectRoles();
                init();
                break;
            case "View Employees":
                selectEmployees();
                break;
          }
    })
  }

selectRoles = () => {
    connection.query("SELECT emp_role.title, emp_role.salary, department.name  FROM emp_role RIGHT JOIN department ON emp_role.department_id = department.id", function(err, res) {
        if (err) throw err;
        console.log("\n" + "-------------------------------------------" )
        console.table(res)
    });
}

selectDepartments = () =>{
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        departments =  res;
    })
}

selectManagers = () =>{
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, emp_role.id, emp_role.title FROM employee JOIN emp_role ON employee.role_id = emp_role.id", function(err, res) {
        if (err) throw err;
        managers = res.filter(item => item.title == "Manager");
        console.log(res)
    })
}

selectEmployees = () => {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, emp_role.salary, department.name FROM employee JOIN emp_role ON employee.role_id = emp_role.id JOIN department ON emp_role.department_id = department.id", function(err, res) {
        if (err) throw err;
        console.table(res)
        init();
    });
}

insertDepartment = () =>{
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department name?",
        }
    ])
    .then((newDepartment) => {
        connection.query(`INSERT INTO department (name) VALUES ("${newDepartment.department}")`,function(err, res) {
            if (err) throw err;
            console.log(`Department ${newDepartment.department} added successfully`)
            init();
        }); 
    })
}

insertRole = () =>{
    inquirer.prompt([
        {
        type: "input",
        name: "roleName",
        message: "Please enter the name of the Role:"
        },
        {
        type: "input",
        name: "salary",
        message: "Please enter the salary amount"
        },
        {
        type: "list",
        name: "departmentId",
        message: "Please Select the Department",
        choices: departments
        }
    ])
    .then((newRole) => {
        let depId  = departments.filter(item => item.name == newRole.departmentId)
        connection.query(`INSERT INTO emp_role (title, salary, department_id) VALUES ("${newRole.roleName}", ${newRole.salary}, ${depId[0].id})`,function(err, res) {
            if (err) throw err;
            selectDepartments();
            console.log(`Role ${newRole.roleName} added successfully`)
            init();
        }); 
    })
}