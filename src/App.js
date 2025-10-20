// src/App.js
import React, { useState, useEffect } from "react";
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
import Modal from "./components/Modal"; 
import SpindleKits from "./components/SpindleKits"; 
import LockingSlideKits from "./components/LockingSlideKits";
import NinetyFourHundredParts from "./components/9400Parts";
import ExtensionRods from "./components/ExtensionRods";
import AuxControlParts from "./components/AuxControlParts"; // <--- NEW IMPORT

// Define the external tool URL
const CYLINDERS_TOOL_URL = "https://sargent-cylinders.netlify.app/";

const App = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cloud.google.com/ai/gen-app-builder/client?hl=en_US";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
          "Aux Control Parts", // <--- ADDED NEW SUBTAB
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
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- NEW: State for modal
  const [modalData, setModalData] = useState(null); // <-- NEW: State for modal data

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

  const handleSearchResultClick = (result) => {
    if (result.category === "Exit Device Rails") {
        setModalData(result);
        setIsModalOpen(true);
        return; // Stop further execution
    }

    const { category, subcategory, description, search_key, path } = result;
    
    const formToTabMap = {
      // Existing Mappings
      "Exit Device Chassis (Rail Head)": { master: "Exit Devices", sub: "Chassis (Rail Head)", form: "chassis" },
      "Exit Trims (Full Output)": { master: "Exit Devices", sub: "Trims", form: "trims" },
      "Levers": { master: null, sub: "Lever Handles Only", form: "levers" },
      // New Mappings
      "Bored Lock Latches": { master: "Bored Locks", sub: "Latches", form: "latches" },
      "Mortise Lockbodies": { master: "Mortise Locks", sub: "Mortise Lockbodies", form: "mortiseLockbodies" },
      "Bored Lockbodies (10X)": { master: "Bored Locks", sub: "Lockbodies", form: "cylindricalLockbodies" },
      "Mortise Spindles": { master: "Mortise Locks", sub: "Mortise Spindles", form: "mortiseSpindles" },
      "Vertical Rod Device Internals": { master: "Exit Devices", sub: "Vertical Rod Device Internals", form: "rods" },
      "Exit Trims": { master: "Exit Devices", sub: "Trims", form: "trims" },
      "Exit Device End Caps": { master: "Exit Devices", sub: "End Caps", form: "endCaps" },
      "Mortise Exit Lockbodies (80/PE80)": { master: "Exit Devices", sub: "Mortise Exit Lockbodies", form: "mortiseExitLockbodies" },
      "Bored Lock Tailpieces": { master: "Bored Locks", sub: "Tailpieces", form: "tailpieces" },
    };

    if (category in formToTabMap) {
      const { master, sub, form } = formToTabMap[category];
      
      resetAllForms(); // Clear all previous form data
      
      setActiveMasterTab(master);
      setActiveSubTab(sub);

      let prefillData = {};
      // Logic to prepare prefillData based on the category
      switch(category) {
        case "Exit Device Chassis (Rail Head)":
          prefillData = { device: subcategory };
          break;
        case "Exit Trims (Full Output)":
        case "Exit Trims": {
          const [series, device, functionCode] = (search_key.startsWith("F") ? description : search_key).split(/[\s-]+/);
          prefillData = {
            series: series || "",
            device: device || "",
            functionCode: functionCode ? functionCode.replace('F','') : "",
          };
          break;
        }
        case "Levers":
          prefillData = { leverStyle: result.search_key };
          break;
        case "Bored Lock Latches":
          prefillData = { series: subcategory, latchType: search_key };
          break;
        case "Mortise Lockbodies":
          prefillData = { functionCode: search_key };
          break;
        case "Bored Lockbodies (10X)": {
          const parts = description.split(' | ');
          if (parts.length === 4) {
              prefillData = {
                  function: parts[0],
                  type: parts[1],
                  doorThickness: parts[2],
                  leverType: parts[3].replace('Lever: ', ''),
              };
          }
          break;
        }
        case "Mortise Spindles":
          prefillData = { trimType: subcategory, doorThickness: search_key };
          break;
        case "Vertical Rod Device Internals":
          prefillData = { device: search_key.split('_')[0] };
          break;
        case "Exit Device End Caps": {
            const prefixCode = description.split(' - ')[0];
            prefillData = { series: subcategory, prefix: prefixCode !== 'Standard' ? prefixCode : null };
            break;
        }
        case "Mortise Exit Lockbodies (80/PE80)":
          if (subcategory === 'Function') prefillData = { function: search_key };
          if (subcategory === 'Devices') prefillData = { device: search_key };
          if (subcategory === 'Prefixes') prefillData = { prefixes: [search_key] };
          break;
        case "Bored Lock Tailpieces":
          if(path) {
            prefillData = {
                lockSeries: path[0],
                cylinderType: path[1],
                competitiveType: path[2] === "Mechanical Functions" || path[2] === "Electrified Functions" ? null : path[2],
                brand: path[3] === "Mechanical Functions" || path[3] === "Electrified Functions" ? null : path[3],
                functionType: path.find(p => p.includes("Functions")),
                cylinderSubtype: path.find(p => !p.includes("Functions") && (p.includes("Pin") || p.includes("XC") || p.includes("Signature") || p.includes("Keso"))),
                doorThickness: path[path.length -1],
            };
          }
          break;
        default:
          break;
      }
      
      // Update the centralized form data state
      setFormData(prevData => ({ ...prevData, [form]: prefillData }));
      
    } else {
      // Fallback for any unmapped categories if necessary
      alert(`Configuration for "${category}" is not yet implemented.`);
    }
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
        return <Rails />; // <-- Rails form doesn't need pre-fill from search anymore
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
      case "Aux Control Parts": // <--- NEW CASE
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
          <img src={images.logo} alt="Company Logo" className="company-logo" />
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
          <h1 className="title">Sargent Part Number Lookup Tool</h1>
        </div>
        <div className="navbar-messages-bar">
           <h3 className="navbar-message-note">For best results, Verify Part #'s with Sargent Mechanical TPS</h3>
           <h3 className="navbar-message-star">★ = Same Form Used Across All Device Platforms (Universal Form)</h3>
        </div>
      </div>

      <GlobalSearch onSearchExecuted={handleSearchResultClick} />
      
      {/* NEW: Render the modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} data={modalData} />
      
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
    </div>
  );
};

export default App;