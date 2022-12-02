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
function mainMenu() {
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

// Console  logs a table of all current employees
function viewAllEmployees() {
  connection.query(
    `SELECT 
       employee.id, 
       CONCAT (employee.first_name, " ", employee.last_name) AS name, 
       role.title, 
       role.salary,
       CONCAT (manager.first_name, " ", manager.last_name) AS manager,
       department.name AS department 
       FROM employee 
       JOIN role ON employee.role_id = role.id
       JOIN department ON role.department_id = department.id
       LEFT JOIN employee manager ON employee.manager_id = manager.id`,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.table(result);
      mainMenu();
    }
  );
}

// For adding employee to data base
function addEmployee() {
  inquier
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is your employess role id?",
      },
      {
        type: "input",
        name: "firstName",
        message: "What is your employees first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is your employees last name?",
      },
      {
        type: "input",
        name: "manager",
        message: "what is your employees manager id?",
      },
    ])
    .then((data) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [data.firstName, data.lastName, data.role, data.manager],
        function (err, result) {
          if (err) throw err;
        }
      );
      connection.query(
        `SELECT 
                      employee.id, 
                      CONCAT (employee.first_name, " ", employee.last_name) AS name, 
                      role.title, 
                      role.salary,
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager,
                      department.name AS department 
                      FROM employee 
                       JOIN role ON employee.role_id = role.id
                       JOIN department ON role.department_id = department.id
                       LEFT JOIN employee manager ON employee.manager_id = manager.id`,
        function (err, result) {
          console.table(result);
          mainMenu();
        }
      );
    });
}
// executes the function
mainMenu();
