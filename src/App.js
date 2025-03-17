import React, { useState } from "react";
import Rails from "./components/RailsForm";
import Levers from "./components/Levers";
import MortiseExitLockbodies from "./components/MortiseExitLockbodies";
import Trims from "./components/TrimsForm";
import Rods from "./components/RodsForm";
import Chassis from "./components/ChassisForm";
import TabMenu from "./components/TabMenu";
import "./App.css";
import images from "./images";

const App = () => {
  const tabConfig = {
    masterTabs: [
      {
        name: "Exits",
        subTabs: [
          "Rails",
          "Chassis (Rail Head)",
          "Trims",
          "Mortise Exit Lockbodies",
          "Vertical Rod Device Internals"
        ]
      },
      {
        name: "Bored Locks",
        subTabs: [
          "Cylinders",
          "Deadbolts",
          "Mortise Lock Trim"
        ]
      },
      {
        name: "Mortise",
        subTabs: [
          "Mortise Case",
          "Mortise Trim"
        ]
      }
    ],
    universalTabs: ["Lever Handles Only"]
  };

  const [activeMasterTab, setActiveMasterTab] = useState(tabConfig.masterTabs[0].name);
  const [activeSubTab, setActiveSubTab] = useState(tabConfig.masterTabs[0].subTabs[0]);

  const handleMasterTabChange = (masterTab) => {
    setActiveMasterTab(masterTab);
    const newMaster = tabConfig.masterTabs.find(m => m.name === masterTab);
    setActiveSubTab(newMaster.subTabs[0]);
  };

  const handleSubTabChange = (subTab) => {
    setActiveSubTab(subTab);
  };

  const renderContent = () => {
    switch (activeSubTab) {
      case "Rails":
        return <Rails />;
      case "Trims":
        return <Trims />;
      case "Vertical Rod Device Internals":
        return <Rods />;
      case "Chassis (Rail Head)":
        return <Chassis />;
      case "Lever Handles Only":
        return <Levers />;
      case "Mortise Exit Lockbodies":
        return <MortiseExitLockbodies />;
      // Add cases for new sub-tabs
      case "Cylinders":
        return <div>Cylinders Component</div>;
      case "Deadbolts":
        return <div>Deadbolts Component</div>;
      case "Mortise Lock Trim":
        return <div>Mortise Lock Trim Component</div>;
      case "Mortise Case":
        return <div>Mortise Case Component</div>;
      case "Mortise Trim":
        return <div>Mortise Trim Component</div>;
      default:
        return <Rails />;
    }
  };

  return (
    <div className="app">
      <div className="header">
        <img src={images.logo} alt="Company Logo" className="company-logo" />
        <h1 className="title">
          Sargent Part Number Lookup Tool <br />
        </h1>
        <h3>For best results, Verify Part #'s with Sargent Mechanical TPS</h3>
      </div>

      <div className="tab-container" aria-live="polite">
        <TabMenu
          masterTabs={tabConfig.masterTabs.map(m => m.name)}
          activeMasterTab={activeMasterTab}
          onMasterTabChange={handleMasterTabChange}
          subTabs={tabConfig.masterTabs.find(m => m.name === activeMasterTab).subTabs}
          universalTabs={tabConfig.universalTabs}
          activeSubTab={activeSubTab}
          onSubTabChange={handleSubTabChange}
        />
      </div>
      
      <div className="content-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;