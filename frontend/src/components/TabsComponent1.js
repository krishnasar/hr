import React, { useState } from "react";
import CountriesForm from "./CountriesForm";
import LocationsForm from "./LocationForm";
import DepartmentsForm from "./DepartmentsForm";
import JobsForm from "./JobsForm";
import EmployeesForm from "./EmployeeForm";

const TabsComponent1 = () => {
  const [activeTab, setActiveTab] = useState("countries");

  const tabList = [
    { key: "countries", label: "Countries" },
    { key: "locations", label: "Locations" },
    { key: "departments", label: "Departments" },
    { key: "jobs", label: "Jobs" },
    { key: "employees", label: "Employees" },
    { key: "employees", label: "krishna" },
    { key: "employees", label: "yash" },
    { key: "employees", label: "Govind" },
    { key: "employees", label: "Shreyata" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "countries":
        return <CountriesForm />;
      case "locations":
        return <LocationsForm />;
      case "departments":
        return <DepartmentsForm />;
      case "jobs":
        return <JobsForm />;
      case "employees":
        return <EmployeesForm />;
      default:
        return null;
    }
  };

  const styles = {
    container: {
      maxWidth: "2000px",
      margin: "40px auto",
      padding: "20px",
      backgroundColor: "#f41127ff",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    tabList: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "25px",
      flexWrap: "wrap",
      backgroundColor: "yellow",
      width: "2000px",
    },
    tabButton: (isActive) => ({
      padding: "10px 20px",
      fontWeight: "600",
      borderRadius: "8px",
      border: "1.5px solid #cbd5e1", // light border
      backgroundColor: isActive ? "#0056b3" : "#1cd628ff", // darker blue for active
      color: isActive ? "#ffffff" : "#475569", // gray-blue text inactive
      boxShadow: isActive ? "0 2px 6px rgba(0, 86, 179, 0.4)" : "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      userSelect: "none",
    }),
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabList}>
        {tabList.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={styles.tabButton(activeTab === tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ backgroundColor: "yellowgreen" }}>{renderTabContent()}</div>
    </div>
  );
};

export default TabsComponent1;
