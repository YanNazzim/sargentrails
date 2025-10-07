// src/components/ChassisForm.js
import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import images from "../images";
import "../App.css";
import partCombinations from "./partCombinations";

const ChassisForm = ({ initialData }) => {
  const [formData, setFormData] = useState({
    device: "",
    prefixes: [],
    function: "",
    handing: "",
    finish: "",
  });

  const [partNumber, setPartNumber] = useState("");
  const [relatedParts, setRelatedParts] = useState({
    chassis: "",
    innerChassis: "",
    chassisCover: "",
    coverScrews: "",
  });

  // This hook pre-fills the form when a search result is clicked
  useEffect(() => {
    if (initialData) {
      setFormData(prevData => ({
        ...prevData,
        device: initialData.device || "",
        // Reset other fields to ensure a clean state for the new search
        prefixes: [],
        function: "",
        handing: "",
        finish: "",
      }));
      // Clear previous results
      setPartNumber("");
      setRelatedParts({ chassis: "", innerChassis: "", chassisCover: "", coverScrews: "" });
    }
  }, [initialData]);


  // Define the devices with divisions for Narrow Stile and Wide Stile
  const devices = [
    // 80 Series Devices
    // Narrow Stile Devices
    { code: "8300", display: "8300 Mortise", stile: "Narrow" },
    { code: "MD8400", display: "MD8400 CVR", stile: "Narrow" },
    { code: "AD8400", display: "AD8400 CVR", stile: "Narrow" },
    { code: "8500", display: "8500 Rim", stile: "Narrow" },
    // Wide Stile Devices
    { code: "MD8600", display: "MD8600 CVR", stile: "Wide" },
    { code: "AD8600", display: "AD8600 CVR", stile: "Wide" },
    { code: "WD8600", display: "WD8600 CVR", stile: "Wide" },
    { code: "8700", display: "8700 SVR", stile: "Wide" },
    { code: "NB8700", display: "NB8700 SVR (New Style: Post 04/14/25)", stile: "Wide" },
    { code: "OLD8700", display: "NB8700 SVR (Old Style: Pre 04/14/25)", stile: "Wide" }, // <-- *** FIX IS HERE ***
    { code: "8800", display: "8800 Rim", stile: "Wide" },
    { code: "8900", display: "8900 Mortise", stile: "Wide" },
    
    //PE80 Series Devices
        // Narrow Stile Devices
        { code: "PE8300", display: "PE8300 Mortise", stile: "Narrow" },
        { code: "MD-PE8400", display: "MD-PE8400 CVR", stile: "Narrow" },
        { code: "AD-PE8400", display: "AD-PE8400 CVR", stile: "Narrow" },
        { code: "PE8500", display: "PE8500 Rim", stile: "Narrow" },
        // Wide Stile Devices
        { code: "MD-PE8600", display: "MD-PE8600 CVR", stile: "Wide" },
        { code: "AD-PE8600", display: "AD-PE8600 CVR", stile: "Wide" },
        { code: "WD-PE8600", display: "WD-PE8600 CVR", stile: "Wide" },
        { code: "PE8700", display: "PE8700 SVR", stile: "Wide" },
        { code: "PE-NB8700", display: "PE-NB8700 SVR (No Bottom Rod)", stile: "Wide" },
        { code: "PE8800", display: "PE8800 Rim", stile: "Wide" },
        { code: "PE8900", display: "PE8900 Mortise", stile: "Wide" },
        
  ];
    const handleFinishChange = (selectedOption) => {
    setFormData({
      ...formData,
      finish: selectedOption ? selectedOption.value : "",
    });
  };

  // Define the prefixes and their conflicts
  const prefixes = [
    { code: "12", name: "Fire Rated (No Dogging)" },
    { code: "49", name: "Inside Visual Indicator for 8816" },
    { code: "5CH", name: "5LB Maximum Force" },
    { code: "53", name: "Latchbolt Monitoring Switch" },
    {
      code: "59",
      name: "Electroguard® Delayed Egress",
    },
    { code: "AL", name: "Alarm" },
    { code: "GL", name: "Guarded Latch" },
    { code: "WS", name: "Windstorm Rated" },
    { code: "HC", name: "Hurricane Rated" },
    { code: "HC4", name: "Hurricane Rated (Stronger)" },
    { code: "FM", name: "FEMA Rated" },
  ];

  // Define the finishes
  const finish = [
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

  // Function to get parts for a specific combination
  const getPartsForCombination = (
    device,
    handing,
    selectedPrefixes,
    finish
  ) => {

    const key = `${device}-${handing}`;
    const combination = partCombinations[key];

    if (!combination) {
      return {
        chassis: `Part either not found or doesn't exist, Contact TPS`,
        innerChassis: `Part either not found or doesn't exist, Contact TPS`,
        chassisCover: `Part either not found or doesn't exist, Contact TPS`,
        coverScrews: `Part either not found or doesn't exist, Contact TPS`,
      };
    }

    // Replace "FINISH" placeholder with the actual finish value
    const applyFinish = (part) =>
      typeof part === "string" ? part.replace(/FINISH/g, finish) : part;

    let parts = { ...combination.base };
    parts.chassis = applyFinish(parts.chassis);
    parts.innerChassis = applyFinish(parts.innerChassis);
    parts.chassisCover = applyFinish(parts.chassisCover);
    parts.coverScrews = applyFinish(parts.coverScrews);

    // Apply prefix overrides
    const prefixOverrides = combination.base.prefixes;
    if (prefixOverrides) {
      const sortedSelected = [...selectedPrefixes].sort();
      const compositeKey = sortedSelected.join("-");

      if (prefixOverrides.hasOwnProperty(compositeKey)) {
        parts = { ...parts, ...prefixOverrides[compositeKey] };
      } else {
        selectedPrefixes.forEach((prefix) => {
          if (prefixOverrides.hasOwnProperty(prefix)) {
            parts = { ...parts, ...prefixOverrides[prefix] };
          }
        });
      }

      // Apply finish to overridden parts
      parts.chassis = applyFinish(parts.chassis);
      parts.innerChassis = applyFinish(parts.innerChassis);
      parts.chassisCover = applyFinish(parts.chassisCover);
      parts.coverScrews = applyFinish(parts.coverScrews);
    }

    return parts;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.device || !formData.finish || !formData.handing) {
      alert("Please fill out all required fields.");
      return;
    }
  
    const finishValue = formData.finish; 
  
    const parts = getPartsForCombination(
      formData.device,
      formData.handing,
      formData.prefixes,
      finishValue
    );
  
    setRelatedParts({
      chassis: parts.chassis,
      innerChassis: parts.innerChassis,
      chassisCover: parts.chassisCover,
      coverScrews: parts.coverScrews,
    });
  
    const prefixKey = formData.prefixes.sort().join("-");
    const key = `${prefixKey}-${formData.device}-${formData.function}${formData.handing ? `-${formData.handing}` : ""}`;
    setPartNumber(key); // Set partNumber to trigger result display
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      device: "",
      prefixes: [],
      function: "",
      handing: "",
      finish: "",
    });
    setPartNumber("");
    setRelatedParts({
      chassis: "",
      innerChassis: "",
      chassisCover: "",
      coverScrews: "",
    });
  };

    const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "40px",
    }),
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      borderRadius: "25px",
      color: "black",
    }),
  };

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
            borderRadius: "25px"
          }}
        />
        <span>{props.data.label}</span>
      </components.Option>
    );
  };

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
            borderRadius: "25px"
          }}
        />
        <span>{props.data.label}</span>
      </components.SingleValue>
    );
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">80/PE80 Series Chassis</h1>

      <form onSubmit={handleSubmit} className="part-form">
        {/* Device Selection */}
        <div className="form-group">
          <label>Device:</label>
          <select
            value={formData.device}
            onChange={(e) =>
              setFormData({ ...formData, device: e.target.value })
            }
            required
          >
            <option value="">Select Device</option>
            <optgroup label="Narrow Stile Devices">
              {devices
                .filter((device) => device.stile === "Narrow")
                .map((device) => (
                  <option key={device.code} value={device.code}>
                    {device.display}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Wide Stile Devices">
              {devices
                .filter((device) => device.stile === "Wide")
                .map((device) => (
                  <option key={device.code} value={device.code}>
                    {device.display}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>

        {/* Prefixes Grid */}
        <div className="form-group">
          <label>Prefixes:</label>
          <div className="checkbox-group">
            {prefixes.map((prefix) => (
              <label key={prefix.code}>
                <input
                  type="checkbox"
                  value={prefix.code}
                  checked={formData.prefixes.includes(prefix.code)}
                  onChange={(e) => {
                    const newPrefixes = e.target.checked
                      ? [...formData.prefixes, prefix.code]
                      : formData.prefixes.filter((p) => p !== prefix.code);
                    setFormData({ ...formData, prefixes: newPrefixes });
                  }}
                />
                <span className="custom-checkbox"></span>
                <span>
                  <strong>({prefix.code})</strong> — {prefix.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Handing Dropdown */}
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
            <option value="Left">Left Hand</option>
            <option value="Right">Right Hand</option>
          </select>
        </div>

        {/* Finish using react‑select */}
        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={finish}
            onChange={handleFinishChange}
            value={
              finish.find((f) => f.value === formData.finish) || null
            }
            placeholder="Select Finish"
            components={{
              Option: FinishOption,
              SingleValue: FinishSingleValue,
            }}
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

      {/* Display Generated Part Number and Related Parts */}
      {partNumber && (
        <div className="result-container">
          <h2>Found Part Numbers:</h2>

          {/* Display Related Parts */}
          <div className="part-number">
            <p>
              <strong>Chassis:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{ __html: relatedParts.chassis }}
              />
            </p>
            {relatedParts.innerChassis && (
              <p>
                <strong>Inner Chassis:</strong>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: relatedParts.innerChassis,
                  }}
                />
              </p>
            )}
            <p>
              <strong>Chassis Cover:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{ __html: relatedParts.chassisCover }}
              />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChassisForm;