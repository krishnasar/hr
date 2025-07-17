// src/services/countryService.js
import axios from 'axios';

const API = 'http://localhost:5000/api/countries';

export const fetchCountries = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const deleteCountry = async (id) => {
  await axios.delete(`${API}/${id}`);
};

export const addCountry = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateCountry = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};
