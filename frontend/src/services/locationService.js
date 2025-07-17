import axios from 'axios';

const API_URL = 'http://localhost:5000/api/locations';

export const fetchLocations = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addLocation = async (location) => {
  await axios.post(API_URL, location);
};

export const updateLocation = async (id, location) => {
  await axios.put(`${API_URL}/${id}`, location);
};

export const deleteLocation = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
