import React, { useState } from "react";

const CountriesForm = () => {
  const [formData, setFormData] = useState({
    country_id: "",
    country_name: "",
    region_id: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.country_id) {
      newErrors.country_id = "Country ID is required";
    } else if (formData.country_id.length !== 2) {
      newErrors.country_id = "Must be exactly 2 characters";
    }

    if (!formData.country_name) {
      newErrors.country_name = "Country Name is required";
    }

    if (!formData.region_id) {
      newErrors.region_id = "Region ID is required";
    } else if (!/^\d+$/.test(formData.region_id)) {
      newErrors.region_id = "Region ID must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      // submit logic here
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.row}>
        <label htmlFor="country_id" style={styles.label}>Country ID:</label>
        <input
          type="text"
          name="country_id"
          id="country_id"
          maxLength={2}
          value={formData.country_id}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.country_id}</span>
      </div>

      <div style={styles.row}>
        <label htmlFor="country_name" style={styles.label}>Country Name:</label>
        <input
          type="text"
          name="country_name"
          id="country_name"
          value={formData.country_name}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.country_name}</span>
      </div>

      <div style={styles.row}>
        <label htmlFor="region_id" style={styles.label}>Region ID:</label>
        <input
          type="text"
          name="region_id"
          id="region_id"
          value={formData.region_id}
          onChange={handleChange}
          style={styles.input}
        />
        <span style={styles.error}>{errors.region_id}</span>
      </div>

      <div style={styles.buttonRow}>
        <button type="submit" style={styles.button}>Submit</button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: "grid",
    gap: "10px",
    padding: "20px",
    maxWidth: "600px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  buttonRow: {
    gridColumn: "1 / -1",
    textAlign: "right",
  },
  button: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CountriesForm;
