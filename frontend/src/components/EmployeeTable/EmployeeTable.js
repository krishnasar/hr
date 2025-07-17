import React, { useState, useEffect } from 'react';
import styles from './../styles/CountryTable.module.css';
import {
  fetchEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee,
} from '../../services/employeeService';

const initialForm = {
  employee_id: '',
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  hire_date: '',
  job_id: '',
  salary: '',
  commission_pct: '',
  manager_id: '',
  department_id: '',
};

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('last_name');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    handleFilter(query);
  }, [employees]);

  const loadEmployees = async () => {
    const data = await fetchEmployees();
    setEmployees(data);
  };

  const handleFilter = (text) => {
    setQuery(text);
    const filteredData = employees.filter((e) =>
      e.last_name.toLowerCase().includes(text.toLowerCase())
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
    if (!form.employee_id || !form.last_name || !form.email || !form.hire_date || !form.job_id) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone_number: form.phone_number,
        hire_date: form.hire_date,
        job_id: form.job_id,
        salary: form.salary ? Number(form.salary) : null,
        commission_pct: form.commission_pct ? Number(form.commission_pct) : null,
        manager_id: form.manager_id ? Number(form.manager_id) : null,
        department_id: form.department_id ? Number(form.department_id) : null,
      };

      if (isEdit) {
        await updateEmployee(form.employee_id, payload);
      } else {
        await addEmployee({ employee_id: Number(form.employee_id), ...payload });
      }

      setForm(initialForm);
      setIsEdit(false);
      loadEmployees();
    } catch (error) {
      alert('Error saving employee: ' + error.message);
    }
  };

  const onEdit = (emp) => {
    setForm({
      employee_id: emp.employee_id.toString(),
      first_name: emp.first_name || '',
      last_name: emp.last_name,
      email: emp.email,
      phone_number: emp.phone_number || '',
      hire_date: emp.hire_date,
      job_id: emp.job_id,
      salary: emp.salary?.toString() || '',
      commission_pct: emp.commission_pct?.toString() || '',
      manager_id: emp.manager_id?.toString() || '',
      department_id: emp.department_id?.toString() || '',
    });
    setIsEdit(true);
  };

  const onCancel = () => {
    setForm(initialForm);
    setIsEdit(false);
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee(id);
      loadEmployees();
    }
  };

  return (
    <div className={styles.container}>
      <h2>Employees Management</h2>

      <input
        type="text"
        placeholder="Search by last name..."
        value={query}
        onChange={(e) => handleFilter(e.target.value)}
        className={styles.search}
      />

      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="number"
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={onChange}
          disabled={isEdit}
          className={styles.input}
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={onChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="date"
          name="hire_date"
          placeholder="Hire Date"
          value={form.hire_date}
          onChange={onChange}
          className={styles.input}
          required
        />
        <input
          type="text"
          name="job_id"
          placeholder="Job ID"
          value={form.job_id}
          onChange={onChange}
          className={styles.input}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="number"
          name="commission_pct"
          placeholder="Commission %"
          value={form.commission_pct}
          onChange={onChange}
          step="0.01"
          className={styles.input}
        />
        <input
          type="number"
          name="manager_id"
          placeholder="Manager ID"
          value={form.manager_id}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="number"
          name="department_id"
          placeholder="Department ID"
          value={form.department_id}
          onChange={onChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          {isEdit ? 'Update' : 'Add'}
        </button>
        {isEdit && (
          <button type="button" onClick={onCancel} className={styles.buttonCancel}>
            Cancel
          </button>
        )}
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('employee_id')}>ID</th>
            <th onClick={() => handleSort('first_name')}>First</th>
            <th onClick={() => handleSort('last_name')}>Last</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('phone_number')}>Phone</th>
            <th onClick={() => handleSort('hire_date')}>Hire Date</th>
            <th onClick={() => handleSort('job_id')}>Job</th>
            <th onClick={() => handleSort('salary')}>Salary</th>
            <th onClick={() => handleSort('commission_pct')}>Comm %</th>
            <th onClick={() => handleSort('manager_id')}>Manager</th>
            <th onClick={() => handleSort('department_id')}>Dept</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((e) => (
            <tr key={e.employee_id}>
              <td>{e.employee_id}</td>
              <td>{e.first_name}</td>
              <td>{e.last_name}</td>
              <td>{e.email}</td>
              <td>{e.phone_number}</td>
              <td>{e.hire_date}</td>
              <td>{e.job_id}</td>
              <td>{e.salary}</td>
              <td>{e.commission_pct}</td>
              <td>{e.manager_id}</td>
              <td>{e.department_id}</td>
              <td>
                <button onClick={() => onEdit(e)}>✏️</button>{' '}
                <button onClick={() => onDelete(e.employee_id)}>🗑️</button>
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

export default EmployeeTable;
