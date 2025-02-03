// RailsForm.js
import React, { useState, useEffect, useRef } from "react";
import { partsData } from "../partsData";
import "../App.css";
import images from "../images"; // Adjust the path as needed
import Select, { components } from "react-select";

// Custom Option to render finish image and label in the dropdown list
const FinishOption = (props) => {
  return (
    <components.Option {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "30px",
          height: "auto",
          marginRight: "10px",
          verticalAlign: "middle",
        }}
      />
      <span>{props.data.label}</span>
    </components.Option>
  );
};

// Custom SingleValue to render the selected finish with its image
const FinishSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "30px",
          height: "auto",
          marginRight: "10px",
          verticalAlign: "middle",
        }}
      />
      <span>{props.data.label}</span>
    </components.SingleValue>
  );
};

const RailsForm = () => {
  const [disabledPrefixes, setDisabledPrefixes] = useState([]);
  const [formData, setFormData] = useState({
    stile: "",
    lexan: "No",
    prefixes: [],
    size: "",
    finish: "",
    handing: "",
  });
  const [partNumber, setPartNumber] = useState("");
  const [note, setNote] = useState("");
  const [showHandingDropdown, setShowHandingDropdown] = useState(false);

  // Create a ref for the result container
  const resultRef = useRef(null);

  // Scroll into view when partNumber is updated
  useEffect(() => {
    if (partNumber && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [partNumber]);

  const options = {
    stile: [
      { code: "Narrow", display: "Narrow Stile - 8300, 8400, 8500, 8600" },
      { code: "Wide", display: "Wide Stile - 8600 8700, NB8700, 8800, 8900" },
    ],
    lexan: ["Yes", "No"],
    prefixes: [
      { code: "12", name: "Fire Rated (No Dogging)", conflicts: ["16", "56-HK"] },
      { code: "5CH", name: "5LB Maximum Force", conflicts: ["58", "59"] },
      { code: "16", name: "Keyed Cylinder Dogging", conflicts: ["12", "59", "AL"] },
      { code: "53", name: "Latchbolt Monitoring Switch", conflicts: ["59"] },
      { code: "55", name: "Request to Exit", conflicts: ["59"] },
      { code: "56", name: "Electric Latch Retraction", conflicts: ["56-HK", "58", "59", "AL"] },
      { code: "56-HK", name: "Electric Latch Retraction W/ Hex-Key Dogging", conflicts: ["56", "12", "58", "59", "AL"] },
      { code: "58", name: "Elecrtic Dogging", conflicts: ["56", "59"] },
      {
        code: "59",
        name: "Electroguard® Delayed Egress",
        conflicts: ["16", "53", "55", "56", "56-HK", "58", "AL"],
      },
      { code: "AL", name: "Alarm", conflicts: ["16", "56", "59"] },
      { code: "PL", name: "Photo-Luminescent Rail (Non Electrified)" },
    ],
    sizes: [
      { code: "E", display: 'E - For openings 24" to 32"' },
      { code: "F", display: 'F - For openings 33" to 36"' },
      { code: "J", display: 'J - For openings 37" to 42"' },
      { code: "G", display: 'G - For openings 43" to 48"' },
    ],
    finishes: [
      { value: "03", label: "03 - Brushed Nickel", image: images.finish03 },
      { value: "04", label: "04 - Polished Chrome", image: images.finish04 },
      { value: "09", label: "09 - Matte Black", image: images.finish09 },
      { value: "10", label: "10 - Satin Bronze", image: images.finish10 },
      { value: "10B", label: "10B - Antique Bronze", image: images.finish10B },
      { value: "10BE", label: "10BE - Oil-Rubbed Bronze", image: images.finish10BE },
      { value: "10BL", label: "10BL - Black", image: images.finish10BL },
      { value: "14", label: "14 - Bright Brass", image: images.finish14 },
      { value: "15", label: "15 - Satin Gold", image: images.finish15 },
      { value: "20D", label: "20D - Dark Bronze", image: images.finish20D },
      { value: "26", label: "26 - Light Chrome", image: images.finish26 },
      { value: "26D", label: "26D - Dark Nickel", image: images.finish26D },
      { value: "32", label: "32 - Custom Finish", image: images.finish32 },
      { value: "32D", label: "32D - Stainless Steel", image: images.finish32D },
      { value: "BSP", label: "BSP - Brushed Stainless", image: images.finishBSP },
      { value: "WSP", label: "WSP - White Stainless", image: images.finishWSP },
    ],
    handing: ["Left Hand", "Right Hand"],
  };

  const handlePrefixChange = (e) => {
    const prefixCode = e.target.value;
    const isChecked = e.target.checked;

    // Get the selected prefix object
    const selectedPrefix = options.prefixes.find((p) => p.code === prefixCode);

    // Update prefixes array
    const newPrefixes = isChecked
      ? [...formData.prefixes, prefixCode]
      : formData.prefixes.filter((p) => p !== prefixCode);

    // Handle conflicts
    let newDisabledPrefixes = [...disabledPrefixes];

    if (selectedPrefix?.conflicts) {
      if (isChecked) {
        newDisabledPrefixes = [...newDisabledPrefixes, ...selectedPrefix.conflicts];
      } else {
        newDisabledPrefixes = newDisabledPrefixes.filter(
          (code) => !selectedPrefix.conflicts.includes(code)
        );
      }
    } else if (prefixCode === "59") {
      const conflictingPrefix = options.prefixes.find((p) => p.code === "59");
      if (conflictingPrefix?.conflicts) {
        if (isChecked) {
          newDisabledPrefixes = [...newDisabledPrefixes, ...conflictingPrefix.conflicts];
        } else {
          newDisabledPrefixes = newDisabledPrefixes.filter(
            (code) => !conflictingPrefix.conflicts.includes(code)
          );
        }
      }
    }

    setDisabledPrefixes(newDisabledPrefixes);
    setFormData({ ...formData, prefixes: newPrefixes });

    if (prefixCode === "PL") {
      setShowHandingDropdown(isChecked);
      if (!isChecked) {
        setFormData({ ...formData, prefixes: newPrefixes, handing: "" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const prefixKey = formData.prefixes.sort().join("-");
    let key = `${formData.stile}-${formData.lexan}-${prefixKey}-${formData.size}`;

    if (formData.prefixes.includes("PL") && formData.handing) {
      const handingCode = formData.handing === "Left Hand" ? "LHR" : "RHR";
      key += `-${handingCode}`;
    }

    const partNumbers =
      formData.stile === "Wide" ? partsData.wideRails : partsData.narrowRails;
    const partNumberEntry = partNumbers[key] || "Not Found";

    const [basePartNumber, note] = partNumberEntry.split(" - ");

    if (basePartNumber === "Not Available") {
      setPartNumber("Not Available");
      setNote("This size is not available. Please try the next size up.");
      return;
    }

    const generatedNumber =
      basePartNumber !== "Not Found"
        ? `${basePartNumber}-${formData.finish}`
        : "Not Found";

    setPartNumber(generatedNumber);
    setNote(note || "");
  };

  const handleReset = () => {
    setFormData({
      stile: "",
      lexan: "No",
      prefixes: [],
      size: "",
      finish: "",
      handing: "",
    });
    setPartNumber("");
    setNote("");
    setShowHandingDropdown(false);
    setDisabledPrefixes([]);
  };

  // Optional custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
    }),
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  // Handler for react-select finish dropdown
  const handleFinishChange = (selectedOption) => {
    setFormData({ ...formData, finish: selectedOption ? selectedOption.value : "" });
  };

  return (
    <div className="app-container">
      <h1 className="Heading">
        Sargent <br />
        80 Series Exit Device <br />
        Rail Part Number Lookup
      </h1>

      <form onSubmit={handleSubmit} className="part-form">
        {/* Stile Type */}
        <div className="form-group">
          <label>Stile Type:</label>
          <select
            value={formData.stile}
            onChange={(e) =>
              setFormData({ ...formData, stile: e.target.value })
            }
            required
          >
            <option value="">Select Stile</option>
            {options.stile.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.display}
              </option>
            ))}
          </select>
        </div>

        {/* Lexan Pad */}
        <div className="form-group">
          <label>
            Remove the Black Lexan Pad? (should the rail have the 19- prefix):
          </label>
          <select
            value={formData.lexan}
            onChange={(e) =>
              setFormData({ ...formData, lexan: e.target.value })
            }
            required
          >
            {options.lexan.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Prefixes */}
        <div className="form-group">
          <label>Prefixes:</label>
          <div className="checkbox-group">
            {options.prefixes.map((prefix) => (
              <label key={prefix.code}>
                <input
                  type="checkbox"
                  value={prefix.code}
                  checked={formData.prefixes.includes(prefix.code)}
                  onChange={handlePrefixChange}
                  disabled={disabledPrefixes.includes(prefix.code)}
                />
                ({prefix.code}) -- {prefix.name}
              </label>
            ))}
          </div>
        </div>

        {/* Handing Dropdown (Conditional) */}
        {showHandingDropdown && (
          <div className="form-group">
            <label>Handing:</label>
            <select
              value={formData.handing}
              onChange={(e) =>
                setFormData({ ...formData, handing: e.target.value })
              }
              required
            >
              <option value="">Select Handing</option>
              {options.handing.map((handing) => (
                <option key={handing} value={handing}>
                  {handing}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Size */}
        <div className="form-group">
          <label>Size:</label>
          <select
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            required
          >
            <option value="">Select Size</option>
            {options.sizes.map((size) => (
              <option key={size.code} value={size.code}>
                {size.display}
              </option>
            ))}
          </select>
        </div>

        {/* Finish using react-select */}
        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={options.finishes}
            onChange={handleFinishChange}
            value={
              options.finishes.find((f) => f.value === formData.finish) || null
            }
            placeholder="Select Finish"
            components={{ Option: FinishOption, SingleValue: FinishSingleValue }}
            styles={customStyles}
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

      {/* Display Generated Part Number */}
      {partNumber && (
        <div ref={resultRef} className="result-container">
          <h2>Found Part Number:</h2>
          <div className="part-number">
            {partNumber}
            {note && <span className="note"> ({note})</span>}
          </div>
          {partNumber === "Not Available" && (
            <div className="note">
              This size is not available. Please try the next size up.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RailsForm;
