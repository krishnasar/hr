import React, { useState, useEffect } from 'react';
//import './components/styles/EmployeeForm.css';
import '../styles/EmployeeForm.css';


export default function EmployeeForm({ selectedEmployee, onSaved, onCancel }) {
  const [form, setForm] = useState({
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
  });

  useEffect(() => {
    if (selectedEmployee) {
      setForm({ ...selectedEmployee });
    } else {
      setForm({
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
      });
    }
  }, [selectedEmployee]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = selectedEmployee ? 'PUT' : 'POST';
    const url = selectedEmployee ? `/api/employees/${form.employee_id}` : '/api/employees';

    // Simple validation example
    if (!form.employee_id || !form.first_name || !form.last_name || !form.email || !form.hire_date || !form.job_id) {
      alert('Please fill required fields.');
      return;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || 'Error saving employee');
        return;
      }
      onSaved();
    } catch (error) {
      alert('Network error');
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <input
        type="number"
        name="employee_id"
        value={form.employee_id}
        onChange={handleChange}
        placeholder="Employee ID"
        disabled={!!selectedEmployee}
        required
      />
      <input
        type="text"
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        type="date"
        name="hire_date"
        value={form.hire_date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="job_id"
        value={form.job_id}
        onChange={handleChange}
        placeholder="Job ID"
        required
      />
      <input
        type="number"
        step="0.01"
        name="salary"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
      />
      <input
        type="number"
        step="0.01"
        name="commission_pct"
        value={form.commission_pct}
        onChange={handleChange}
        placeholder="Commission %"
      />
      <input
        type="number"
        name="manager_id"
        value={form.manager_id}
        onChange={handleChange}
        placeholder="Manager ID"
      />
      <input
        type="number"
        name="department_id"
        value={form.department_id}
        onChange={handleChange}
        placeholder="Department ID"
      />
      <div className="form-buttons">
        <button type="submit">{selectedEmployee ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
