// src/App.js
import React, { useState } from "react";
import Rails from "./components/RailsForm";
import Levers from "./components/Levers";
import MortiseExitLockbodies from "./components/MortiseExitLockbodies";
import Trims from "./components/TrimsForm";
import Rods from "./components/RodsForm";
import Chassis from "./components/ChassisForm";
import MountingPosts from "./components/MountingPosts";
import TechSupportHubBanner from './components/TechSupportHubBanner'; 
import "./App.css";
import images from "./images";
import Latches from "./components/Latches";
import MortiseSpindles from "./components/MortiseSpindles";
import Faceplates from "./components/faceplates";
import MortiseLockbodies from "./components/MortiseLockbodies";
import MortiseTrimKits from "./components/MortiseTrimKits";
import Strikes from "./components/Strikes";
import EndCaps from "./components/EndCaps";
import Tailpieces from "./components/Tailpieces";
import CylindricalLockbodies from "./components/CylindricalLockbodies";
// Removed unused Modal import
import SpindleKits from "./components/SpindleKits"; 
import LockingSlideKits from "./components/LockingSlideKits";
import NinetyFourHundredParts from "./components/9400Parts";
import ExtensionRods from "./components/ExtensionRods";
import AuxControlParts from "./components/AuxControlParts";
import ChatWidget from "./components/ChatWidget"; 

// Define the external tool URL
const CYLINDERS_TOOL_URL = "https://sargent-cylinders.netlify.app/";

const App = () => {
  const tabConfig = {
    masterTabs: [
      {
        name: "Exit Devices",
        subTabs: [
          "Rails/Crossbars",
          "End Caps",
          "Chassis (Rail Head)",
          "Trims",
          "Mortise Exit Lockbodies",
          "Vertical Rod Device Internals",
          "Spindle Retrofit Kits",
          "Locking Slide Conversion Kits",
          "9400 CVR Parts",
          "Extension Rods",
          "Aux Control Parts",
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
        ],
      },
      {
        name: "Bored Locks",
        subTabs: ["Lockbodies", "Latches", "Tailpieces"],
      },
    ],
    universalTabs: ["Lever Handles Only", "Cylinders", "Strikes"],
  };

  const [activeMasterTab, setActiveMasterTab] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState(null);
  
  // REMOVED: Unused Modal state (isModalOpen, modalData)

  // Centralized state for form data
  const [formData, setFormData] = useState({
    rails: null,
    trims: null,
    levers: null,
    chassis: null,
    latches: null,
    mortiseLockbodies: null,
    cylindricalLockbodies: null,
    mortiseSpindles: null,
    rods: null,
    endCaps: null,
    mortiseExitLockbodies: null,
    tailpieces: null,
  });
  
  const resetAllForms = () => {
    setFormData({
        rails: null,
        trims: null,
        levers: null,
        chassis: null,
        latches: null,
        mortiseLockbodies: null,
        cylindricalLockbodies: null,
        mortiseSpindles: null,
        rods: null,
        endCaps: null,
        mortiseExitLockbodies: null,
        tailpieces: null,
    });
  };

  const handleMasterTabChange = (masterTab) => {
    setActiveMasterTab(masterTab);
    setActiveSubTab(null);
    resetAllForms();
  };

  const handleSubTabChange = (subTab) => {
    if (subTab === "Cylinders") {
        window.open(CYLINDERS_TOOL_URL, '_blank');
        return; 
    }
    setActiveSubTab(subTab);
    resetAllForms();
  };

  const renderContent = () => {
    if (!activeSubTab) {
      return (
        <div className="initial-load-message content-transition">
          <h2 className="initial-title">Welcome to the Sargent Part Number Lookup Tool.</h2>
          <p className="initial-instruction">Please select a **Device Platform** first (e.g., "Exit Devices," "Mortise Locks") from the clickable categories in the header, and then select a **Specific Part** to get started.</p>
        </div>
      );
    }

    switch (activeSubTab) {
      case "Rails/Crossbars":
        return <Rails />;
      case "Trims":
        return <Trims initialData={formData.trims} />;
      case "Lever Handles Only":
        return <Levers initialData={formData.levers} />;
      case "Chassis (Rail Head)":
        return <Chassis initialData={formData.chassis} />;
      case "Mortise Spindles":
        return <MortiseSpindles initialData={formData.mortiseSpindles} />;
      case "Mounting Posts":
        return <MountingPosts />;
      case "Faceplates":
        return <Faceplates />;
      case "Trim Kits":
        return <MortiseTrimKits />;
      case "End Caps":
        return <EndCaps initialData={formData.endCaps} />;
      case "Vertical Rod Device Internals":
        return <Rods initialData={formData.rods} />;
      case "Mortise Exit Lockbodies":
        return <MortiseExitLockbodies initialData={formData.mortiseExitLockbodies} />;
      case "Latches":
        return <Latches initialData={formData.latches} />;
      case "Tailpieces":
        return <Tailpieces initialData={formData.tailpieces} />;
      case "Lockbodies":
        return <CylindricalLockbodies initialData={formData.cylindricalLockbodies} />;
      case "Strikes":
        return <Strikes />;
      case "Mortise Lockbodies":
        return <MortiseLockbodies initialData={formData.mortiseLockbodies} />;
      case "Spindle Retrofit Kits":
          return <SpindleKits />;
      case "Locking Slide Conversion Kits":
          return <LockingSlideKits />;
      case "9400 CVR Parts":
          return <NinetyFourHundredParts />;
      case "Extension Rods":
          return <ExtensionRods />;
      case "Aux Control Parts":
          return <AuxControlParts />;
      case "Cylinders":
        return (
            <div className="initial-load-message content-transition">
                <h2 className="initial-title">Redirecting to External Cylinders Tool...</h2>
                <p className="initial-instruction">If your browser does not redirect automatically, please click <a href={CYLINDERS_TOOL_URL} target="_blank" rel="noopener noreferrer">here</a>.</p>
            </div>
        );
      default:
        return (
            <div className="initial-load-message content-transition">
              <h2 className="initial-title">No matching component found for: {activeSubTab}</h2>
              <p className="initial-instruction">Please select a valid combination from the menus.</p>
            </div>
        );
    }
  };

  const allVisibleSubTabs = [
    ...(tabConfig.masterTabs.find((m) => m.name === activeMasterTab)?.subTabs.map(tab => ({ type: 'sub', name: tab })) || []),
    ...tabConfig.universalTabs.map((tab) => ({ type: 'universal', name: tab }))
  ];

  return (
    <div className="app">
      <div className="header">
        <div className="navbar-top-section">
          <div className="logo-container">
            <img src={images.logo} alt="Company Logo" className="company-logo" />
            <h1 className="title">Sargent Part Number Lookup</h1>
          </div>
          <div className="navbar-categories">
              {tabConfig.masterTabs.map(({ name }) => (
                  <button 
                      key={name} 
                      className={`navbar-category-button ${activeMasterTab === name ? 'active' : ''}`}
                      onClick={() => handleMasterTabChange(name)}
                  >
                      {name}
                  </button>
              ))}
          </div>
        </div>
        <div className="navbar-messages-bar">
           <h3 className="navbar-message-note">Verify Part #'s with Sargent Mechanical TPS</h3>
           <h3 className="navbar-message-star">★ = Universal Form</h3>
        </div>
      </div>

      <TechSupportHubBanner />
      
      {/* REMOVED: <Modal /> component */}
      
      {activeMasterTab && (
        <div className="tab-container sub-tabs-container" aria-live="polite">
          <div className="sub-tabs-grid">
              {allVisibleSubTabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`sub-tab ${tab.type === 'universal' ? 'universal-tab' : ''} ${activeSubTab === tab.name ? 'active' : ''}`}
                  onClick={() => handleSubTabChange(tab.name)}
                >
                  {tab.type === 'universal' && <span className="universal-star">★</span>}
                  {tab.name}
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="content-container">{renderContent()}</div>
      
      {/* GLOBAL CHAT WIDGET - Primary AI Interface */}
      <ChatWidget />
    </div>
  );
};

export default App;