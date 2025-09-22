// src/components/CylindricalLockbodies.js
import React, { useState } from "react";
import Select from "react-select";
import "../App.css"; // Ensure App.css styles are applied

// Data extracted from 10X Lockbodies.pdf
const lockbodiesData = {
  "10X Line": {
    types: [
      { value: "Mechanical", label: "Mechanical Lockbody" },
      { value: "VSL_Mechanical", label: "Mechanical Lockbody for VSL Indicator Trim" },
      { value: "Electrified", label: "Electrified Lockbody" },
    ],
    // Functions common across Mechanical and VSL Mechanical
    mechanicalFunctions: [
      { value: "10XG04", label: "Storeroom or Closet" },
      { value: "10XG05", label: "Entrance or Office" },
      { value: "10XG07", label: "Communicating Storeroom" },
      { value: "10XG08", label: "Communicating Classroom" },
      { value: "10XG13", label: "Exit" },
      { value: "10XG14", label: "Patio or Privacy" },
      { value: "10XU15", label: "Passage" },
      { value: "10XG15-3", label: "Exit or Communicating" },
      { value: "10XG16", label: "Classroom Security, Apartment, Exit, Privacy" },
      { value: "10XG17", label: "Utility, Asylum or Institutional" },
      { value: "10XG24", label: "Entrance or Office" },
      { value: "10XG26", label: "Store or Storeroom" },
      { value: "10XG30", label: "Communicating" },
      { value: "10XG37", label: "Classroom" },
      { value: "10XG38", label: "Classroom Security Intruder" },
      { value: "10XG44", label: "Service Station" },
      { value: "10XG50", label: "Hotel, Dormitory or Apartment" },
      { value: "10XG53", label: "Corridor/Dormitory (modified)" },
      { value: "10XG54", label: "Corridor/Dormitory" },
      { value: "10XG60", label: "Barrier Free Storeroorn/Public Restroom" },
      { value: "10XG64", label: "Time Out Lock" },
      { value: "10XU65", label: "Privacy/Bathroom" },
      { value: "10XU66", label: "Privacy/Bathroom" },
      { value: "10XU68", label: "Hospital Privacy" },
    ],
    rxFunctions: [
      { value: "RX-10XG04", label: "Storeroom or Closet with Request to Exit" },
      { value: "RX-10XG05", label: "Entrance or Office with Request to Exit" },
      { value: "RX-10XU15", label: "Passage with Request to Exit" },
      { value: "RX-10XG37", label: "Classroom with Request to Exit" },
      { value: "RX-10XG70_RX-10XG71", label: "Electromechanical with Request to Exit" }, // Combined for electrified
    ],
    electrifiedFunctions: [
      { value: "10XG70_10XG71", label: "Electromechanical" }, // Combined function for lookup
    ],
    doorThicknesses: [
      { value: "1-3/8\"-2\" Door", label: '1-3/8" - 2" Door' },
      { value: "2-1/4\" Door", label: '2-1/4" Door' },
    ],
    leverTypes: [
      { value: "Std/Rigid Lever", label: "Standard/Rigid Lever" },
      { value: "Freewheeling", label: "Freewheeling" },
    ],
    parts: {
      // Mechanical Lockbody
      "Mechanical": {
        "10XG04": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3587", "Freewheeling": "10-3586" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3669", "Freewheeling": "10-3668" },
        },
        "10XG05": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3588*", "Freewheeling": "10-3589*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3670*", "Freewheeling": "10-3671*" },
        },
        "10XG07": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3590", "Freewheeling": "10-3591" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3673", "Freewheeling": "10-3672" },
        },
        "10XG08": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3592", "Freewheeling": "10-3593" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3675", "Freewheeling": "10-3674" },
        },
        "10XG13": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3586", "Freewheeling": "10-3587" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3669", "Freewheeling": "10-3668" },
        },
        "10XG14": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3618*", "Freewheeling": "10-3619*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3703", "Freewheeling": "10-3702*" },
        },
        "10XU15": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3596", "Freewheeling": "N/A" },
          "2-1/4\" Door": { "Std/Rigid Lever": "N/A", "Freewheeling": "10-3678" },
        },
        "10XG15-3": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3597", "Freewheeling": "N/A" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3679", "Freewheeling": "N/A" },
        },
        "10XG16": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3598", "Freewheeling": "10-3599" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3680", "Freewheeling": "10-3681" },
        },
        "10XG17": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3600", "Freewheeling": "10-3601" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3683", "Freewheeling": "10-3682" },
        },
        "10XG24": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3594*", "Freewheeling": "10-3595*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3677*", "Freewheeling": "10-3676" },
        },
        "10XG26": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3602", "Freewheeling": "10-3603" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3685", "Freewheeling": "10-3684" },
        },
        "10XG30": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3605", "Freewheeling": "10-3604" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3686", "Freewheeling": "10-3687" },
        },
        "10XG37": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3711", "Freewheeling": "10-3710" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3713", "Freewheeling": "10-3712" },
        },
        "10XG38": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3607", "Freewheeling": "10-3606" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3689", "Freewheeling": "10-3688" },
        },
        "10XG44": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3608*", "Freewheeling": "10-3609*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3691*", "Freewheeling": "10-3690*" },
        },
        "10XG50": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3610*", "Freewheeling": "10-3611*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3692*", "Freewheeling": "10-3693*" },
        },
        "10XG53": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3613*", "Freewheeling": "10-3612*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3694*", "Freewheeling": "10-3695*" },
        },
        "10XG54": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3614*", "Freewheeling": "10-3615*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3696*", "Freewheeling": "10-3697*" },
        },
        "10XG60": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3620", "Freewheeling": "10-3621" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3699", "Freewheeling": "10-3698" },
        },
        "10XG64": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3616*", "Freewheeling": "10-3617*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3700*", "Freewheeling": "10-3701*" },
        },
        "10XU65": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3618*", "Freewheeling": "10-3619*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3702*", "Freewheeling": "10-3703" },
        },
        "10XU66": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3618*", "Freewheeling": "10-3619*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3703*", "Freewheeling": "10-3702*" },
        },
        "10XU68": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3618*", "Freewheeling": "10-3619*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3702*", "Freewheeling": "10-3703*" },
        },
        "RX-10XG04": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2935", "Freewheeling": "10-2934" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-2943", "Freewheeling": "10-2942" },
        },
        "RX-10XG05": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2937*", "Freewheeling": "10-2936*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-2944*", "Freewheeling": "10-2945*" },
        },
        "RX-10XU15": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2938", "Freewheeling": "10-2939" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-2947", "Freewheeling": "10-2946" },
        },
        "RX-10XG37": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2940", "Freewheeling": "10-2941" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-2949", "Freewheeling": "10-2948" },
        },
      },
      // VSL Mechanical Lockbody
      "VSL_Mechanical": {
        "10XG04": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2976", "Freewheeling": "10-2977" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3807", "Freewheeling": "10-3808" },
        },
        "10XG05": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2978*", "Freewheeling": "10-2979*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3809*", "Freewheeling": "10-3810*" },
        },
        "10XG14": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2986", "Freewheeling": "10-2987*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3818*", "Freewheeling": "10-3817*" },
        },
        "10XG24": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2980*", "Freewheeling": "10-2981*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3811*", "Freewheeling": "10-3812*" },
        },
        "10XG37": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3921", "Freewheeling": "10-3922" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3923", "Freewheeling": "10-3924" },
        },
        "10XG38": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3925", "Freewheeling": "10-3926" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3927", "Freewheeling": "10-3828" },
        },
        "10XG44": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2982*", "Freewheeling": "10-2983*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3813*", "Freewheeling": "10-3814*" },
        },
        "10XG53": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3929*", "Freewheeling": "10-3930*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3931*", "Freewheeling": "10-3932*" },
        },
        "10XG54": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2984*", "Freewheeling": "10-2985*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3815*", "Freewheeling": "10-3816*" },
        },
        "10XU65": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2986*", "Freewheeling": "10-2987*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3817*", "Freewheeling": "10-3818*" },
        },
        "10XU66": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2986*", "Freewheeling": "10-2987*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3817*", "Freewheeling": "10-38~18*" },
        },
        "10XU68": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-2986*", "Freewheeling": "10-2987*" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3818*", "Freewheeling": "10-3817*" },
        },
      },
      // Electrified Lockbody
      "Electrified": {
        "10XG70_10XG71": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3722", "Freewheeling": "10-3763" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3795", "Freewheeling": "10-3797" },
        },
        "RX-10XG70_RX-10XG71": {
          "1-3/8\"-2\" Door": { "Std/Rigid Lever": "10-3723", "Freewheeling": "10-3764" },
          "2-1/4\" Door": { "Std/Rigid Lever": "10-3796", "Freewheeling": "10-3798" },
        },
      },
    },
  },
};

// Custom styles for react-select to ensure black text
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
    color: "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isFocused ? "#007bff20" : "white",
    borderRadius: "25px",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px',
  }),
};

const CylindricalLockbodies = () => {
  const [selectedLockbodyType, setSelectedLockbodyType] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [selectedDoorThickness, setSelectedDoorThickness] = useState(null);
  const [selectedLeverType, setSelectedLeverType] = useState(null);
  const [isRxPrefix, setIsRxPrefix] = useState(false);
  const [partNumber, setPartNumber] = useState("");
  const [note, setNote] = useState("");

  // Options for Lockbody Type dropdown
  const lockbodyTypeOptions = lockbodiesData["10X Line"].types;

  // Dynamically generate function options based on selected lockbody type and RX prefix
  const getFunctionOptions = () => {
    if (!selectedLockbodyType) return [];

    let availableFunctions = [];

    if (isRxPrefix) {
      // If RX prefix is selected, filter RX functions relevant to the lockbody type
      if (selectedLockbodyType.value === "Electrified") {
        availableFunctions = lockbodiesData["10X Line"].rxFunctions.filter(func => func.value.startsWith("RX-10XG7"));
      } else {
        // For Mechanical and VSL Mechanical, filter RX functions that are NOT electrified
        availableFunctions = lockbodiesData["10X Line"].rxFunctions.filter(func => !func.value.startsWith("RX-10XG7"));
      }
    } else {
      // If no RX prefix, show standard functions based on lockbody type
      if (selectedLockbodyType.value === "Electrified") {
        availableFunctions = lockbodiesData["10X Line"].electrifiedFunctions;
      } else {
        // For Mechanical and VSL Mechanical, show standard functions that are NOT RX
        availableFunctions = lockbodiesData["10X Line"].mechanicalFunctions.filter(func => !func.value.startsWith("RX-"));
      }
    }

    // Format the labels as "FUNCTION_NUMBER - Description"
    return availableFunctions.map(func => ({
      value: func.value,
      label: `${func.value} - ${func.label}`
    }));
  };

  // Handlers for state changes
  const handleLockbodyTypeChange = (selectedOption) => {
    setSelectedLockbodyType(selectedOption);
    setSelectedFunction(null);
    setSelectedDoorThickness(null);
    setSelectedLeverType(null);
    setIsRxPrefix(false); // Reset RX prefix when lockbody type changes
    setPartNumber("");
    setNote("");
  };

  const handleFunctionChange = (selectedOption) => {
    setSelectedFunction(selectedOption);
    setPartNumber("");
    setNote("");
  };

  const handleRxPrefixChange = (e) => {
    const isChecked = e.target.checked;
    setIsRxPrefix(isChecked);
    setSelectedFunction(null); // Reset function when RX prefix changes
    setPartNumber("");
    setNote("");
  };

  const handleDoorThicknessChange = (selectedOption) => {
    setSelectedDoorThickness(selectedOption);
    setPartNumber("");
    setNote("");
  };

  const handleLeverTypeChange = (selectedOption) => {
    setSelectedLeverType(selectedOption);
    setPartNumber("");
    setNote("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLockbodyType || !selectedFunction || !selectedDoorThickness || !selectedLeverType) {
      alert("Please fill out all required fields.");
      setPartNumber("");
      setNote("");
      return;
    }

    const currentLineData = lockbodiesData["10X Line"].parts[selectedLockbodyType.value];
    if (!currentLineData) {
      setPartNumber("Data not found for selected lockbody type.");
      setNote("");
      return;
    }

    const functionData = currentLineData[selectedFunction.value];
    if (!functionData) {
      setPartNumber("Data not found for selected function.");
      setNote("");
      return;
    }

    const thicknessData = functionData[selectedDoorThickness.value];
    if (!thicknessData) {
      setPartNumber("Data not found for selected door thickness.");
      setNote("");
      return;
    }

    let foundPart = thicknessData[selectedLeverType.value];

    if (foundPart === "N/A") {
      setPartNumber("Not Available for this configuration.");
      setNote("");
    } else if (foundPart) {
      let currentNote = "";
      // Check for asterisk and add note
      if (foundPart.includes('*')) {
        foundPart = foundPart.replace('*', '');
        currentNote = "(*Includes finished button, specify finish.)";
      }
      // Handle potential typo from PDF (e.g., "10-38~18*")
      if (foundPart.includes('~')) {
         foundPart = foundPart.replace('~', '');
      }

      setPartNumber(foundPart);
      setNote(currentNote);
    } else {
      setPartNumber("Part number not found. Please check your selections.");
      setNote("");
    }
  };

  const handleReset = () => {
    setSelectedLockbodyType(null);
    setSelectedFunction(null);
    setSelectedDoorThickness(null);
    setSelectedLeverType(null);
    setIsRxPrefix(false);
    setPartNumber("");
    setNote("");
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">Bored Lock Lockbodies</h1>
      <form onSubmit={handleSubmit} className="part-form">
        {/* Lockbody Type Selection */}
        <div className="form-group">
          <label>Lockbody Type:</label>
          <Select
            options={lockbodyTypeOptions}
            onChange={handleLockbodyTypeChange}
            value={selectedLockbodyType}
            placeholder="Select Lockbody Type..."
            styles={customSelectStyles}
            required
          />
        </div>

        {/* RX Prefix Checkbox */}
        {selectedLockbodyType && (
          <div className="form-group">
            <label>Prefixes:</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={isRxPrefix}
                  onChange={handleRxPrefixChange}
                />
                <span className="custom-checkbox"></span>
                <span>
                  <strong>(RX-)</strong> — Request to Exit
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Function Selection */}
        {selectedLockbodyType && (
          <div className="form-group">
            <label>Function:</label>
            <Select
              options={getFunctionOptions()}
              onChange={handleFunctionChange}
              value={selectedFunction}
              placeholder="Select Function..."
              styles={customSelectStyles}
              required
            />
          </div>
        )}

        {/* Door Thickness Selection */}
        {selectedFunction && (
          <div className="form-group">
            <label>Door Thickness:</label>
            <Select
              options={lockbodiesData["10X Line"].doorThicknesses}
              onChange={handleDoorThicknessChange}
              value={selectedDoorThickness}
              placeholder="Select Door Thickness..."
              styles={customSelectStyles}
              required
            />
          </div>
        )}

        {/* Lever Type Selection (Applies to all 10X Lockbodies) */}
        {selectedDoorThickness && (
          <div className="form-group">
            <label>Lever Type:</label>
            <Select
              options={lockbodiesData["10X Line"].leverTypes}
              onChange={handleLeverTypeChange}
              value={selectedLeverType}
              placeholder="Select Lever Type..."
              styles={customSelectStyles}
              required
            />
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="generate-button">
            Find Part Number
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>

      {/* Results */}
      {partNumber && (
        <div className="result-container">
          <h2>Found Part Number:</h2>
          <div className="part-number">
            {partNumber}
            {note && <span className="note">{note}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CylindricalLockbodies;