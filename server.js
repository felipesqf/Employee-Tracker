const inquirer = require("inquirer");
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
              // code block
              break;
            case "View roles":
                selectRoles()
             break;
            case "View Employees":
            // code block
            break;

            default:
              // code block
          }
    })
  }

selectRoles = () => {
    connection.query("SELECT * FROM emp_role", function(err, res) {
        if (err) throw err;
        console.log(res)
        connection.end();
        init();
    });
}
