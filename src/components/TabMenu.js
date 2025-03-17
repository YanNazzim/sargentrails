import React from "react";
import "./style/TabMenu.css";

const TabMenu = ({
  masterTabs,
  activeMasterTab,
  onMasterTabChange,
  subTabs,
  universalTabs,
  activeSubTab,
  onSubTabChange
}) => {
  return (
    <div className="tab-menu-container">
      {/* Master Tabs Row */}
      <div className="master-tabs-row">
        {masterTabs.map((tab) => (
          <button
            key={tab}
            className={`master-tab ${activeMasterTab === tab ? 'active' : ''}`}
            onClick={() => onMasterTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Sub Tabs Grid */}
      <div className="sub-tabs-grid">
        {subTabs.map((tab) => (
          <button
            key={tab}
            className={`sub-tab ${activeSubTab === tab ? 'active' : ''}`}
            onClick={() => onSubTabChange(tab)}
          >
            {tab}
          </button>
        ))}
        {universalTabs.map((tab) => (
          <button
            key={tab}
            className={`sub-tab universal-tab ${activeSubTab === tab ? 'active' : ''}`}
            onClick={() => onSubTabChange(tab)}
          >
            <span className="universal-star">★</span>
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabMenu;