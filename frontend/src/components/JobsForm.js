import React, { useState } from 'react';

const JobsForm = () => {
  const [formData, setFormData] = useState({
    job_id: '',
    job_title: '',
    min_salary: '',
    max_salary: '',
  });

  const [errors, setErrors] = useState({});

  // Styles (defined separately in the same file)
  const styles = {
    form: {
      display: 'grid',
      gridTemplateColumns: '150px 200px 200px',
      gridGap: '10px 10px',
      alignItems: 'center',
      maxWidth: '600px',
      margin: '20px auto',
    },
    label: {
      fontWeight: 'bold',
    },
    input: {
      padding: '6px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    error: {
      color: 'red',
      fontSize: '0.9em',
    },
    button: {
      gridColumn: '1 / span 3',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.job_id.trim()) newErrors.job_id = 'Job ID is required';
    if (!formData.job_title.trim()) newErrors.job_title = 'Job title is required';

    if (formData.min_salary && isNaN(formData.min_salary))
      newErrors.min_salary = 'Min salary must be a number';

    if (formData.max_salary && isNaN(formData.max_salary))
      newErrors.max_salary = 'Max salary must be a number';

    if (
      formData.min_salary &&
      formData.max_salary &&
      parseInt(formData.min_salary) > parseInt(formData.max_salary)
    ) {
      newErrors.max_salary = 'Max salary must be greater than Min salary';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted:', formData);
      // reset or submit logic
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Job ID */}
      <label style={styles.label} htmlFor="job_id">Job ID:</label>
      <input
        style={styles.input}
        type="text"
        id="job_id"
        name="job_id"
        value={formData.job_id}
        onChange={handleChange}
      />
      <span style={styles.error}>{errors.job_id}</span>

      {/* Job Title */}
      <label style={styles.label} htmlFor="job_title">Job Title:</label>
      <input
        style={styles.input}
        type="text"
        id="job_title"
        name="job_title"
        value={formData.job_title}
        onChange={handleChange}
      />
      <span style={styles.error}>{errors.job_title}</span>

      {/* Min Salary */}
      <label style={styles.label} htmlFor="min_salary">Min Salary:</label>
      <input
        style={styles.input}
        type="text"
        id="min_salary"
        name="min_salary"
        value={formData.min_salary}
        onChange={handleChange}
      />
      <span style={styles.error}>{errors.min_salary}</span>

      {/* Max Salary */}
      <label style={styles.label} htmlFor="max_salary">Max Salary:</label>
      <input
        style={styles.input}
        type="text"
        id="max_salary"
        name="max_salary"
        value={formData.max_salary}
        onChange={handleChange}
      />
      <span style={styles.error}>{errors.max_salary}</span>

      {/* Submit */}
      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};

export default JobsForm;
