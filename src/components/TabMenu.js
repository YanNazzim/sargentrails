import React, { useState, useEffect } from "react";

const TabMenu = ({
  masterTabs,
  activeMasterTab,
  onMasterTabChange,
  subTabs,
  universalTabs,
  activeSubTab,
  onSubTabChange,
}) => {
  const [sliderPosition, setSliderPosition] = useState(0);

  useEffect(() => {
    // Calculate the slider position based on the active master tab
    const index = masterTabs.indexOf(activeMasterTab);
    setSliderPosition(index * 100); // Move the slider to the correct position
  }, [activeMasterTab, masterTabs]);

  return (
    <div className="tab-menu-container">
      {/* Master Tabs Row */}
      <div className="master-tabs-row">
        <div className="slider" style={{ transform: `translateX(${sliderPosition}%)` }} />
        {masterTabs.map((tab) => (
          <button
            key={tab}
            className={`master-tab ${activeMasterTab === tab ? "active" : ""}`}
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
    </div>
  );
};

export default TabMenu;