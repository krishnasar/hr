import React, { useState } from "react";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabList = [
    { key: "home", label: "Home" },
    { key: "profile", label: "Profile" },
    { key: "messages", label: "Messages" },
    { key: "settings", label: "Settings" },
    { key: "help", label: "Help" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <p>🏠 Welcome to the Home tab!</p>;
      case "profile":
        return <p>👤 This is your Profile tab.</p>;
      case "messages":
        return <p>📩 Here are your Messages.</p>;
      case "settings":
        return <p>⚙️ Adjust your Settings here.</p>;
      case "help":
        return <p>❓ How can we Help you?</p>;
      default:
        return <p>Choose a tab to display content.</p>;
    }
  };

  return (
    <div style={styles.container}>
      <h2>📌 React Multiple Tabs Example</h2>
      <div style={styles.tabBar}>
        {tabList.map((tab) => (
          <button
            key={tab.key}
            style={{
              ...styles.tab,
              ...(activeTab === tab.key ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={styles.contentArea}>{renderContent()}</div>
    </div>
  );
};

// 🎨 Simple inline styles
const styles = {
  container: {
    fontFamily: "Arial",
    maxWidth: "600px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
  },
  tabBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    cursor: "pointer",
    border: "1px solid #ccc",
    backgroundColor: "#f8f8f8",
    borderRadius: "4px",
    transition: "0.3s",
  },
  activeTab: {
    backgroundColor: "#007bff",
    color: "#fff",
    borderColor: "#007bff",
  },
  contentArea: {
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "4px",
    backgroundColor: "#fafafa",
  },
};

export default TabsComponent;
