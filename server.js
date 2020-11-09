const inquirer = require("inquirer");
var mysql = require("mysql");

const choices = ["Add departments","Add roles", "Add employees", "View departments", "View roles", "View Employees", "Update employee roles" ]



// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8000;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
        switch(choices) {
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
                // code block
             break;
            case "View Employees":
            // code block
            break;

            default:
              // code block
          }
    })
  }