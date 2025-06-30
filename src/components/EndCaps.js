// src/components/EndCaps.js
import React, { useState } from "react";
import Select, { components } from "react-select";
import images from "../images"; // Adjust path as needed
import "../App.css"; // Import the main CSS file

// Re-using custom components for Finish dropdown for consistency
const FinishOption = (props) => {
  return (
    <components.Option {...props}>
      {props.data.image && ( // Conditionally render image if available
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{
            width: "30px",
            height: "auto",
            marginRight: "10px",
            verticalAlign: "middle",
            borderRadius: "25px",
          }}
        />
      )}
      <span>{props.children}</span>
    </components.Option>
  );
};

const FinishSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      {props.data.image && ( // Conditionally render image if available
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{
            width: "30px",
            height: "auto",
            marginRight: "10px",
            verticalAlign: "middle",
            borderRadius: "25px",
          }}
        />
      )}
      <span>{props.children}</span>
    </components.SingleValue>
  );
};

const EndCaps = () => {
  const [formData, setFormData] = useState({
    series: null,
    prefixes: [],
    finish: null,
  });

  const [partNumber, setPartNumber] = useState("");

  // Define data for the form
  const seriesOptions = [
    { value: "80 Series", label: "80 Series" },
    { value: "PE80 Series", label: "PE80 Series" },
    { value: "20 Series", label: "20 Series" },
    { value: "30 Series", label: "30 Series" },
  ];

  const prefixesData = [
    { code: "43", name: "Flush End Cap", applicableSeries: ["80 Series"] },
    { code: "OL", name: "Overlapping End Cap", applicableSeries: ["PE80 Series"] },
  ];

  // Standard finish options
  const standardFinishOptions = [
    {
      value: "03",
      label: "03 - Bright brass, clear coated",
      image: images.finish03,
    },
    {
      value: "04",
      label: "04 - Satin brass, clear coated",
      image: images.finish04,
    },
    {
      value: "09",
      label: "09 - Bright bronze, clear coated",
      image: images.finish09,
    },
    {
      value: "10",
      label: "10 - Satin bronze, clear coated",
      image: images.finish10,
    },
    {
      value: "10B",
      label: "10B - Dark oxidized satin bronze, oil rubbed",
      image: images.finish10B,
    },
    {
      value: "10BE",
      label: "10BE - Dark oxidized satin bronze-equivalent",
      image: images.finish10BE,
    },
    {
      value: "10BL",
      label: "10BL - Dark oxidized satin bronze, clear coated",
      image: images.finish10BL,
    },
    {
      value: "14",
      label: "14 - Bright nickel plated, clear coated",
      image: images.finish14,
    },
    {
      value: "15",
      label: "15 - Satin nickel plated, clear coated",
      image: images.finish15,
    },
    {
      value: "20D",
      label: "20D - Dark oxidized statuary bronze, clear coated",
      image: images.finish20D,
    },
    {
      value: "26",
      label: "26 - Bright chromium plated over nickel",
      image: images.finish26,
    },
    {
      value: "26D",
      label: "26D - Satin chromium plated over nickel",
      image: images.finish26D,
    },
    {
      value: "32",
      label: "32 - Bright Stainless Steel",
      image: images.finish32,
    },
    {
      value: "32D",
      label: "32D - Satin Stainless Steel",
      image: images.finish32D,
    },
    {
      value: "BSP",
      label: "BSP - Black suede powder coat, sprayed",
      image: images.finishBSP,
    },
    {
      value: "WSP",
      label: "WSP - White suede powder coat, sprayed",
      image: images.finishWSP,
    },
  ];

  // Unique finishes for 30 Series
  const unique30SeriesFinishes = [
    { value: "EAB", label: "EAB - Satin brass painted, sprayed", image: images.finishEAB }, // No specific image provided
    { value: "EB", label: "EB - Dark bronze painted, sprayed", image: images.finishEB },
    { value: "ED", label: "ED - Flat black painted, sprayed", image: images.finishED },
    { value: "EN", label: "EN - Silver aluminum coated, sprayed", image: images.finishEN },
    { value: "EP", label: "EP - Light bronze painted, sprayed", image: images.finishEP },
  ];

  // Dynamically determine finish options based on selected series
  const currentFinishOptions =
    formData.series?.value === "30 Series"
      ? [...unique30SeriesFinishes, ...standardFinishOptions]
      : standardFinishOptions;

  // Logic to determine if a prefix checkbox should be disabled
  const isPrefixDisabled = (prefixCode) => {
    const selectedSeries = formData.series?.value;
    const prefixDef = prefixesData.find((p) => p.code === prefixCode);

    if (!selectedSeries || !prefixDef) {
      return true; // Disable if no series selected or prefix not found
    }

    // Disable if the current series is not applicable for this prefix
    return !prefixDef.applicableSeries.includes(selectedSeries);
  };

  // Custom styles for react-select components
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
      color: "black",
      borderRadius: "25px", // Apply border-radius to the control
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black",
      backgroundColor: state.isFocused ? "#007bff20" : "white",
      borderRadius: "25px", // Apply border-radius to options
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '4px',
    }),
  };

  // Handlers
  const handleSeriesChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      series: selectedOption,
      prefixes: [], // Clear prefixes when series changes
      finish: null, // Clear finish to force re-selection or ensure fresh state
    }));
    setPartNumber("");
  };

  const handlePrefixChange = (e) => {
    const prefixCode = e.target.value;
    const isChecked = e.target.checked;

    setFormData((prevData) => {
      let newPrefixes;
      if (isChecked) {
        // If adding a prefix, ensure only one of 43 or OL is selected
        const currentSelectedPrefixes = prevData.prefixes;
        const is43Selected = currentSelectedPrefixes.includes("43");
        const isOLSelected = currentSelectedPrefixes.includes("OL");

        if (prefixCode === "43" && isOLSelected) {
          // If 43 is being added and OL is already selected, remove OL
          newPrefixes = [...currentSelectedPrefixes.filter(p => p !== "OL"), prefixCode];
        } else if (prefixCode === "OL" && is43Selected) {
          // If OL is being added and 43 is already selected, remove 43
          newPrefixes = [...currentSelectedPrefixes.filter(p => p !== "43"), prefixCode];
        } else {
          // Otherwise, just add the new prefix
          newPrefixes = [...currentSelectedPrefixes, prefixCode];
        }
      } else {
        // If unchecking, just remove the prefix
        newPrefixes = prevData.prefixes.filter((p) => p !== prefixCode);
      }
      return { ...prevData, prefixes: newPrefixes };
    });
    setPartNumber("");
  };


  const handleFinishChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      finish: selectedOption,
    }));
    setPartNumber("");
  };

  // Define a mapping for end cap part numbers, including bracket and screws
  const endCapPartDetails = {
    "80 Series": {
      "default": { // Default for 80 Series if no specific prefix is selected
        endCap: "565",
        bracket: "Included in 565",
        screws: "68-3905",
      },
      "43": { // For "43 - Flush End Cap" on 80 Series
        endCap: "665",
        bracket: "Included in 665",
        screws: "68-3905",
      },
    },
    "PE80 Series": {
      "default": { // Default for PE80 Series if no specific prefix is selected
        endCap: "PE-0266",
        bracket: "PE-2626",
        screws: "68-3905",
      },
      "OL": { // For "OL - Overlapping End Cap" on PE80 Series
        endCap: "PE-0267",
        bracket: "PE-2630",
        screws: "68-3905",
      },
    },
    "20 Series": {
      "default": { // Default for 20 Series
        endCap: "68-0434",
        bracket: "68-2141",
        screws: "68-3905",
      },
    },
    "30 Series": {
      "default": { // Default for 30 Series
        endCap: "28-0110",
        bracket: "68-3367",
        screws: "68-3905",
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { series, prefixes, finish } = formData;

    if (!series || !finish) {
      alert("Please select a Series and Finish.");
      setPartNumber("");
      return;
    }

    let selectedParts;
    const seriesKey = series.value;
    const selectedPrefix = prefixes[0]; // Get the first (and only) selected prefix

    if (endCapPartDetails[seriesKey]) {
      selectedParts = endCapPartDetails[seriesKey][selectedPrefix] || endCapPartDetails[seriesKey]["default"];
    } else {
      setPartNumber("Part number details not found for selected series.");
      return;
    }

    let endCapPart = selectedParts.endCap;
    // Conditionally append finish to endCapPart based on series
    if (seriesKey !== "20 Series") {
      endCapPart = `${endCapPart}-${finish.value}`;
    }

    const bracketPart = selectedParts.bracket; // No finish appended to bracket
    const screwsPart = `${selectedParts.screws}-${finish.value}`; // Finish appended to screws

    // Combine all parts with line breaks
    setPartNumber(
      `End Cap: ${endCapPart}<br />` +
      `Mounting Bracket: ${bracketPart}<br />` +
      `End Cap Screws: ${screwsPart}`
    );
  };

  const handleReset = () => {
    setFormData({
      series: null,
      prefixes: [],
      finish: null,
    });
    setPartNumber("");
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">Exit Device End Caps</h1>
      <form onSubmit={handleSubmit} className="part-form">
        {/* Series Selection */}
        <div className="form-group">
          <label>Series:</label>
          <Select
            options={seriesOptions}
            onChange={handleSeriesChange}
            value={formData.series}
            placeholder="Select Series..."
            styles={customSelectStyles}
            required
          />
        </div>

        {/* Prefixes Checkboxes */}
        <div className="form-group">
          <label>Prefixes:</label>
          <div className="checkbox-group">
            {prefixesData.map((prefix) => (
              <label
                key={prefix.code}
                className={isPrefixDisabled(prefix.code) ? "disabled" : ""}
              >
                <input
                  type="checkbox"
                  value={prefix.code}
                  checked={formData.prefixes.includes(prefix.code)}
                  onChange={handlePrefixChange}
                  disabled={isPrefixDisabled(prefix.code)}
                />
                <span className="custom-checkbox"></span>
                <span>
                  <strong>({prefix.code})</strong> — {prefix.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Finish Selection */}
        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={currentFinishOptions} // Use dynamically determined finish options
            onChange={handleFinishChange}
            value={formData.finish}
            placeholder="Select Finish..."
            components={{ Option: FinishOption, SingleValue: FinishSingleValue }}
            styles={customSelectStyles}
            required
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
      {partNumber && (
        <div className="result-container">
          <h2>Found Part Number:</h2>
          <div
            className="part-number"
            dangerouslySetInnerHTML={{ __html: partNumber }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default EndCaps;