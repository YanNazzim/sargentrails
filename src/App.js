import React, { useState } from "react";
import Rails from "./components/RailsForm";
import Trims from "./components/TrimsForm";
import Rods from "./components/RodsForm"; // You'll need to create this component
import TabMenu from "./components/TabMenu"; 
import Chassis from "./components/ChassisForm"
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
        case "Chassis":
          return <Chassis />;
      default:
        return <Rails />;
    }
  };

  return (
    <div className="app">
      {/* Corrected Header Section */}
      <div className="header">
        <img src={images.logo} alt="Sargent Logo" className="company-logo" />
        <h1 className="title">Sargent Part Number Lookup Tool <br /> (Bored/Mortise Coming Soon)</h1>
      </div>

      <div className="tab-container" aria-live="polite">
        <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      {renderContent()}
    </div>
  );
};

export default App;
