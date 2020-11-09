const inquirer = require("inquirer");
const cTable = require("console.table");
var mysql = require("mysql");
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

selectDepartments = () =>{
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        departments =  res;
    })
}

//propmt user question
init = () =>{
    selectDepartments();
    inquirer.prompt([{
        type: "rawlist",
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
            // code block
                break;
            case "View departments":
                console.table(departments)
                init();
              break;
            case "View roles":
                selectRoles();
             break;
            case "View Employees":
                selectEmployees();
            break;

            default:
              // code block
          }
    })
  }

selectRoles = () => {
    connection.query("SELECT * FROM emp_role RIGHT JOIN department ON emp_role.department_id = department.id", function(err, res) {
        if (err) throw err;
        console.table(res)
        init();
    });
}

// selectDepartments = () => {
//     connection.query("SELECT * FROM department", function(err, res) {
//         if (err) throw err;
//         console.table(res)
//         init();
//     });
// }

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
        connection.query(`INSERT INTO emp_role (title, salary, department_id) VALUES ("${newRole.roleName}", ${newRole.salary}, ${newRole.departmentId})`,function(err, res) {
            if (err) throw err;
            console.log(`Department ${newDepartment.department} added successfully`)
            init();
        }); 
    })
}