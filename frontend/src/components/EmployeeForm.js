import React, { useState } from 'react';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
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
    department_id: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.employee_id) newErrors.employee_id = 'Employee ID is required.';
    if (!formData.last_name) newErrors.last_name = 'Last name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format.';
    if (!formData.hire_date) newErrors.hire_date = 'Hire date is required.';
    if (!formData.job_id) newErrors.job_id = 'Job ID is required.';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log('Form submitted successfully:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {Object.keys(formData).map((field) => (
        <div key={field} style={styles.formRow}>
          <label htmlFor={field} style={styles.label}>
            {field.replace(/_/g, ' ')}
          </label>
          <input
            type={field.includes('date') ? 'date' : 'text'}
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            style={styles.input}
          />
          <span style={styles.error}>{errors[field]}</span>
        </div>
      ))}
      <div style={styles.buttonRow}>
        <button type="submit" style={styles.button}>Submit</button>
      </div>
    </form>
  );
};

// 🔧 Styles (grid-based, inline but separated)
const styles = {
  form: {
    display: 'grid',
    gap: '12px',
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '150px 1fr 200px',
    alignItems: 'center',
    gap: '10px',
  },
  label: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  error: {
    color: 'red',
    fontSize: '0.9em',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

export default EmployeeForm;
