import React from 'react';

const SettingsSection = ({ title, children }) => (
  <section
    aria-label={title}
    style={{
      width: "100%",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(139,92,246,0.2)",
      borderRadius: "16px",
      overflow: "hidden",
      marginBottom: "16px",
    }}
  >
    <header style={{
      borderBottom: "1px solid rgba(139,92,246,0.15)",
      padding: "16px 20px",
    }}>
      <h2 style={{
        color: "#e2e8f0",
        fontSize: "15px",
        fontWeight: "600",
        margin: 0,
      }}>
        {title}
      </h2>
    </header>
    <div style={{ padding: "4px 0" }}>
      {children}
    </div>
  </section>
);

export default SettingsSection;