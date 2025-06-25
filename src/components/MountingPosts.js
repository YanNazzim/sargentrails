// src/components/MountingPosts.js
import React, { useState } from "react";
import Select from "react-select";
import "../App.css"; // Ensure App.css styles are applied

const mountingPostData = {
  "1 3/8": "1.535",
  "1 1/2": "1.660",
  "1 5/8": "1.785",
  "1 3/4": "1.910",
  "1 7/8": "2.035",
  "2": "2.160",
  "2 1/8": "2.285",
  "2 1/4": "2.410",
  "2 3/8": "2.535",
  "2 1/2": "2.660",
  "2 5/8": "2.785",
  "2 3/4": "2.910",
  "2 7/8": "3.035",
  "3": "3.160",
  "3 1/8": "3.285",
  "3 1/4": "3.410",
  "3 3/8": "3.535",
  "3 1/2": "3.660",
  "3 5/8": "3.785",
  "3 3/4": "3.910",
  "3 7/8": "4.035",
  "4": "4.160",
  "4 1/8": "4.285",
  "4 1/4": "4.410",
  "4 3/8": "4.535",
  "4 1/2": "4.660",
  "4 5/8": "4.785",
  "4 3/4": "4.910",
  "4 7/8": "5.035",
  "5": "5.160",
  "5 1/8": "5.285",
  "5 1/4": "5.410",
  "5 3/8": "5.535",
  "5 1/2": "5.660",
  "5 5/8": "5.785",
  "5 3/4": "5.910",
  "5 7/8": "6.035",
  "6": "6.160",
};

// Helper function to convert fractional strings to decimal for sorting
const parseThicknessToDecimal = (thicknessStr) => {
  const parts = thicknessStr.split(" ");
  let decimalValue = 0;
  if (parts.length === 1) {
    // Handle whole numbers like "2" or "3.5"
    decimalValue = parseFloat(thicknessStr);
  } else if (parts.length === 2) {
    // Handle mixed numbers like "1 3/8"
    const whole = parseFloat(parts[0]);
    const fractionParts = parts[1].split("/");
    if (fractionParts.length === 2) {
      const numerator = parseFloat(fractionParts[0]);
      const denominator = parseFloat(fractionParts[1]);
      decimalValue = whole + (numerator / denominator);
    }
  }
  return decimalValue;
};

// Sort the door thickness options numerically
const sortedDoorThicknessKeys = Object.keys(mountingPostData).sort((a, b) => {
  const decimalA = parseThicknessToDecimal(a);
  const decimalB = parseThicknessToDecimal(b);
  return decimalA - decimalB;
});

const doorThicknessOptions = sortedDoorThicknessKeys.map((key) => ({
  value: key,
  label: `${key}"`,
}));

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
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px',
  }),
};

const MountingPosts = () => {
  const [selectedDoorThickness, setSelectedDoorThickness] = useState(null);
  const [mountingPostLength, setMountingPostLength] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDoorThickness) {
      const length = mountingPostData[selectedDoorThickness.value];
      setMountingPostLength(length);
    } else {
      setMountingPostLength("Please select a door thickness.");
    }
  };

  const handleReset = () => {
    setSelectedDoorThickness(null);
    setMountingPostLength("");
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">Mounting Post Length</h1>

      <form onSubmit={handleSubmit} className="part-form">
        {/* Door Thickness Selection */}
        <div className="form-group">
          <label>Total Door & Panel Thickness:</label>
          <Select
            options={doorThicknessOptions}
            onChange={setSelectedDoorThickness}
            value={selectedDoorThickness}
            placeholder="Select Door Thickness..."
            styles={customSelectStyles}
            required
          />
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="generate-button">
            Find Post Length
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>

      {/* Results */}
      {mountingPostLength && (
        <div className="result-container">
          <h2>Ideal Mounting Post Length:</h2>
          <div className="part-number">{mountingPostLength}</div>
        </div>
      )}
    </div>
  );
};

export default MountingPosts;