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
          addNewEmployee();
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

function addRole() {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }

    const departmentNames = results.map((department) => {
      return { name: department.depName, value: department.id };
    });

    console.log(departmentNames);
    console.log(`\n`);
    console.table(results);

    inquirer
      .prompt([
        {
          type: "list",
          name: "roleDepName",
          message: "Please choose the department for this new role:",
          choices: departmentNames,
        },
        {
          type: "input",
          name: "newRoleName",
          message: "Please enter the job title for this new role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Please enter the salary for this new role:",
        },
      ])
      .then((roleInfo) => {
        db.query(
          `INSERT INTO role (department_id, job_title, salary) VALUES (?, ?, ?)`,
          [roleInfo.roleDepName, roleInfo.newRoleName, roleInfo.salary],
          function (err, results) {
            if (err) {
              console.log(err);
              return;
            }
            console.log(`\nNew Role added successfully!\n`);
            showAllRoles();
          }
        );
      });
  });
}

function addNewEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "empFirstName",
        message: "Please enter the FIRST name of new employee:",
      },
      {
        type: "input",
        name: "empLastName",
        message: "Please enter the LAST name of new employee:",
      },
      {
        type: "input",
        name: "empRoleName",
        message: "Please enter the role ID of new employee:",
      },
      {
        type: "input",
        name: "managerName",
        message: "Please enter the ID of this employees' manager:",
      },
    ])
    .then((empAns) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [
          empAns.empFirstName,
          empAns.empLastName,
          empAns.empRoleName,
          empAns.managerName,
        ],
        function (err, results) {
          if (err) {
            console.log(err);
            return;
          }
          console.log(`\nNew Employee added successfully!\n`);
          showAllEmployees();
        }
      );
    });
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
