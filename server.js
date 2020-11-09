const inquirer = require("inquirer");
const cTable = require("console.table");
var mysql = require("mysql");

const choices = ["Add departments","Add roles", "Add employees", "View departments", "View roles", "View Employees", "Update employee roles" ]

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
              // code block
              break;
            case "Add roles":
              // code block
              break;
            case "Add employees":
            // code block
                break;
            case "View departments":
                selectDepartments();
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

selectDepartments = () => {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res)
        init();
    });
}

selectEmployees = () => {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, emp_role.salary, department.name FROM employee JOIN emp_role ON employee.role_id = emp_role.id JOIN department ON emp_role.department_id = department.id", function(err, res) {
        if (err) throw err;
        console.table(res)
        init();
    });
}
