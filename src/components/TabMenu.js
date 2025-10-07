import React from "react";

const TabMenu = ({
  masterTabs,
  activeMasterTab,
  onMasterTabChange,
  subTabs,
  universalTabs,
  activeSubTab,
  onSubTabChange,
}) => {
  // Removed sliderPosition state and useEffect hook, and slider element.

  return (
    <div className="tab-menu-container">
      {/* Master Tabs Row - Primary Navigation */}
      <div className="master-tabs-row">
        {masterTabs.map((tab) => (
          <button
            key={tab}
            // Use 'master-tab' class name and 'active' modifier
            className={`master-tab ${activeMasterTab === tab ? "active" : ""}`}
            onClick={() => onMasterTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub Tabs Grid - Secondary Navigation (Only render if a master tab is active) */}
      {/* This ensures the user is forced to choose a platform first. */}
      {activeMasterTab && (
        <div className="sub-tabs-grid">
          {subTabs.map((tab) => (
            <button
              key={tab}
              className={`sub-tab ${activeSubTab === tab ? "active" : ""}`}
              onClick={() => onSubTabChange(tab)}
            >
              {tab}
            </button>
          ))}
          {universalTabs.map((tab) => (
            <button
              key={tab}
              className={`sub-tab universal-tab ${activeSubTab === tab ? "active" : ""}`}
              onClick={() => onSubTabChange(tab)}
            >
              <span className="universal-star">★</span>
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabMenu;