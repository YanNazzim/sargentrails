import React, { useState } from "react";
import Rails from "./components/RailsForm";
import Levers from "./components/Levers";
import MortiseExitLockbodies from "./components/MortiseExitLockbodies";
import Trims from "./components/TrimsForm";
import Rods from "./components/RodsForm";
import Chassis from "./components/ChassisForm";
import Cylinders from "./components/Cylinders";
import MountingPosts from "./components/MountingPosts"; // Import the new component
import TabMenu from "./components/TabMenu";
import "./App.css";
import images from "./images";
import Latches from "./components/Latches";
import MortiseSpindles from "./components/MortiseSpindles";
import Faceplates from "./components/faceplates"
import MortiseLockbodies from "./components/MortiseLockbodies";
import MortiseTrimKits from "./components/MortiseTrimKits";
import Strikes from "./components/Strikes";

const App = () => {
  const tabConfig = {
    masterTabs: [
      {
        name: "Exit Devices",
        subTabs: [
          "Rails",
          "Chassis (Rail Head)",
          "Trims",
          "Mortise Exit Lockbodies",
          "Vertical Rod Device Internals",
        ],
      },

      {
        name: "Mortise Locks",
        subTabs: [
          "Mortise Spindles",
          "Mounting Posts",
          "Faceplates",
          "Mortise Lockbodies",
          "Trim Kits",
          "Thumbturns",
          "Emergency Releases",
        ],
      },
      {
        name: "Bored Locks",
        subTabs: ["Cylindrical Lockbodies", "Latches", "Tailpieces"],
      },
    ],
    universalTabs: ["Lever Handles Only", "Cylinders", "Strikes"],
  };

  const [activeMasterTab, setActiveMasterTab] = useState(
    tabConfig.masterTabs[0].name
  );
  const [activeSubTab, setActiveSubTab] = useState(
    tabConfig.masterTabs[0].subTabs[0]
  );

  const handleMasterTabChange = (masterTab) => {
    setActiveMasterTab(masterTab);
    const newMaster = tabConfig.masterTabs.find((m) => m.name === masterTab);
    setActiveSubTab(newMaster.subTabs[0]);
  };

  const handleSubTabChange = (subTab) => {
    setActiveSubTab(subTab);
  };

  const renderContent = () => {
    switch (activeSubTab) {
    case "Mortise Spindles": 
      return <MortiseSpindles />;
    case "Mounting Posts":
      return <MountingPosts />; // Render the new component
      case "Faceplates":
      return <Faceplates />;
      case "Trim Kits":
        return <MortiseTrimKits/>;
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
      case "Cylinders":
        return <Cylinders />;
      case "Latches":
        return <Latches />;
      case "Tailpieces":
        return (
          <div className="content-transition">
            <h1 className="Heading">
              Tailpieces <br /> 🛑 Dont use this page yet! 🛑
            </h1>
            {/* Add the GIF here */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              {" "}
              {/* Optional centering and margin */}
              <img
                src={images.stop}
                alt="Cylinder animation"
                style={{ height: "200px", borderRadius: "8px" }} // Optional styling
              />
              <img
                src={images.UnderConstruction}
                alt="Cylinder animation"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }} // Optional styling
              />
            </div>
          </div>
        );
      case "Cylindrical Lockbodies":
        return (
          <div className="content-transition">
            <h1 className="Heading">
              Cylindrical Lockbodies <br /> 🛑 Dont use this page yet! 🛑
            </h1>
            {/* Add the GIF here */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              {" "}
              {/* Optional centering and margin */}
              <img
                src={images.stop}
                alt="Cylinder animation"
                style={{ height: "200px", borderRadius: "8px" }} // Optional styling
              />
              <img
                src={images.UnderConstruction}
                alt="Cylinder animation"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }} // Optional styling
              />
            </div>
          </div>
        );
    case "Strikes":
      return <Strikes />;
      case "Thumbturns":
        return (
          <div className="content-transition">
            <h1 className="Heading">
              Thumbturns <br /> 🛑 Dont use this page yet! 🛑
            </h1>
            {/* Add the GIF here */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              {" "}
              {/* Optional centering and margin */}
              <img
                src={images.stop}
                alt="Cylinder animation"
                style={{ height: "200px", borderRadius: "8px" }} // Optional styling
              />
              <img
                src={images.UnderConstruction}
                alt="Cylinder animation"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }} // Optional styling
              />
            </div>
          </div>
        );
      case "Emergency Releases":
        return (
          <div className="content-transition">
            <h1 className="Heading">
              Eergency Releases <br /> 🛑 Dont use this page yet! 🛑
            </h1>
            {/* Add the GIF here */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              {" "}
              {/* Optional centering and margin */}
              <img
                src={images.stop}
                alt="Cylinder animation"
                style={{ height: "200px", borderRadius: "8px" }} // Optional styling
              />
              <img
                src={images.UnderConstruction}
                alt="Cylinder animation"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }} // Optional styling
              />
            </div>
          </div>
        );
      case "Mortise Lockbodies":
        return <MortiseLockbodies />;
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
        <h3 style={{ textAlign: "center" }}>For best results, Verify Part #'s with Sargent Mechanical TPS</h3>
        <h3 style={{ color: "#ffd700", textAlign: "center" }}>
          ★ = Same Form Used Across All Device Platforms (Universal Form)
        </h3>
      </div>

      <div className="tab-container" aria-live="polite">
        <TabMenu
          masterTabs={tabConfig.masterTabs.map((m) => m.name)}
          activeMasterTab={activeMasterTab}
          onMasterTabChange={handleMasterTabChange}
          subTabs={
            tabConfig.masterTabs.find((m) => m.name === activeMasterTab).subTabs
          }
          universalTabs={tabConfig.universalTabs}
          activeSubTab={activeSubTab}
          onSubTabChange={handleSubTabChange}
        />
      </div>

      <div className="content-container">{renderContent()}</div>
    </div>
  );
};

export default App;