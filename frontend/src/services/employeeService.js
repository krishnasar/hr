
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

// Get all employees
export const fetchEmployees = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Add a new employee
export const addEmployee = async (employee) => {
  await axios.post(API_URL, employee);
};

// Update an existing employee by ID
export const updateEmployee = async (id, employee) => {
  await axios.put(`${API_URL}/${id}`, employee);
};

// Delete an employee by ID
export const deleteEmployee = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

