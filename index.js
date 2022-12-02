// setting up variables
const inquier = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// links database
const connection = mysql.createConnection(
  {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  console.log("Welcome!")
);
// These are the questions that appear on the commandline
function mainMenu(){
    inquier
    .prompt([
      {
        type: "list",
        name: "answer",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Deparments",
          "Add Department",
          "Exit",
        ],
      },
    ])
    // depending on how things are answered, the code switches to the correct line
    .then(({ answer }) => {
      switch (answer) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Deparments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Exit":
          exit();
          break;
      }
    })
    // for catching errors
    .catch((err) => {
      console.log(err);
    });
}