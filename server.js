const inquirer = require("inquirer");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "P@ss129811",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

homeScreen();

function homeScreen() {
inquirer
  // menu prompt
  .prompt([
    {
      type: "list",
      name: "homeScreen",
      message: "Please choose from one of the following options to continue",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update Employee Role",
      ],
    },
  ])
  .then((information) => {
    switch (information.homeScreen) {
      case "View All Departments":
        showAllDepartments();
        break;

      case "View All Roles":
        showAllRoles();
        break;

      case "View All Employees":
        showAllEmployees();
        break;

      case "Add A Department":
        addDepartment();
        break;

      case "Add A Role":
        addRole();
        break;

      case "Add An Employee":
        addEmployee();
        break;

      case "Update Employee Role":
        updateEmployee();
        break;
    }
  });
}
function showAllDepartments() {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`\n`);
    console.table(results);
    homeScreen();
  });
  
}

function showAllRoles() {
  db.query(`SELECT * FROM role`, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`\n`);
    console.table(results);
    homeScreen();
  });
  
}

function showAllEmployees() {
  db.query(
    `
      SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.job_title, 
        department.depName AS department, 
        role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `,
    function (err, results) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`\n`);
      console.table(results);
      homeScreen();
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "depName",
        message:
          "Please enter the name of the department you would like to add:",
      },
    ])
    .then((department) => {
      db.query(
        `INSERT INTO department (depName) VALUES (?)`,
        [department.depName],
        function (err, results) {
          if (err) {
            console.log(err);
            return;
          }
          console.log(`\nDepartment added successfully!\n`);
          showAllDepartments();
        }
      );
    });
}

function addrole() {}

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
