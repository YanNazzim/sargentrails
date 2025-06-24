// src/components/MortiseSpindles.js
import React, { useState } from "react";
import Select from "react-select";
import "../App.css"; // Ensure App.css styles are applied

// Helper function to parse the dimension string
const parseDimension = (dimensionString) => {
  if (!dimensionString) return { standard: "", studio: "" };
  const parts = dimensionString.split("/");
  return {
    standard: parts[0] || "",
    studio: parts[1] || parts[0] || "", // If only one part, use it for both
  };
};

const spindleData = {
  "Standard Trim": { // Corresponds to "PART No." column
    "1-3/8 to 1-5/8": { partNo: "82-1625", dimension: parseDimension("1.712/1.692") },
    "1-3/4 to 2": { partNo: "82-1626", dimension: parseDimension("1.900/1.880") },
    "2-1/8 to 2-3/8": { partNo: "82-1627", dimension: parseDimension("2.087/2.067") },
    "2-1/2 to 2-3/4": { partNo: "82-1628", dimension: parseDimension("2.274/2.254") },
    "2-7/8 to 3-1/8": { partNo: "82-1629", dimension: parseDimension("2.462/2.442") },
    "3-1/4 to 3-1/2": { partNo: "82-1630", dimension: parseDimension("2.650/2.630") },
    "3-5/8 to 3-7/8": { partNo: "82-1631", dimension: parseDimension("2.837/2.817") },
    "4 to 4-1/4": { partNo: "82-1632", dimension: parseDimension("3.024/3.004") },
    "4-3/8 to 4-5/8": { partNo: "82-1633", dimension: parseDimension("3.212/3.192") },
    "4-3/4 to 5": { partNo: "82-1634", dimension: parseDimension("3.399/3.379") },
    "5-1/8 to 5-3/8": { partNo: "82-1635", dimension: parseDimension("3.587/3.567") },
    "5-1/2 to 5-3/4": { partNo: "82-1636", dimension: parseDimension("3.774/3.754") },
    "5-7/8 to 6": { partNo: "82-1637", dimension: parseDimension("3.962/3.942") },
    "4-1/4 to 4-1/2": { partNo: "82-1638", dimension: parseDimension("4.149/4.129") }, // New range
    "5-1/8 to 5-7/8": { partNo: "82-1639", dimension: parseDimension("4.337/4.317") }, // New range
    "5-1/2 to 6": { partNo: "82-1640", dimension: parseDimension("4.524/4.504") }, // New range
    "5-7/8 to 6.25": { partNo: "82-1641", dimension: parseDimension("4.712/4.692") }, // New range
  },
  "Studio Trim": { // Corresponds to "MAKE FROM PART No." column
    "1-3/8 to 1-5/8": { partNo: "82-0367", dimension: parseDimension("1.712/1.692") },
    "1-3/4 to 2": { partNo: "82-0368", dimension: parseDimension("1.900/1.880") },
    "2-1/8 to 2-3/8": { partNo: "82-0369", dimension: parseDimension("2.087/2.067") },
    "2-1/2 to 2-3/4": { partNo: "82-0370", dimension: parseDimension("2.274/2.254") },
    "2-7/8 to 3-1/8": { partNo: "82-0371", dimension: parseDimension("2.462/2.442") },
    "3-1/4 to 3-1/2": { partNo: "82-0372", dimension: parseDimension("2.650/2.630") },
    "3-5/8 to 3-7/8": { partNo: "82-0373", dimension: parseDimension("2.837/2.817") },
    "4 to 4-1/4": { partNo: "82-0374", dimension: parseDimension("3.024/3.004") },
    "4-3/8 to 4-5/8": { partNo: "82-0375", dimension: parseDimension("3.212/3.192") },
    "4-3/4 to 5": { partNo: "82-0376", dimension: parseDimension("3.399/3.379") },
    "5-1/8 to 5-3/8": { partNo: "82-0377", dimension: parseDimension("3.587/3.567") },
    "5-1/2 to 5-3/4": { partNo: "82-0378", dimension: parseDimension("3.774/3.754") },
    "5-7/8 to 6": { partNo: "82-0379", dimension: parseDimension("3.962/3.942") },
    // Additional ranges from the image for "MAKE FROM PART No." column
    "4-1/4 to 4-1/2": { partNo: "82-0380", dimension: parseDimension("4.149/4.129") },
    "5-1/8 to 5-7/8": { partNo: "82-0381", dimension: parseDimension("4.337/4.317") },
    "5-1/2 to 6": { partNo: "82-0382", dimension: parseDimension("4.524/4.504") },
    "5-7/8 to 6.25": { partNo: "82-0383", dimension: parseDimension("4.712/4.692") },
  },
};

const doorThicknessOptions = [
  { value: "1-3/8 to 1-5/8", label: '1-3/8" to 1-5/8"' },
  { value: "1-3/4 to 2", label: '1-3/4" to 2" (Standard)' },
  { value: "2-1/8 to 2-3/8", label: '2-1/8" to 2-3/8"' },
  { value: "2-1/2 to 2-3/4", label: '2-1/2" to 2-3/4"' },
  { value: "2-7/8 to 3-1/8", label: '2-7/8" to 3-1/8"' },
  { value: "3-1/4 to 3-1/2", label: '3-1/4" to 3-1/2"' },
  { value: "3-5/8 to 3-7/8", label: '3-5/8" to 3-7/8"' },
  { value: "4 to 4-1/4", label: '4" to 4-1/4"' },
  { value: "4-3/8 to 4-5/8", label: '4-3/8" to 4-5/8"' },
  { value: "4-3/4 to 5", label: '4-3/4" to 5"' },
  { value: "5-1/8 to 5-3/8", label: '5-1/8" to 5-3/8"' },
  { value: "5-1/2 to 5-3/4", label: '5-1/2" to 5-3/4"' },
  { value: "5-7/8 to 6", label: '5-7/8" to 6"' },
  { value: "4-1/4 to 4-1/2", label: '4-1/4" to 4-1/2"' },
  { value: "5-1/8 to 5-7/8", label: '5-1/8" to 5-7/8"' },
  { value: "5-1/2 to 6", label: '5-1/2" to 6"' },
  { value: "5-7/8 to 6.25", label: '5-7/8" to 6-1/4"' },
];

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

const MortiseSpindles = () => {
  const [formData, setFormData] = useState({
    trimType: null,
    doorThickness: null,
  });
  const [partInfo, setPartInfo] = useState(null); // Changed to store an object with partNo and dimension

  const handleTrimTypeChange = (e) => {
    setFormData({ ...formData, trimType: e.target.value });
    setPartInfo(null); // Reset part info
  };

  const handleDoorThicknessChange = (selectedOption) => {
    setFormData({ ...formData, doorThickness: selectedOption });
    setPartInfo(null); // Reset part info
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { trimType, doorThickness } = formData;

    if (!trimType || !doorThickness) {
      setPartInfo({ partNo: "Please select both Trim Type and Door Thickness.", dimension: { standard: "", studio: "" } });
      return;
    }

    const foundPart = spindleData[trimType]?.[doorThickness.value];

    if (foundPart) {
      setPartInfo(foundPart);
    } else {
      setPartInfo({ partNo: "Part number not found for this selection. Please try another combination or contact TPS.", dimension: { standard: "", studio: "" } });
    }
  };

  const handleReset = () => {
    setFormData({
      trimType: null,
      doorThickness: null,
    });
    setPartInfo(null); // Reset part info
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">Mortise Spindles</h1>
      <form onSubmit={handleSubmit} className="part-form">
        {/* Trim Type Selection */}
        <div className="form-group">
          <label>Trim Type:</label>
          <div className="radio-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
              <input
                type="radio"
                name="trimType"
                value="Standard Trim"
                checked={formData.trimType === "Standard Trim"}
                onChange={handleTrimTypeChange}
                required
              />
              Standard Trim (Rose/Escutcheons listed)
            </label>
            <label>
              <input
                type="radio"
                name="trimType"
                value="Studio Trim"
                checked={formData.trimType === "Studio Trim"}
                onChange={handleTrimTypeChange}
                required
              />
              Studio Trim (Rose/Escutcheons listed)
            </label>
          </div>
        </div>

        {/* Door Thickness Selection */}
        <div className="form-group">
          <label>Door Thickness:</label>
          <Select
            options={doorThicknessOptions}
            onChange={handleDoorThicknessChange}
            value={formData.doorThickness}
            placeholder="Select Door Thickness..."
            styles={customSelectStyles}
            required
            isDisabled={!formData.trimType}
          />
        </div>

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
      {partInfo && (
        <div className="result-container">
          <h2>Found Spindle Information:</h2>
          <div className="part-number">
            Part Number: {partInfo.partNo}
          </div>
          {partInfo.dimension && ( // Only show dimension if it exists
            <div className="part-number">
              Total Length of Spindle End to End:{" "}
              {formData.trimType === "Standard Trim"
                ? partInfo.dimension.standard
                : partInfo.dimension.studio}{" "}
              inches
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MortiseSpindles;