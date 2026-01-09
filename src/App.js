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
import SpindleKits from "./components/SpindleKits"; 
import LockingSlideKits from "./components/LockingSlideKits";
import NinetyFourHundredParts from "./components/9400Parts";
import ExtensionRods from "./components/ExtensionRods";
import AuxControlParts from "./components/AuxControlParts";
import ChatWidget from "./components/ChatWidget"; 

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
        <div className="homepage-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Sargent Part Number <span className="text-gradient">Lookup</span>
            </h1>
            <p className="hero-description">
              Streamline your workflow. Identify parts, configure specs, and generate precise order strings for Sargent hardware.
            </p>
            
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">1</div>
                <h3>Select Platform</h3>
                <p>Choose a category like <strong>Exit Devices</strong> from the top navigation bar.</p>
              </div>
              
              <div className="step-arrow"></div>
              
              <div className="step-card">
                <div className="step-icon">2</div>
                <h3>Configure Component</h3>
                <p>Select a specific part (e.g., <strong>Trims</strong>) to access its configuration form.</p>
              </div>
            </div>

            {/* AI CHATBOT PROMO */}
            <div className="ai-chatbot-promo">
              <p className="promo-text">
                Or give our <span className="text-gradient">AI Powered Tech Support Chatbot</span> a try!
              </p>
              <svg className="arrow-curve" viewBox="0 0 120 80">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#38bdf8', stopOpacity: 1 }} />
                  </linearGradient>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
                  </marker>
                </defs>
                <path 
                  d="M10,10 C60,10 90,30 110,70" 
                  fill="none" 
                  stroke="url(#grad1)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  markerEnd="url(#arrowhead)" 
                />
              </svg>
            </div>

          </div>
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
        return null;
      default:
        return (
            <div className="initial-load-message">
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
      <header className="header">
        <div className="navbar-top-section">
          <div className="logo-container">
            <img src={images.logo} alt="Sargent Logo" className="company-logo" />
            <h1 className="title">Part Number Lookup</h1>
          </div>
          <nav className="navbar-categories">
              {tabConfig.masterTabs.map(({ name }) => (
                  <button 
                      key={name} 
                      className={`navbar-category-button ${activeMasterTab === name ? 'active' : ''}`}
                      onClick={() => handleMasterTabChange(name)}
                  >
                      {name}
                  </button>
              ))}
          </nav>
        </div>
        <div className="navbar-messages-bar">
           <span className="navbar-message-note">Verify Part #'s with Sargent Mechanical TPS</span>
           <span className="navbar-message-star">★ = Universal Form</span>
        </div>
      </header>

      <TechSupportHubBanner />
      
      {activeMasterTab && (
        <nav className="sub-tabs-container" aria-label="Component Selection">
          <div className="sub-tabs-grid">
              {allVisibleSubTabs.map((tab) => (
                <button
                  key={tab.name}
                  className={`sub-tab ${tab.type === 'universal' ? 'universal-tab' : ''} ${activeSubTab === tab.name ? 'active' : ''}`}
                  onClick={() => handleSubTabChange(tab.name)}
                >
                  {tab.name}
                  {tab.type === 'universal' && <span className="universal-star">★</span>}
                </button>
              ))}
          </div>
        </nav>
      )}

      <main className="content-container">{renderContent()}</main>
      
      {/* GLOBAL CHAT WIDGET - Primary AI Interface */}
      <ChatWidget />
    </div>
  );
};

export default App;