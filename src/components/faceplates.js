// src/components/Faceplates.js
import React, { useState } from "react";
import Select, { components } from "react-select";
import images from "../images"; // Assuming images.js is in the parent directory
import "../App.css"; // Ensure App.css styles are applied

// Define the finish options (reused from MortiseExitLockbodies.js)
const finishOptions = [
  { value: "03", label: "03 - Bright brass, clear coated", image: images.finish03 },
  { value: "04", label: "04 - Satin brass, clear coated", image: images.finish04 },
  { value: "09", label: "09 - Bright bronze, clear coated", image: images.finish09 },
  { value: "10", label: "10 - Satin bronze, clear coated", image: images.finish10 },
  { value: "10B", label: "10B - Dark oxidized satin bronze, oil rubbed", image: images.finish10B },
  { value: "10BE", label: "10BE - Dark oxidized satin bronze-equivalent", image: images.finish10BE },
  { value: "10BL", label: "10BL - Dark oxidized satin bronze, clear coated", image: images.finish10BL },
  { value: "14", label: "14 - Bright nickel plated, clear coated", image: images.finish14 },
  { value: "15", label: "15 - Satin nickel plated, clear coated", image: images.finish15 },
  { value: "20D", label: "20D - Dark oxidized statuary bronze, clear coated", image: images.finish20D },
  { value: "26", label: "26 - Bright chromium plated over nickel", image: images.finish26 },
  { value: "26D", label: "26D - Satin chromium plated over nickel", image: images.finish26D },
  { value: "BSP", label: "BSP - Black suede powder coat, sprayed", image: images.finishBSP },
  { value: "WSP", label: "WSP - White suede powder coat, sprayed", image: images.finishWSP },
];

// Custom styles for dropdowns with black text
const customStyles = {
  control: (provided) => ({
    ...provided,
    color: 'black',
    borderRadius: "25px"
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    borderRadius: "25px"
  }),
  option: (provided) => ({
    ...provided,
    color: 'black',
    borderRadius: "25px"
  }),
  input: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

// Custom components for finish dropdown (reused from MortiseExitLockbodies.js)
const FinishOption = (props) => (
  <components.Option {...props}>
    <img
      src={props.data.image}
      alt={props.data.label}
      style={{ width: "30px", marginRight: "10px", borderRadius: "25px" }}
    />
    <span style={{ color: 'black' }}>{props.data.label}</span>
  </components.Option>
);

const FinishSingleValue = (props) => (
  <components.SingleValue {...props}>
    <img
      src={props.data.image}
      alt={props.data.label}
      style={{ width: "30px", marginRight: "10px", borderRadius: "25px" }}
    />
    <span style={{ color: 'black' }}>{props.data.label}</span>
  </components.SingleValue>
);

// Map of original raw function codes to their corresponding base part numbers
// This map uses the original functions from the image as keys
const rawFunctionToPartNoMap = {
  "12": "82-0080", "15": "82-0080", "65": "82-0080",
  "04": "82-0081", "05": "82-0081", "06": "82-0081", "13": "82-0081", "16": "82-0081", "17": "82-0081", "31": "82-0081", "36": "82-0081", "37": "82-0081", "38": "82-0081", "56": "82-0081", "57": "82-0081", "58": "82-0081", "59": "82-0081", "67": "82-0081",
  "03": "82-0082", "20": "82-0082", "21": "82-0082", "22": "82-0082", "23": "82-0082", "28": "82-0082", "29": "82-0082", "30": "82-0082",
  "24": "82-0083", "25": "82-0083", "26": "82-0083", "27": "82-0083", "35": "82-0083", "39": "82-0083", "49": "82-0083", "66": "82-0083", "68": "82-0083",
  "40": "82-0084", "41": "82-0084", "50": "82-0084", "51": "82-0084", "52": "82-0084",
  "45": "82-0086", "46": "82-0086", "47": "82-0086", "48": "82-0086",
  "43": "82-0087",
  "89": "82-0088", "90": "82-0088", "91": "82-0088", "92": "82-0088",
  "70": "82-0578", "71": "82-0578", "72": "82-0578", "73": "82-0578", "78": "82-0578", "79": "82-0578",
  "95": "82-0627", "96": "82-0627", "97": "82-0627",
  "55": "82-0085",
  "281": "82-0579", "280": "82-0579", "285": "82-0579", "284": "82-0579",
  "271": "82-0578", "270": "82-0578", "275": "82-0578", "274": "82-0578",
};

// Extract all unique raw function codes
const allRawFunctions = Array.from(new Set(Object.keys(rawFunctionToPartNoMap)));

// Interpret functions by prepending '82' and prepare for dropdown
const functionOptions = allRawFunctions
  .map(func => {
    // Ensure functions like '3' become '03' before prepending '82'
    const formattedFunc = func.length === 1 ? `0${func}` : func;
    const newFuncValue = `82${formattedFunc}`;
    return { value: newFuncValue, label: newFuncValue };
  })
  .sort((a, b) => parseInt(a.label, 10) - parseInt(b.label, 10)); // Sort numerically

const Faceplates = () => {
  const [formData, setFormData] = useState({
    function: null,
    finish: null,
  });
  const [faceplatePartNumber, setFaceplatePartNumber] = useState("");
  const [strikeScrewPartNumber, setStrikeScrewPartNumber] = useState("");

  const handleFunctionChange = (selectedOption) => {
    setFormData({ ...formData, function: selectedOption });
    setFaceplatePartNumber("");
    setStrikeScrewPartNumber("");
  };

  const handleFinishChange = (selectedOption) => {
    setFormData({ ...formData, finish: selectedOption });
    setFaceplatePartNumber("");
    setStrikeScrewPartNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { function: selectedFunction, finish: selectedFinish } = formData;

    if (!selectedFunction || !selectedFinish) {
      alert("Please select both Function and Finish.");
      return;
    }

    // Extract the original two-digit function code from the selected value (e.g., "8204" -> "04")
    const originalFunctionKey = selectedFunction.value.substring(2);
    
    const baseFaceplatePart = rawFunctionToPartNoMap[originalFunctionKey];

    if (baseFaceplatePart) {
      // Concatenate with finish
      setFaceplatePartNumber(`${baseFaceplatePart}-${selectedFinish.value}`);
      // Strike screws static part number, but with dynamic finish
      setStrikeScrewPartNumber(`01-1028-${selectedFinish.value}`); // This is a static part number per your request
    } else {
      setFaceplatePartNumber("Faceplate part number not found for this function.");
      setStrikeScrewPartNumber("");
    }
  };

  const handleReset = () => {
    setFormData({
      function: null,
      finish: null,
    });
    setFaceplatePartNumber("");
    setStrikeScrewPartNumber("");
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">Faceplates</h1>

      <form onSubmit={handleSubmit} className="part-form">
        {/* Function Selection */}
        <div className="form-group">
          <label>Function:</label>
          <Select
            options={functionOptions}
            onChange={handleFunctionChange}
            value={formData.function}
            placeholder="Select Function..."
            styles={customStyles}
            required
          />
        </div>

        {/* Finish Selection */}
        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={finishOptions}
            onChange={handleFinishChange}
            components={{ Option: FinishOption, SingleValue: FinishSingleValue }}
            value={formData.finish}
            placeholder="Select Finish..."
            styles={customStyles}
            required
          />
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="generate-button">
            Generate Part Numbers
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>

      {/* Results */}
      {(faceplatePartNumber || strikeScrewPartNumber) && (
        <div className="result-container">
          <h2>Generated Part Numbers:</h2>
          {faceplatePartNumber && (
            <div className="part-number">
              Faceplate Part Number: {faceplatePartNumber}
            </div>
          )}
          {strikeScrewPartNumber && (
            <div className="part-number">
              Strike Screws Part Number: {strikeScrewPartNumber}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Faceplates;