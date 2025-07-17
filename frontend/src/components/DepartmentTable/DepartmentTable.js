import React, { useState, useEffect } from 'react';
//import styles from './../styles/DepartmentTable.module.css';

import styles from './../styles/CountryTable.module.css';
import {
  fetchDepartments,
  deleteDepartment,
  addDepartment,
  updateDepartment,
} from '../../services/departmentService';

const initialForm = {
  department_id: '',
  department_name: '',
  manager_id: '',
  location_id: '',
};

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('department_name');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    handleFilter(query);
  }, [departments]);

  const loadDepartments = async () => {
    const data = await fetchDepartments();
    setDepartments(data);
  };

  const handleFilter = (text) => {
    setQuery(text);
    const filteredData = departments.filter((d) =>
      d.department_name.toLowerCase().includes(text.toLowerCase())
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
    if (!form.department_id || !form.department_name || !form.location_id) {
      alert('Please fill all required fields');
      return;
    }

    try {
      if (isEdit) {
        await updateDepartment(form.department_id, {
          department_name: form.department_name,
          manager_id: form.manager_id ? Number(form.manager_id) : null,
          location_id: Number(form.location_id),
        });
      } else {
        await addDepartment({
          department_id: Number(form.department_id),
          department_name: form.department_name,
          manager_id: form.manager_id ? Number(form.manager_id) : null,
          location_id: Number(form.location_id),
        });
      }
      setForm(initialForm);
      setIsEdit(false);
      loadDepartments();
    } catch (error) {
      alert('Error saving department: ' + error.message);
    }
  };

  const onEdit = (dept) => {
    setForm({
      department_id: dept.department_id.toString(),
      department_name: dept.department_name,
      manager_id: dept.manager_id ? dept.manager_id.toString() : '',
      location_id: dept.location_id.toString(),
    });
    setIsEdit(true);
  };

  const onCancel = () => {
    setForm(initialForm);
    setIsEdit(false);
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      await deleteDepartment(id);
      loadDepartments();
    }
  };

  return (
    <div className={styles.container}>
      <h2>Departments Management</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => handleFilter(e.target.value)}
        className={styles.search}
      />

      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="number"
          name="department_id"
          placeholder="Department ID"
          value={form.department_id}
          onChange={onChange}
          disabled={isEdit}
          className={styles.input}
        />
        <input
          type="text"
          name="department_name"
          placeholder="Department Name"
          value={form.department_name}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="number"
          name="manager_id"
          placeholder="Manager ID (optional)"
          value={form.manager_id}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="number"
          name="location_id"
          placeholder="Location ID"
          value={form.location_id}
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
            <th onClick={() => handleSort('department_id')}>ID</th>
            <th onClick={() => handleSort('department_name')}>Name</th>
            <th onClick={() => handleSort('manager_id')}>Manager</th>
            <th onClick={() => handleSort('location_id')}>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((d) => (
            <tr key={d.department_id}>
              <td>{d.department_id}</td>
              <td>{d.department_name}</td>
              <td>{d.manager_id ?? '-'}</td>
              <td>{d.location_id}</td>
              <td>
                <button onClick={() => onEdit(d)}>✏️</button>{' '}
                <button onClick={() => onDelete(d.department_id)}>🗑️</button>
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

export default DepartmentTable;
