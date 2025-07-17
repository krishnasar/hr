import React, { useState, useEffect } from 'react';
import styles from './../styles/CountryTable.module.css';
import {
  fetchJobs,
  deleteJob,
  addJob,
  updateJob,
} from '../../services/jobService';

const initialForm = {
  job_id: '',
  job_title: '',
  min_salary: '',
  max_salary: '',
};

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('job_title');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [isEdit, setIsEdit] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    handleFilter(query);
  }, [jobs]);

  const loadJobs = async () => {
    const data = await fetchJobs();
    setJobs(data);
  };

  const handleFilter = (text) => {
    setQuery(text);
    const filteredData = jobs.filter((j) =>
      j.job_title.toLowerCase().includes(text.toLowerCase())
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
    if (!form.job_id || !form.job_title) {
      alert('Please fill required fields');
      return;
    }

    try {
      if (isEdit) {
        await updateJob(form.job_id, {
          job_title: form.job_title,
          min_salary: form.min_salary ? Number(form.min_salary) : null,
          max_salary: form.max_salary ? Number(form.max_salary) : null,
        });
      } else {
        await addJob({
          job_id: form.job_id,
          job_title: form.job_title,
          min_salary: form.min_salary ? Number(form.min_salary) : null,
          max_salary: form.max_salary ? Number(form.max_salary) : null,
        });
      }

      setForm(initialForm);
      setIsEdit(false);
      loadJobs();
    } catch (error) {
      alert('Error saving job: ' + error.message);
    }
  };

  const onEdit = (job) => {
    setForm({
      job_id: job.job_id,
      job_title: job.job_title,
      min_salary: job.min_salary?.toString() || '',
      max_salary: job.max_salary?.toString() || '',
    });
    setIsEdit(true);
  };

  const onCancel = () => {
    setForm(initialForm);
    setIsEdit(false);
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await deleteJob(id);
      loadJobs();
    }
  };

  return (
    <div className={styles.container}>
      <h2>Jobs Management</h2>

      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => handleFilter(e.target.value)}
        className={styles.search}
      />

      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          name="job_id"
          placeholder="Job ID"
          value={form.job_id}
          onChange={onChange}
          disabled={isEdit}
          className={styles.input}
        />
        <input
          type="text"
          name="job_title"
          placeholder="Job Title"
          value={form.job_title}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="number"
          name="min_salary"
          placeholder="Min Salary"
          value={form.min_salary}
          onChange={onChange}
          className={styles.input}
        />
        <input
          type="number"
          name="max_salary"
          placeholder="Max Salary"
          value={form.max_salary}
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
            <th onClick={() => handleSort('job_id')}>ID</th>
            <th onClick={() => handleSort('job_title')}>Title</th>
            <th onClick={() => handleSort('min_salary')}>Min Salary</th>
            <th onClick={() => handleSort('max_salary')}>Max Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((job) => (
            <tr key={job.job_id}>
              <td>{job.job_id}</td>
              <td>{job.job_title}</td>
              <td>{job.min_salary ?? '-'}</td>
              <td>{job.max_salary ?? '-'}</td>
              <td>
                <button onClick={() => onEdit(job)}>✏️</button>{' '}
                <button onClick={() => onDelete(job.job_id)}>🗑️</button>
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

export default JobTable;
