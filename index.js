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
