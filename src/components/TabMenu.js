import React from "react";
import "./style/TabMenu.css"; // Import the new CSS file

const TabMenu = ({ activeTab, onTabChange }) => {
  const tabs = [
    'Rails',
    'Trims',
    'Vertical Rod Device Internals',
    'Chassis',
    'Levers', // New tab
    'Mortise Exit Lockbodies', // New tab
  ];
  return (
    <div className="tab-menu-container">
      <div className="tab-menu-grid">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabMenu;