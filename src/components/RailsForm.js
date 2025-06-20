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
          borderRadius: "25px",
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
          borderRadius: "25px",
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
    prefixes: [],
    size: "",
    finish: "",
    handing: "",
  });
  const [partNumber, setPartNumber] = useState("");
  const [note, setNote] = useState("");
  const [showHandingDropdown, setShowHandingDropdown] = useState(false);

  // Create a ref for the result container (for auto-scrolling)
  const resultRef = useRef(null);

  // Auto-scroll to the result container when partNumber is updated
  useEffect(() => {
    if (partNumber && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [partNumber]);

  const options = {
    stile: [
      { code: "Narrow", display: "Narrow Stile - 8300, 8400, 8500" },
      { code: "Wide", display: "Wide Stile - 8600, 8700, NB-8700, 8800, 8900" },
      { code: "LowProfile", display: "Low Profile - LP8600, LR8600, LS8600" },
      { code: "DummyRailInActive", display: "8893 In-Active Dummy Rail" },
      { code: "DummyRailActive", display: "8895 Active Dummy Rail" },
      { code: "JellyFish", display: 'Vingcard "Jellyfish" Rail' },
    ],
    prefixes: [
      {
        code: "12",
        name: "Fire Rated (No Dogging)",
        conflicts: ["16", "56-HK"],
        conflictsWithStile: ["JellyFish", "DummyRailInActive"],
      },
            {
        code: "FM",
        name: "FEMA Rated (FM8700)",
        conflicts: ["16", "56-HK"],
        conflictsWithStile: ["Narrow", "JellyFish", "DummyRailInActive"],
      },
      {
        code: "19",
        name: "Remove 809 Lexan Pad (Blank all metal Push Pad)",
        conflicts: [],
        conflictsWithStile: ["JellyFish"],
      },
      {
        code: "5CH",
        name: "5LB Maximum Force",
        conflicts: ["58", "59", "SN", "IN"],
        conflictsWithStile: ["JellyFish", "DummyRailInActive"],
      },
      {
        code: "16",
        name: "Keyed Cylinder Dogging",
        conflicts: ["12", "59", "AL", "IN"],
        conflictsWithStile: ["JellyFish", "DummyRailInActive"],
      },
      {
        code: "53",
        name: "Latchbolt Monitoring Switch",
        conflicts: ["59", "SN", "IN"],
        conflictsWithStile: ["LowProfile", "JellyFish", "DummyRailInActive"],
      },
      {
        code: "55",
        name: "Request to Exit",
        conflicts: ["59", "SN", "IN"],
        conflictsWithStile: ["JellyFish", "DummyRailInActive"],
      },
      {
        code: "56",
        name: "Electric Latch Retraction",
        conflicts: ["58", "59", "AL", "BT"],
        conflictsWithStile: ["JellyFish", "DummyRailInActive"],
      },
      {
        code: "56-HK",
        name: "Electric Latch Retraction W/ Hex-Key Dogging",
        conflicts: ["56", "12", "58", "59", "AL", "IN"],
        conflictsWithStile: ["JellyFish", "DummyRailInActive"],
      },
      {
        code: "58",
        name: "Elecrtic Dogging",
        conflicts: ["56", "59", "SN", "IN"],
        conflictsWithStile: ["JellyFish", "DummyRailInActive"],
      },
      {
        code: "59",
        name: "Electroguard® Delayed Egress",
        conflicts: ["16", "53", "55", "56", "56-HK", "58", "AL", "SN", "IN"],
        conflictsWithStile: ["LowProfile", "JellyFish", "DummyRailInActive"],
      },
      {
        code: "AL",
        name: "Alarm",
        conflicts: ["16", "56", "59", "SN", "IN"],
        conflictsWithStile: ["JellyFish", "DummyRailInActive"],
      },
      {
        code: "PL",
        name: "Photo-Luminescent Rail (Non Electrified)",
        conflicts: ["SN", "IN"],
        conflictsWithStile: ["JellyFish", "DummyRailInActive"],
      },
      {
        code: "IN",
        name: "Rail to be used with IN100/IN120 Readers",
        conflicts: [
          "12",
          "16",
          "53",
          "55",
          "56",
          "56-HK",
          "58",
          "59",
          "AL",
          "5CH",
          "PL",
          "SN",
        ], // Updated conflicts for IN
        conflictsWithStile: [
          "DummyRailActive",
          "LowProfile",
          "JellyFish",
          "DummyRailInActive",
          "Narrow",
        ],
      },
      {
        code: "SN",
        name: "Rail to be used with SN200/SN210 Readers",
        conflicts: [
          "5CH",
          "53",
          "55",
          "58",
          "59",
          "AL",
          "PL",
          "IN",
        ], // New SN prefix conflicts
        conflictsWithStile: [
          "DummyRailActive",
          "LowProfile",
          "JellyFish",
          "DummyRailInActive",
          "Narrow",
        ],
      },
    ],
    sizes: {
      Narrow: [
        { code: "E", display: 'E - For openings 24" to 32"' },
        { code: "F", display: 'F - For openings 33" to 36"' },
        { code: "J", display: 'J - For openings 37" to 42"' },
        { code: "G", display: 'G - For openings 43" to 48"' },
      ],
      Wide: [
        { code: "E", display: 'E - For openings 24" to 32"' },
        { code: "F", display: 'F - For openings 33" to 36"' },
        { code: "J", display: 'J - For openings 37" to 42"' },
        { code: "G", display: 'G - For openings 43" to 48"' },
      ],
      LowProfile: [
        { code: "L", display: 'L - For openings 36"' },
        { code: "N", display: 'N - For openings 42" to 44"' },
        { code: "M", display: 'M - For openings 46" to 48"' },
      ],
      DummyRailActive: [
        { code: "E", display: 'E - For openings 24" to 32"' },
        { code: "F", display: 'F - For openings 33" to 36"' },
        { code: "J", display: 'J - For openings 37" to 42"' },
        { code: "G", display: 'G - For openings 43" to 48"' },
      ],
      DummyRailInActive: [
        { code: "E", display: 'E - For openings 24" to 32"' },
        { code: "F", display: 'F - For openings 33" to 36"' },
        { code: "J", display: 'J - For openings 37" to 42"' },
        { code: "G", display: 'G - For openings 43" to 48"' },
      ],
      JellyFish: [
        { code: "E", display: 'E - For openings 24" to 32"' },
        { code: "F", display: 'F - For openings 33" to 36"' },
        { code: "J", display: 'J - For openings 37" to 42"' },
        { code: "G", display: 'G - For openings 43" to 48"' },
      ],
    },
    finishes: [
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
    ],
    handing: ["Left Hand", "Right Hand"],
  };

  useEffect(() => {
    console.log("Current Stile:", formData.stile);
    console.log("Available Sizes:", options.sizes[formData.stile]);
  }, [formData.stile, options.sizes]);

  const handlePrefixChange = (e) => {
    const prefixCode = e.target.value;
    const isChecked = e.target.checked;

    const selectedPrefix = options.prefixes.find((p) => p.code === prefixCode);

    const newPrefixes = isChecked
      ? [...formData.prefixes, prefixCode]
      : formData.prefixes.filter((p) => p !== prefixCode);

    let newDisabledPrefixes = [...disabledPrefixes];

    if (selectedPrefix?.conflicts) {
      if (isChecked) {
        newDisabledPrefixes = [
          ...newDisabledPrefixes,
          ...selectedPrefix.conflicts,
        ];
      } else {
        newDisabledPrefixes = newDisabledPrefixes.filter(
          (code) => !selectedPrefix.conflicts.includes(code)
        );
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

  useEffect(() => {
    const styleConflict = options.prefixes
      .filter(
        (prefix) =>
          prefix.conflictsWithStile &&
          prefix.conflictsWithStile.includes(formData.stile)
      )
      .map((prefix) => prefix.code);

    if (
      formData.prefixes.some((prefixCode) => styleConflict.includes(prefixCode))
    ) {
      const newPrefixes = formData.prefixes.filter(
        (prefixCode) => !styleConflict.includes(prefixCode)
      );
      setFormData({ ...formData, prefixes: newPrefixes });
    }
  }, [formData, options.prefixes]);

  const styleConflictPrefixes = options.prefixes
    .filter(
      (prefix) =>
        prefix.conflictsWithStile &&
        prefix.conflictsWithStile.includes(formData.stile)
    )
    .map((prefix) => prefix.code);
  const effectiveDisabledPrefixes = [
    ...new Set([...disabledPrefixes, ...styleConflictPrefixes]),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const prefixKey = formData.prefixes.sort().join("-");

    let key;
    if (formData.prefixes.includes("PL") && formData.handing) {
      const handingCode = formData.handing === "Left Hand" ? "LHR" : "RHR";
      key = `${formData.stile}-${prefixKey}-${formData.size}-${handingCode}`;
    } else {
      key = `${formData.stile}-${prefixKey}-${formData.size}`;
    }

    const partNumbersCategory =
      formData.stile === "DummyRailInActive"
        ? partsData.DummyRailInActive
        : formData.stile === "DummyRailActive"
        ? partsData.DummyRailActive
        : formData.stile === "Wide"
        ? partsData.wideRails
        : formData.stile === "LowProfile"
        ? partsData.LowProfileRails
        : formData.stile === "JellyFish"
        ? partsData.JellyFishRails
        : partsData.narrowRails;

    const partNumberEntry = partNumbersCategory[key] || "Not Found";
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

  const handleFinishChange = (selectedOption) => {
    setFormData({
      ...formData,
      finish: selectedOption ? selectedOption.value : "",
    });
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">80 Series Exit Device Rails</h1>

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
                  disabled={effectiveDisabledPrefixes.includes(prefix.code)}
                />
                <span className="custom-checkbox"></span>
                <span>
                  <strong>({prefix.code})</strong> — {prefix.name}
                </span>
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

        {/* Size Dropdown */}
        <div className="form-group">
          <label>Size:</label>
          <Select
            value={
              formData.stile &&
              options.sizes[formData.stile]?.find(
                (size) => size.code === formData.size
              )
            }
            onChange={(selectedOption) =>
              setFormData({ ...formData, size: selectedOption?.code || "" })
            }
            options={formData.stile ? options.sizes[formData.stile] : []}
            getOptionLabel={(option) => option.display}
            getOptionValue={(option) => option.code}
            placeholder="Select Size"
            isDisabled={!formData.stile}
            styles={customStyles}
            required
          />
        </div>

        {/* Finish using react‑select */}
        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={options.finishes}
            onChange={handleFinishChange}
            value={
              options.finishes.find((f) => f.value === formData.finish) || null
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
          <button
            type="button"
            onClick={handleReset}
            className="generate-button"
          >
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