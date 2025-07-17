CREATE TABLE countries (
  country_id     CHAR(2) PRIMARY KEY,
  country_name   VARCHAR2(40),
  region_id      NUMBER
);



CREATE TABLE locations (
  location_id     NUMBER PRIMARY KEY,
  street_address  VARCHAR2(40),
  postal_code     VARCHAR2(12),
  city            VARCHAR2(30) NOT NULL,
  state_province  VARCHAR2(25),
  country_id      CHAR(2)
);


CREATE TABLE departments (
  department_id    NUMBER PRIMARY KEY,
  department_name  VARCHAR2(30) NOT NULL,
  manager_id       NUMBER,
  location_id      NUMBER
);


CREATE TABLE employees (
  employee_id    NUMBER PRIMARY KEY,
  first_name     VARCHAR2(20),
  last_name      VARCHAR2(25) NOT NULL,
  email          VARCHAR2(25) NOT NULL,
  phone_number   VARCHAR2(20),
  hire_date      DATE NOT NULL,
  job_id         VARCHAR2(10) NOT NULL,
  salary         NUMBER(8,2),
  commission_pct NUMBER(2,2),
  manager_id     NUMBER,
  department_id  NUMBER
);


CREATE TABLE job_history (
  employee_id   NUMBER NOT NULL,
  start_date    DATE NOT NULL,
  end_date      DATE NOT NULL,
  job_id        VARCHAR2(10) NOT NULL,
  department_id NUMBER
);


INSERT INTO countries (country_id, country_name, region_id) VALUES ('US', 'United States', 2);
INSERT INTO countries (country_id, country_name, region_id) VALUES ('IN', 'India', 3);


INSERT INTO locations (location_id, street_address, postal_code, city, state_province, country_id)
VALUES (1000, '1297 Main St', '12345', 'Seattle', 'Washington', 'US');

INSERT INTO locations (location_id, street_address, postal_code, city, state_province, country_id)
VALUES (2000, '5 MG Road', '560001', 'Bangalore', 'Karnataka', 'IN');


INSERT INTO departments (department_id, department_name, manager_id, location_id)
VALUES (10, 'Administration', NULL, 1000);

INSERT INTO departments (department_id, department_name, manager_id, location_id)
VALUES (20, 'IT', 101, 2000);



INSERT INTO jobs (job_id, job_title, min_salary, max_salary)
VALUES ('AD_PRES', 'President', 20000, 40000);

INSERT INTO jobs (job_id, job_title, min_salary, max_salary)
VALUES ('IT_PROG', 'Programmer', 4000, 10000);


INSERT INTO employees (employee_id, first_name, last_name, email, phone_number, hire_date,
                       job_id, salary, commission_pct, manager_id, department_id)
VALUES (100, 'Steven', 'King', 'SKING', '515.123.4567', TO_DATE('2003-06-17','YYYY-MM-DD'),
        'AD_PRES', 24000, NULL, NULL, 10);

INSERT INTO employees (employee_id, first_name, last_name, email, phone_number, hire_date,
                       job_id, salary, commission_pct, manager_id, department_id)
VALUES (101, 'Neena', 'Kochhar', 'NKOCHHAR', '515.123.4568', TO_DATE('2005-09-21','YYYY-MM-DD'),
        'IT_PROG', 6000, NULL, 100, 20);



INSERT INTO job_history (employee_id, start_date, end_date, job_id, department_id)
VALUES (101, TO_DATE('2003-01-01', 'YYYY-MM-DD'), TO_DATE('2005-09-20', 'YYYY-MM-DD'), 'IT_PROG', 10);
