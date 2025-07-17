// src/components/CountryTable/CountryTable.jsx
import React, { useState, useEffect } from 'react';
import styles from './CountryTable.module.css';
import { fetchCountries, deleteCountry, addCountry, updateCountry } from '../../services/countryService';
import { exportToCSV, exportToPDF, exportToExcel, exportToDOCX } from '../../utils/exportUtils';

const CountryTable = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('country_name');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    handleFilter(query);
  }, [countries]);

  const loadCountries = async () => {
    const data = await fetchCountries();
    setCountries(data);
  };

  const handleFilter = (text) => {
    setQuery(text);
    const filteredData = countries.filter(c =>
      c.country_name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortKey(key);
    setSortAsc(!sortAsc);
  };

  const sortedData = [...filtered].sort((a, b) => {
    const aValue = a[sortKey]?.toString().toLowerCase();
    const bValue = b[sortKey]?.toString().toLowerCase();
    if (aValue < bValue) return sortAsc ? -1 : 1;
    if (aValue > bValue) return sortAsc ? 1 : -1;
    return 0;
  });

  const paginated = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className={styles.container}>
      <h2>Countries Management</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => handleFilter(e.target.value)}
        className={styles.search}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('country_id')}>ID</th>
            <th onClick={() => handleSort('country_name')}>Name</th>
            <th onClick={() => handleSort('region_id')}>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((c) => (
            <tr key={c.country_id}>
              <td>{c.country_id}</td>
              <td>{c.country_name}</td>
              <td>{c.region_id}</td>
              <td>
                <button onClick={() => deleteCountry(c.country_id).then(loadCountries)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={i + 1 === currentPage ? styles.active : ''}>
            {i + 1}
          </button>
        ))}
      </div>
      <div className={styles.exportButtons}>
        <button onClick={() => exportToCSV(countries)}>Export CSV</button>
        <button onClick={() => exportToExcel(countries)}>Export Excel</button>
        <button onClick={() => exportToPDF(countries)}>Export PDF</button>
        <button onClick={() => exportToDOCX(countries)}>Export DOCX</button>
      </div>
    </div>
  );
};

export default CountryTable;
