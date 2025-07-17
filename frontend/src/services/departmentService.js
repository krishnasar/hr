import axios from 'axios';

const API_URL = 'http://localhost:5000/api/departments';

export const fetchDepartments = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addDepartment = async (dept) => {
  await axios.post(API_URL, dept);
};

export const updateDepartment = async (id, dept) => {
  await axios.put(`${API_URL}/${id}`, dept);
};

export const deleteDepartment = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

