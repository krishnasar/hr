import React, { useState } from "react";

const LocationForm = () => {
  const [formData, setFormData] = useState({
    location_id: "",
    street_address: "",
    postal_code: "",
    city: "",
    state_province: "",
    country_id: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.location_id) {
      newErrors.location_id = "Location ID is required";
    } else if (isNaN(formData.location_id)) {
      newErrors.location_id = "Location ID must be a number";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (formData.country_id && formData.country_id.length !== 2) {
      newErrors.country_id = "Country ID must be 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      // handle form submission here (API call, etc.)
    }
  };

  return (
    <div style={styles.container}>
      <h2>Location Form</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Location ID", name: "location_id", type: "text" },
          { label: "Street Address", name: "street_address", type: "text" },
          { label: "Postal Code", name: "postal_code", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "State/Province", name: "state_province", type: "text" },
          { label: "Country ID", name: "country_id", type: "text" },
        ].map((field) => (
          <div key={field.name} style={styles.row}>
            <label style={styles.label}>{field.label}:</label>
            <input
              style={styles.input}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
            <span style={styles.error}>{errors[field.name]}</span>
          </div>
        ))}
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

// ✅ Styling object with CSS Grid and layout rules
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
    fontFamily: "Arial",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "200px 1fr 200px",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  error: {
    color: "red",
    fontSize: "0.9em",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default LocationForm;
