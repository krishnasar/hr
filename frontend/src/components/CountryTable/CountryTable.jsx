import React, { useState, useEffect } from 'react';
import styles from './../styles/CountryTable.module.css';
import {
  fetchCountries,
  deleteCountry,
  addCountry,
  updateCountry,
} from '../../services/countryService';

const initialForm = { country_id: '', country_name: '', region_id: '' };

const CountryTable = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('country_name');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);
  const pageSize = 10;

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
    const filteredData = countries.filter((c) =>
      c.country_name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortKey(key);
    setSortAsc(sortKey === key ? !sortAsc : true);
  };

  const sortedData = [...filtered].sort((a, b) => {
    const aValue = a[sortKey]?.toString().toLowerCase();
    const bValue = b[sortKey]?.toString().toLowerCase();
    if (aValue < bValue) return sortAsc ? -1 : 1;
    if (aValue > bValue) return sortAsc ? 1 : -1;
    return 0;
  });

  const paginated = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filtered.length / pageSize);

  // Handle form input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form to add or update country
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.country_id || !form.country_name || !form.region_id) {
      alert('Please fill all fields');
      return;
    }

    try {
      if (isEdit) {
        await updateCountry(form.country_id, {
          country_name: form.country_name,
          region_id: Number(form.region_id),
        });
      } else {
        await addCountry({
          country_id: form.country_id,
          country_name: form.country_name,
          region_id: Number(form.region_id),
        });
      }
      setForm(initialForm);
      setIsEdit(false);
      loadCountries();
    } catch (error) {
      alert('Error saving country: ' + error.message);
    }
  };

  // Start editing a country
  const onEdit = (country) => {
    setForm({
      country_id: country.country_id,
      country_name: country.country_name,
      region_id: country.region_id.toString(),
    });
    setIsEdit(true);
  };

  // Cancel editing
  const onCancel = () => {
    setForm(initialForm);
    setIsEdit(false);
  };

  // Delete handler (with confirmation)
  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this country?')) {
      await deleteCountry(id);
      loadCountries();
    }
  };

  return (
    <div className={styles.container}>
      <h2>Countries Management</h2>

      {/* Filter input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => handleFilter(e.target.value)}
        className={styles.search}
      />

      {/* Add / Edit Form */}
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          name="country_id"
          placeholder="Country ID"
          value={form.country_id}
          onChange={onChange}
          disabled={isEdit} // disable ID editing on update
          className={styles.input}
          maxLength={2}
        />
        <input
          type="text"
          name="country_name"
          placeholder="Country Name"
          value={form.country_name}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="number"
          name="region_id"
          placeholder="Region ID"
          value={form.region_id}
          onChange={onChange}
          className={styles.input}
          min={1}
        />
        <button type="submit" className={styles.button}>
          {isEdit ? 'Update' : 'Add'}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={onCancel}
            className={styles.buttonCancel}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Countries Table */}
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
                <button onClick={() => onEdit(c)}>✏️</button>{' '}
                <button onClick={() => onDelete(c.country_id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={i + 1 === currentPage ? styles.active : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryTable;
