// services/jobService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

export const fetchJobs = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addJob = async (job) => {
  await axios.post(API_URL, job);
};

export const updateJob = async (id, job) => {
  await axios.put(`${API_URL}/${id}`, job);
};

export const deleteJob = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
