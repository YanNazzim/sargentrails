// src/App.js
import React, { useState } from "react";
import Rails from "./components/RailsForm";
import Levers from "./components/Levers";
import MortiseExitLockbodies from "./components/MortiseExitLockbodies";
import Trims from "./components/TrimsForm";
import Rods from "./components/RodsForm";
import Chassis from "./components/ChassisForm";
import MountingPosts from "./components/MountingPosts";
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
import GlobalSearch from "./components/GlobalSearch";
import Modal from './components/Modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Centralized state for form data
  const [formData, setFormData] = useState({
    rails: null,
    trims: null,
    levers: null,
    chassis: null,
    // Add other forms here as they are integrated
  });

  const handleMasterTabChange = (masterTab) => {
    setActiveMasterTab(masterTab);
    setActiveSubTab(null);
    setFormData({ rails: null, trims: null, levers: null, chassis: null }); // Reset all form data
  };

  const handleSubTabChange = (subTab) => {
    if (subTab === "Cylinders") {
        // Redirect to the external tool in a new tab/window
        window.open(CYLINDERS_TOOL_URL, '_blank');
        // Do not update the activeSubTab state, keeping the current view active.
        return; 
    }

    setActiveSubTab(subTab);
    setFormData({ rails: null, trims: null, levers: null, chassis: null }); // Reset all form data
  };

  const handleSearchResultClick = (result) => {
    const { category, subcategory, description } = result;
    
    // Mapping from search data 'category' to master/sub tabs and form data key
    const formToTabMap = {
      "Exit Device Chassis (Rail Head)": { master: "Exit Devices", sub: "Chassis (Rail Head)", form: "chassis" },
      "Exit Trims (Full Output)": { master: "Exit Devices", sub: "Trims", form: "trims" },
      "Levers": { master: null, sub: "Lever Handles Only", form: "levers" } 
      // Add other mappings here as you integrate more forms
    };

    if (category in formToTabMap) {
      const { master, sub, form } = formToTabMap[category];
      setActiveMasterTab(master);
      setActiveSubTab(sub);

      // Prepare data for pre-filling the form
      let prefillData = {};
      if (form === 'chassis') {
        prefillData = { device: subcategory };
      } else if (form === 'trims') {
        const [series, device] = subcategory.split(' ');
        const descParts = description.split(' ');
        const functionCodeMatch = descParts[0].match(/F(\d+)/);
        const fullTrimLever = descParts[2];
        prefillData = {
          series: series || "",
          device: device || "",
          functionCode: functionCodeMatch ? functionCodeMatch[1] : "",
          outsideFunctionCode: "", 
          insideFunctionCode: "", 
          cylinderPrefixes: [],
          electricalPrefixes: [],
          doorThickness: descParts[5] || "",
          trim: fullTrimLever ? fullTrimLever.substring(0, fullTrimLever.length - 1) : "",
          leverStyle: fullTrimLever ? fullTrimLever.slice(-1) : "",
          finish: descParts[4] || "",
          handing: descParts[3] || "",
        };
      } else if (form === 'levers') {
        prefillData = { leverStyle: result.search_key };
      }
      
      // Update the centralized form data state
      setFormData(prevData => ({
        ...prevData,
        [form]: prefillData
      }));
      
    } else {
      // If no direct form mapping, open a modal as a fallback
      setModalData(result);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
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
        return <Rails initialData={formData.rails} />;
      case "Trims":
        return <Trims initialData={formData.trims} />;
      case "Lever Handles Only":
        return <Levers initialData={formData.levers} />;
      case "Chassis (Rail Head)":
        return <Chassis initialData={formData.chassis} />;
      case "Mortise Spindles":
        return <MortiseSpindles />;
      case "Mounting Posts":
        return <MountingPosts />;
      case "Faceplates":
        return <Faceplates />;
      case "Trim Kits":
        return <MortiseTrimKits />;
      case "End Caps":
        return <EndCaps />;
      case "Vertical Rod Device Internals":
        return <Rods />;
      case "Mortise Exit Lockbodies":
        return <MortiseExitLockbodies />;
      case "Cylinders":
        // Fallback message in case the state still somehow gets set to 'Cylinders'
        return (
            <div className="initial-load-message content-transition">
                <h2 className="initial-title">Redirecting to External Cylinders Tool...</h2>
                <p className="initial-instruction">If your browser does not redirect automatically, please click <a href={CYLINDERS_TOOL_URL} target="_blank" rel="noopener noreferrer">here</a>.</p>
            </div>
        );
      case "Latches":
        return <Latches />;
      case "Tailpieces":
        return <Tailpieces />;
      case "Lockbodies":
        return <CylindricalLockbodies />;
      case "Strikes":
        return <Strikes />;
      case "Mortise Lockbodies":
        return <MortiseLockbodies />;
      default:
        return (
            <div className="initial-load-message content-transition">
              <h2 className="initial-title">No matching component found for: {activeSubTab}</h2>
              <p className="initial-instruction">Please select a valid combination from the menus.</p>
            </div>
        );
    }
  };

  const activeMasterSubTabs = tabConfig.masterTabs.find((m) => m.name === activeMasterTab)?.subTabs || [];
  const categoryNames = tabConfig.masterTabs.map(m => m.name);
  
  const subTabs = activeMasterTab
    ? activeMasterSubTabs.map((tab) => ({ type: 'sub', name: tab }))
    : [];
  
  const universalTabs = tabConfig.universalTabs.map((tab) => ({ type: 'universal', name: tab }));

  const allVisibleSubTabs = [...subTabs, ...universalTabs];

  return (
    <div className="app">
      <div className="header">
        <div className="navbar-top-section">
          <img src={images.logo} alt="Company Logo" className="company-logo" />
          
          {/* MODIFIED: Container for clickable category buttons */}
          <div className="navbar-categories">
              {categoryNames.map(name => (
                  <button 
                      key={name} 
                      className={`navbar-category-button ${activeMasterTab === name ? 'active' : ''}`}
                      onClick={() => handleMasterTabChange(name)}
                  >
                      {name}
                  </button>
              ))}
          </div>
          
          <h1 className="title">
            Sargent Part Number Lookup Tool
          </h1>
        </div>
        <div className="navbar-messages-bar">
           <h3 className="navbar-message-note">For best results, Verify Part #'s with Sargent Mechanical TPS</h3>
           <h3 className="navbar-message-star">★ = Same Form Used Across All Device Platforms (Universal Form)</h3>
        </div>
      </div>

      {/* MOVED OUTSIDE HEADER FOR FIXED POSITIONING */}
      <GlobalSearch onSearchExecuted={handleSearchResultClick} />
      
      {/* NEW: Directly render the sub-tab bar based on selected master tab */}
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

      <Modal show={isModalOpen} onClose={closeModal} data={modalData} />
    </div>
  );
};

export default App;