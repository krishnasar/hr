import React, { useState, useEffect } from 'react';
import styles from './../styles/CountryTable.module.css'; // Use your CSS module
import {
  fetchLocations,
  deleteLocation,
  addLocation,
  updateLocation,
} from '../../services/locationService';

const initialForm = {
  location_id: '',
  street_address: '',
  postal_code: '',
  city: '',
  state_province: '',
  country_id: '',
};

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('city');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    handleFilter(query);
  }, [locations]);

  const loadLocations = async () => {
    const data = await fetchLocations();
    setLocations(data);
  };

  const handleFilter = (text) => {
    setQuery(text);
    const filteredData = locations.filter((loc) =>
      loc.city.toLowerCase().includes(text.toLowerCase())
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

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.location_id || !form.city || !form.country_id) {
      alert('Please fill required fields: location ID, city, and country ID');
      return;
    }

    try {
      if (isEdit) {
        await updateLocation(form.location_id, form);
      } else {
        await addLocation(form);
      }
      setForm(initialForm);
      setIsEdit(false);
      loadLocations();
    } catch (error) {
      alert('Error saving location: ' + error.message);
    }
  };

  const onEdit = (loc) => {
    setForm({ ...loc });
    setIsEdit(true);
  };

  const onCancel = () => {
    setForm(initialForm);
    setIsEdit(false);
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      await deleteLocation(id);
      loadLocations();
    }
  };

  return (
    <div className={styles.container}>
      <h2>Locations Management</h2>

      <input
        type="text"
        placeholder="Search by city..."
        value={query}
        onChange={(e) => handleFilter(e.target.value)}
        className={styles.search}
      />

      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="number"
          name="location_id"
          placeholder="Location ID"
          value={form.location_id}
          onChange={onChange}
          disabled={isEdit}
          className={styles.input}
        />
        <input
          type="text"
          name="street_address"
          placeholder="Street Address"
          value={form.street_address}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={form.postal_code}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="text"
          name="state_province"
          placeholder="State/Province"
          value={form.state_province}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="text"
          name="country_id"
          placeholder="Country ID"
          value={form.country_id}
          onChange={onChange}
          className={styles.input}
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

      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('location_id')}>ID</th>
            <th onClick={() => handleSort('street_address')}>Street</th>
            <th onClick={() => handleSort('postal_code')}>Postal</th>
            <th onClick={() => handleSort('city')}>City</th>
            <th onClick={() => handleSort('state_province')}>State</th>
            <th onClick={() => handleSort('country_id')}>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((loc) => (
            <tr key={loc.location_id}>
              <td>{loc.location_id}</td>
              <td>{loc.street_address || '-'}</td>
              <td>{loc.postal_code || '-'}</td>
              <td>{loc.city}</td>
              <td>{loc.state_province || '-'}</td>
              <td>{loc.country_id}</td>
              <td>
                <button onClick={() => onEdit(loc)}>✏️</button>{' '}
                <button onClick={() => onDelete(loc.location_id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default LocationTable;
