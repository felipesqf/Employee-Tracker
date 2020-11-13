const inquirer = require("inquirer");
const cTable = require("console.table");
var mysql = require("mysql");
const { Console } = require("console");
const { async } = require("rxjs");
const choices = ["Add departments","Add roles", "Add employees", "View departments", "View roles", "View Employees", "Update employee roles" ]
let managers;
let departments;
let roles;
let employees;

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
})
//propmt user question
init = () =>{
    selectDepartments();
    selectManagers();
    selectRoles();
    selectEmployees();
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
                insertEmployee()
                break;
            case "View departments":
                console.log("\n" + "----------------------------" )
                console.table(departments);
                init();
                break;
            case "View roles":
                console.log("\n" + "-------------------------------------------------------" )
                console.table(roles)
                init();
                break;
            case "View Employees":
                console.log("\n" + "-------------------------------------------------------" )
                console.table(employees)
                init();
                break;
            case "Update employee roles":
                updateEmployeeRole()
                break;
          }
    })
  }

selectRoles = () => {
    connection.query("SELECT emp_role.id, emp_role.title, emp_role.salary, department.name FROM emp_role RIGHT JOIN department ON emp_role.department_id = department.id", function(err, res) {
        if (err) throw err;
        roles = res
    });
}
selectDepartments = () =>{
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        departments = res
    })
}

selectManagers = () =>{
    connection.query("select employee.id, employee.first_name, employee.last_name from employee where manager_id is null", function(err, res) {
        if (err) throw err;
        managers = res;
    })
}

selectEmployees = () => {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, emp_role.salary, department.name FROM employee JOIN emp_role ON employee.role_id = emp_role.id JOIN department ON emp_role.department_id = department.id", function(err, res) {
        if (err) throw err;
        employees = res
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
            console.log(`*** Department of ${newDepartment.department} added successfully ***`)
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
            console.log("\n" + "-------------------------------------------" )
            console.log(`*** Role ${newRole.roleName} added successfully ***`)
            console.log("\n" + "-------------------------------------------" )
            init();
        }); 
    })
}
insertEmployee = () =>{
    managers.forEach(manager => manager.name = manager.first_name + " " + manager.last_name)
    roles.forEach(element =>  element.name = element.title)
    inquirer.prompt([
        {
        type: "input",
        name: "firstName",
        message: "Please enter the employee first name"
        },
        {
        type: "input",
        name: "lastName",
        message: "Please enter the employee last name"
        },
        {
        type: "rawlist",
        name: "roleId",
        message: "Please Select the role",
        choices: roles
        },
        {
        type: "list",
        name: "managerId",
        message: "Please Select the Manager",
        choices: managers
        }
    ]) 
    .then((newEmployee) => {
        let roleId  = roles.filter(item => item.title == newEmployee.roleId)
        let managerId = managers.filter(item => item.name == newEmployee.managerId )
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newEmployee.firstName}", "${newEmployee.lastName}", ${roleId[0].id}, ${managerId[0].id})`,function(err, res) {
            if (err) throw err;
            console.log("\n" + "-------------------------------------------" )
            console.log(`*** Employee ${newEmployee.firstName} ${newEmployee.lastName} added successfully ***`)
            console.log("\n" + "-------------------------------------------" )
            init();
        }); 
    })
}

updateEmployeeRole = () =>{
    employees.forEach(employee => employee.name = employee.first_name + " " + employee.last_name)
    roles.forEach(element =>  element.name = element.title)
    console.log(employees)
    inquirer.prompt([
        {
        type: "list",
        name: "employee",
        message: "Please eselect the employee",
        choices: employees
        },
        {
        type: "list",
        name: "newRole",
        message: "Please select the new role",
        choices: roles
        }
    ])
    .then((newRole) => {
        let roleID  = roles.filter(item => item.name == newRole.newRole)
        let empID  = employees.filter(item => item.name == newRole.employee)
        connection.query(`update employee set role_id = ${roleID[0].id} where employee.id = "${empID[0].id}"`,function(err, res) {
            if (err) throw err;
            console.log("\n" + "-------------------------------------------" )
            console.log(`*** Role ${newRole.roleName} added successfully ***`)
            console.log("\n" + "-------------------------------------------" )
            init();
        }); 
    })
}