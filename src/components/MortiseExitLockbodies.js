import React, { useState } from "react";
import Select, { components } from "react-select";
import images from "../images";
import "../App.css";

const MortiseExitLockbodies = () => {
  const [formData, setFormData] = useState({
    device: "",
    function: "",
    prefixes: [],
    handing: "",
    finish: "",
  });

  const [partNumber, setPartNumber] = useState("");

  // Define the devices
  const devices = [
    { value: "8300", label: "8300 Mortise" },
    { value: "8900", label: "8900 Mortise" },
    { value: "PE8300", label: "PE8300 Mortise" },
    { value: "PE8900", label: "PE8900 Mortise" },
    { value: "9900", label: "9900 Mortise" },
  ];

  // Define the functions
  const functions = [
    { value: "04", label: "04 - Standard Function" },
    { value: "06", label: "06 - Fire Rated Function" },
    { value: "13", label: "13 - Delayed Egress Function" },
    { value: "10", label: "10 - Alarm Function" },
    { value: "15", label: "15 - Guarded Latch Function" },
    { value: "16", label: "16 - Windstorm Rated Function (8900/PE8900 only)" },
    { value: "28", label: "28 - Hurricane Rated Function" },
    { value: "40", label: "40 - FEMA Rated Function" },
    { value: "43", label: "43 - Latchbolt Monitoring Function" },
    { value: "44", label: "44 - Electroguard® Delayed Egress Function" },
    { value: "63", label: "63 - Inside Visual Indicator Function" },
    { value: "66", label: "66 - 5LB Maximum Force Function" },
    { value: "73", label: "73 - Fire Rated (No Dogging) Function" },
    { value: "74", label: "74 - Alarm Function" },
    { value: "75", label: "75 - Guarded Latch Function" },
    { value: "76", label: "76 - Windstorm Rated Function (8900/PE8900 only)" },
  ];

  // Define the prefixes
  const prefixes = [
    { code: "12", name: "Fire Rated (No Dogging)" },
    { code: "31", name: 'Thicker Door than 1-3/4"' },
    { code: "36", name: "Torx Head Security Screws" },
    { code: "37", name: "Spanner Head Security Screws" },
    { code: "53", name: "Latchbolt Monitoring Switch" },
    { code: "59", name: "Electroguard® Delayed Egress" },
  ];

  // Define the handing options
  const handingOptions = [
    { value: "LHR", label: "Left Hand" },
    { value: "RHR", label: "Right Hand" },
  ];

  // Define the finishes
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
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    option: (provided) => ({
      ...provided,
      color: 'black',
    }),
    input: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.device || !formData.function || !formData.handing || !formData.finish) {
      alert("Please fill out all required fields.");
      return;
    }

    const prefixKey = formData.prefixes.sort().join("-");
    const partNumber = `${prefixKey ? `${prefixKey}-` : ""}9${formData.function}-${formData.handing}-${formData.finish.value}`;
    setPartNumber(partNumber);
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      device: "",
      function: "",
      prefixes: [],
      handing: "",
      finish: "",
    });
    setPartNumber("");
  };

  // Custom components for finish dropdown
  const FinishOption = (props) => (
    <components.Option {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{ width: "30px", marginRight: "10px" }}
      />
      <span style={{ color: 'black' }}>{props.data.label}</span>
    </components.Option>
  );

  const FinishSingleValue = (props) => (
    <components.SingleValue {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{ width: "30px", marginRight: "10px" }}
      />
      <span style={{ color: 'black' }}>{props.data.label}</span>
    </components.SingleValue>
  );

  return (
    <div className="content-transition">
      <h1 className="Heading">80/PE80 Series Mortise Exit Lockbodies</h1>

      <form onSubmit={handleSubmit} className="part-form">
        {/* Device Selection */}
        <div className="form-group">
          <label>Device:</label>
          <Select
            options={devices}
            onChange={(selected) => setFormData({ ...formData, device: selected.value })}
            styles={customStyles}
            value={devices.find(d => d.value === formData.device)}
            required
          />
        </div>

        {/* Function Selection */}
        <div className="form-group">
          <label>Function:</label>
          <Select
            options={functions}
            onChange={(selected) => setFormData({ ...formData, function: selected.value })}
            styles={customStyles}
            value={functions.find(f => f.value === formData.function)}
            required
          />
        </div>

        {/* Prefixes Grid */}
        <div className="form-group">
          <label>Prefixes:</label>
          <div className="checkbox-group">
            {prefixes.map((prefix) => (
              <label key={prefix.code}>
                <input
                  type="checkbox"
                  checked={formData.prefixes.includes(prefix.code)}
                  onChange={(e) => {
                    const newPrefixes = e.target.checked
                      ? [...formData.prefixes, prefix.code]
                      : formData.prefixes.filter(p => p !== prefix.code);
                    setFormData({ ...formData, prefixes: newPrefixes });
                  }}
                />
                <span className="custom-checkbox"></span>
                <span className="parts-desc">
                  <strong>({prefix.code})</strong> - {prefix.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Handing Selection */}
        <div className="form-group">
          <label>Handing:</label>
          <Select
            options={handingOptions}
            onChange={(selected) => setFormData({ ...formData, handing: selected.value })}
            styles={customStyles}
            value={handingOptions.find(h => h.value === formData.handing)}
            required
          />
        </div>

        {/* Finish Selection */}
        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={finishOptions}
            onChange={(selected) => setFormData({ ...formData, finish: selected })}
            components={{ Option: FinishOption, SingleValue: FinishSingleValue }}
            styles={customStyles}
            value={formData.finish}
            required
          />
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="generate-button">
            Generate Part Number
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>

      {/* Results */}
      {partNumber && (
        <div className="result-container">
          <h2>Generated Part Number:</h2>
          <div className="part-number">{partNumber}</div>
        </div>
      )}
    </div>
  );
};

export default MortiseExitLockbodies;