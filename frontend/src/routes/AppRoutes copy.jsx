// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CountriesPage from '../features/countries/CountriesPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<CountriesPage />} />
  </Routes>
);

export default AppRoutes;
