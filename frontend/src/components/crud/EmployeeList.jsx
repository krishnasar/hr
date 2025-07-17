import React, { useEffect, useState } from 'react';
//import './components/styles/EmployeeList.css';

import '../styles/EmployeeForm.css';


export default function EmployeeList({ onEdit }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    const res = await fetch('/api/employees');
    const data = await res.json();
    setEmployees(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await fetch(`/api/employees/${id}`, { method: 'DELETE' });
      fetchEmployees();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.employee_id}>
            <td>{emp.employee_id}</td>
            <td>{emp.first_name}</td>
            <td>{emp.last_name}</td>
            <td>{emp.email}</td>
            <td>{emp.phone_number}</td>
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
              <button onClick={() => handleDelete(emp.employee_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
