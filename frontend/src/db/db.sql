-- 1. Countries Table
CREATE TABLE countries (
    country_id     CHAR(2) PRIMARY KEY,
    country_name   VARCHAR(40),
    region_id      INT
);

-- 2. Locations Table
CREATE TABLE locations (
    location_id    INT PRIMARY KEY,
    street_address VARCHAR(40),
    postal_code    VARCHAR(12),
    city           VARCHAR(30) NOT NULL,
    state_province VARCHAR(25),
    country_id     CHAR(2),
    FOREIGN KEY (country_id) REFERENCES countries(country_id)
);

-- 3. Departments Table
CREATE TABLE departments (
    department_id   INT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
    manager_id      INT,
    location_id     INT,
    FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

-- 4. Jobs Table
CREATE TABLE jobs (
    job_id     VARCHAR(10) PRIMARY KEY,
    job_title  VARCHAR(35) NOT NULL,
    min_salary INT,
    max_salary INT
);

-- 5. Employees Table
CREATE TABLE employees (
    employee_id     INT PRIMARY KEY,
    first_name      VARCHAR(20),
    last_name       VARCHAR(25) NOT NULL,
    email           VARCHAR(25) NOT NULL UNIQUE,
    phone_number    VARCHAR(20),
    hire_date       DATE NOT NULL,
    job_id          VARCHAR(10) NOT NULL,
    salary          DECIMAL(8,2),
    commission_pct  DECIMAL(3,2),
    manager_id      INT,
    department_id   INT,
    FOREIGN KEY (job_id) REFERENCES jobs(job_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
