import React, { useState } from "react";

const DepartmentsForm = () => {
  const [formData, setFormData] = useState({
    department_id: "",
    department_name: "",
    manager_id: "",
    location_id: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!formData.department_id || isNaN(formData.department_id)) {
      err.department_id = "Valid Department ID required";
    }
    if (!formData.department_name.trim()) {
      err.department_name = "Department name is required";
    }
    if (formData.manager_id && isNaN(formData.manager_id)) {
      err.manager_id = "Manager ID must be a number";
    }
    if (!formData.location_id || isNaN(formData.location_id)) {
      err.location_id = "Valid Location ID required";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully", formData);
      // Perform API call or further actions here
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {[
        { label: "Department ID", name: "department_id", type: "text" },
        { label: "Department Name", name: "department_name", type: "text" },
        { label: "Manager ID", name: "manager_id", type: "text" },
        { label: "Location ID", name: "location_id", type: "text" },
      ].map(({ label, name, type }) => (
        <div key={name} style={styles.row}>
          <label htmlFor={name} style={styles.label}>{label}:</label>
          <input
            type={type}
            name={name}
            id={name}
            value={formData[name]}
            onChange={handleChange}
            style={styles.input}
          />
          <span style={styles.error}>{errors[name]}</span>
        </div>
      ))}

      <div style={styles.buttonRow}>
        <button type="submit" style={styles.button}>Submit</button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: "grid",
    gap: "12px",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "150px 1fr 200px",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "6px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  buttonRow: {
    gridColumn: "1 / -1",
    textAlign: "center",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default DepartmentsForm;
