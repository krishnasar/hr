const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/employees.json');

// Helper: read data
const readData = () => {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData || '[]');
};

// Helper: write data
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET all employees
router.get('/', (req, res) => {
  const employees = readData();
  res.json(employees);
});

// GET employee by id
router.get('/:id', (req, res) => {
  const employees = readData();
  const employee = employees.find(e => e.employee_id === parseInt(req.params.id));
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
});

// POST add employee
router.post('/', (req, res) => {
  const employees = readData();
  const newEmployee = req.body;
  
  // simple unique check for employee_id and email
  if (employees.some(e => e.employee_id === newEmployee.employee_id || e.email === newEmployee.email)) {
    return res.status(400).json({ message: 'Duplicate employee_id or email' });
  }

  employees.push(newEmployee);
  writeData(employees);
  res.status(201).json(newEmployee);
});

// PUT update employee
router.put('/:id', (req, res) => {
  const employees = readData();
  const id = parseInt(req.params.id);
  const index = employees.findIndex(e => e.employee_id === id);
  if (index === -1) return res.status(404).json({ message: 'Employee not found' });

  employees[index] = { ...employees[index], ...req.body };
  writeData(employees);
  res.json(employees[index]);
});

// DELETE employee
router.delete('/:id', (req, res) => {
  let employees = readData();
  const id = parseInt(req.params.id);
  const index = employees.findIndex(e => e.employee_id === id);
  if (index === -1) return res.status(404).json({ message: 'Employee not found' });

  employees.splice(index, 1);
  writeData(employees);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
