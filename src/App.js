import React, { useState } from "react";
import Rails from "./components/RailsForm";
import Levers from "./components/Levers";
import MortiseExitLockbodies from "./components/MortiseExitLockbodies";
import Trims from "./components/TrimsForm";
import Rods from "./components/RodsForm"; // You'll need to create this component
import TabMenu from "./components/TabMenu";
import Chassis from "./components/ChassisForm";
import "./App.css";
import images from "./images"; // Adjust the path as needed

const App = () => {
  const [activeTab, setActiveTab] = useState("Rails");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
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
      default:
        return <Rails />;
    }
  };

  return (
    <div className="app">
      {/* Corrected Header Section */}
      <div className="header">
        <img src={images.logo} alt="Sargent Logo" className="company-logo" />
        <h1 className="title">
          Sargent Part Number Lookup Tool <br />
        </h1>
        <h3>For best results, Verify Part #'s with Sargent Mechanical TPS</h3>
      </div>

      <div className="tab-container" aria-live="polite">
        <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      {renderContent()}
    </div>
  );
};

export default App;
