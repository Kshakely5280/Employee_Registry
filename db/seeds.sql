INSERT INTO department(name)
VALUES ("Sales"), ("IT"), ("Estimates"), ('Website'), ('HR');

INSERT INTO role (job_title, salary, department_id)
VALUES ("Salesman",50000, 1), ("Tech Assistant", 55000, 2), ("Field Estimator", 55000, 3), ("Web Designer", 75000, 4), ("Payroll", 65000, 5), ("Sales Manager", 80000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, NULL), ("Kyle", "Shakely", 4, 1), ("Bob", "Babbit", 2, NULL), ("Chris", "Schumer", 3, NULL), ("Jake",  "Thurman", 3, 1), ("Tarryn", "Chambers", 5, 1);
