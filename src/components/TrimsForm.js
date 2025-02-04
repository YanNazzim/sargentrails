// TrimsForm.js
import React, { useState, useEffect, useRef } from "react";
import { partsData } from "../partsData"; // For non-7000 series, ensure partsData.trimsParts exists
import "../App.css";
import images from "../images"; // Adjust path as needed
import Select, { components } from "react-select";

// Custom Option for finish dropdown
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

// Custom SingleValue for finish dropdown
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

// NEW: Custom components for lever style selection with larger images
const CustomLeverOption = (props) => {
  return (
    <components.Option {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "200px", // Increased width for bigger image
          height: "auto",
          marginRight: "10px",
          verticalAlign: "middle",
          borderRadius: "25px",
        }}
      />
      <span>{props.data.label}</span>
    </components.Option>
  );
};

const CustomLeverSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "120px", // Increased width for bigger image
          height: "auto",
          marginRight: "10px",
          verticalAlign: "middle",
        }}
      />
      <span>{props.data.label}</span>
    </components.SingleValue>
  );
};

const customLeverStyles = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: "200px", // scrollable menu height
    overflowY: "auto",
  }),
  control: (provided) => ({ ...provided, minHeight: "50px" }),
  option: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
};

const TrimsForm = () => {
  const [formData, setFormData] = useState({
    series: "",
    device: "",
    // For non-7000 series:
    functionCode: "",
    // For 7000 series:
    outsideFunctionCode: "",
    insideFunctionCode: "",
    cylinderPrefixes: [],
    electricalPrefixes: [],
    doorThickness: "",
    trim: "",
    leverStyle: "",
    finish: "",
    handing: "",
  });
  const [partNumber, setPartNumber] = useState("");
  const [note, setNote] = useState("");
  const [warning, setWarning] = useState("");
  const resultRef = useRef(null);

  // Auto-scroll to results when part number updates
  useEffect(() => {
    if (partNumber && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [partNumber]);

  // For 7000 series, warn if function 73/74 is selected with any electrical prefix.
  useEffect(() => {
    if (formData.series === "7000") {
      if (
        (formData.outsideFunctionCode === "73" ||
          formData.outsideFunctionCode === "74" ||
          formData.insideFunctionCode === "73" ||
          formData.insideFunctionCode === "74") &&
        formData.electricalPrefixes.length > 0
      ) {
        setWarning(
          "If your 7000 series device has an ELR (Electric latch retraction) then you cannot pair it with this electrified trim function. Please choose a mechanical function."
        );
      } else {
        setWarning("");
      }
    }
  }, [
    formData.series,
    formData.outsideFunctionCode,
    formData.insideFunctionCode,
    formData.electricalPrefixes,
  ]);

  // Mapping series to available devices
  const devicesBySeries = {
    80: [
      { value: "8300", display: "8300" },
      { value: "8400", display: "8400" },
      { value: "8500", display: "8500" },
      { value: "8600", display: "8600" },
      { value: "8700", display: "8700" },
      { value: "NB-8700", display: "NB-8700" },
      { value: "8800", display: "8800" },
      { value: "8900", display: "8900" },
    ],
    PE80: [
      { value: "PE8300", display: "PE8300" },
      { value: "PE8400", display: "PE8400" },
      { value: "PE8500", display: "PE8500" },
      { value: "PE8600", display: "PE8600" },
      { value: "PE8700", display: "PE8700" },
      { value: "PENB-8700", display: "PENB-8700" },
      { value: "PE8800", display: "PE8800" },
      { value: "PE8900", display: "PE8900" },
    ],
    90: [
      { value: "9400", display: "9400" },
      { value: "9700", display: "9700" },
      { value: "9800", display: "9800" },
      { value: "9900", display: "9900" },
    ],
    7000: [{ value: "7000", display: "7000" }],
    20: [
      { value: "2100", display: "2100" },
      { value: "2200", display: "2200" },
      { value: "2300", display: "2300" },
    ],
    30: [
      { value: "3100", display: "3100" },
      { value: "3200", display: "3200" },
      { value: "3300", display: "3300" },
    ],
  };

  // Lever style options (NEW)
  const leverStyleOptions = [
    { value: "A", label: "A Lever (Handed)", image: images.LeverA },
    { value: "B", label: "B Lever", image: images.LeverB },
    { value: "E", label: "E Lever", image: images.LeverE },
    { value: "F", label: "F Lever", image: images.LeverF },
  ];

  // Function options (same for all series)
  const functionOptions = [
    { value: "04", label: "04 - Night Latch" },
    { value: "06", label: "06 - Store Room" },
    { value: "10", label: "10 - Dummy Trim" },
    { value: "13", label: "13 - Classroom" },
    { value: "15", label: "15 - Passage" },
    { value: "16", label: "16 - Classroom Intruder" },
    { value: "28", label: "28 - Passage Only (No cylinder) With Pull" },
    { value: "40", label: "40 - Freewheeling Dummy" },
    { value: "43", label: "43 - Freewheeling Classroom" },
    { value: "44", label: "44 - Freewheeling Night Latch" },
    { value: "46", label: "46 - Freewheeling Store Room" },
    {
      value: "62",
      label: "62 - Key unlocks Thumbpiece, Thumbpiece retracts latch",
    },
    { value: "63", label: "63 - Key Outside Unlocks/Locks Thumbpiece" },
    {
      value: "66",
      label: "66 - Key Outside Retracts Latch; Key Inside Unlocks/Lock",
    },
    { value: "73", label: "73 - Electrified ET Trim (Fail Safe)" },
    { value: "74", label: "74 - Electrified ET Trim (Fail Secure)" },
    {
      value: "75",
      label: "75 - Electrified ET Trim (Fail Safe, Key Retracts Latch)",
    },
    {
      value: "76",
      label: "76 - Electrified ET Trim (Fail Secure, Key Retracts Latch)",
    },
  ];

  // Define conflict mapping for non-7000 series devices.
  const functionConflicts = {
    "NB-8700": ["04", "16", "44", "75", "76", "28", "62", "63", "66"],
    8700: ["04", "16", "44", "75", "76", "66"],
    8800: ["62"],
    8900: ["62"],
    8500: ["75", "16", "76"],
    8400: ["04", "16", "44", "75", "76", "28", "62", "63", "66"],
    8300: ["06", "16", "46", "62", "66"],
    8600: ["04", "16", "44", "75", "76", "28", "62", "63", "66"],
  };

  // Electrical prefixes (checkboxes)
  const electricalPrefixes = [
    { code: "31", name: "Door Thickness Selector" },
    { code: "54", name: "Outside Lever Monitor micro switch" },
    {
      code: "55",
      name: "Inside Lever Monitor micro switch (For 7000 series only)",
    },
    { code: "76", name: "Tactile Warning - Milled Outside Lever" },
    { code: "86", name: "Tactile Warning - Abrasive Coating on Outside Lever" },
  ];

  // Cylinder prefixes (for multi-select)
  const cylinderPrefixes = [
    { code: "DG1", name: "DG1 — Degree Level 1 (Fixed Core)" },
    { code: "DG2", name: "DG2 — Degree Level 2 (Fixed Core)" },
    { code: "DG3", name: "DG3 — Degree Level 3 (Fixed Core)" },
    { code: "10", name: "10 — SARGENT Signature Key System" },
    { code: "11", name: "11 — XC Key System" },
    { code: "21", name: "21 — SARGENT Lost Ball Construction" },
    { code: "51", name: "51 — Removable Core Cylinder (Old Style)" },
    { code: "52", name: "52 — Removable Construction Core (Old Style)" },
    { code: "60", name: "60 — Large Format Interchangeable Core (Disposable)" },
    { code: "63", name: "63 — Large Format Interchangeable Core Cylinder" },
    { code: "64", name: "64 — Keyed Construction Core for LFIC" },
    { code: "65", name: "65 — Unassembled/Uncombined Core" },
    { code: "70", name: "70 — Accept 6/7-Pin SFIC Permanent Cores" },
    { code: "72", name: "72 — Accept 6/7-Pin SFIC (Keyed Construction Core)" },
    { code: "73", name: "73 — 6-Pin SFIC (Includes masterkeying)" },
  ];

  // Map cylinder prefixes to react‑select options.
  const cylinderPrefixOptions = cylinderPrefixes.map((prefix) => ({
    value: prefix.code,
    label: `${prefix.code} — ${prefix.name}`,
  }));

  // Conflict logic for cylinder multi-select:
  // If "65" is selected, allow only options that are in allowedFor65.
  const allowedFor65 = (val) => {
    return ["DG1", "DG2", "DG3"].includes(val) || val.startsWith("70");
  };

  const isCylinderOptionDisabled = (option) => {
    const selected = formData.cylinderPrefixes;
    if (selected.includes("65") && option.value !== "65") {
      return !allowedFor65(option.value);
    }
    if (option.value === "65") {
      if (selected.some((val) => val !== "65" && !allowedFor65(val))) {
        return true;
      }
    }
    return false;
  };

  // Define door thickness options.
  const doorThicknessOptions = [
    { value: "1-3/4", label: '1-3/4"' },
    { value: "1-7/8", label: '1-7/8"' },
    { value: "2", label: '2"' },
    { value: "2-1/8", label: '2-1/8"' },
    { value: "2-1/4", label: '2-1/4"' },
  ];

  // Define trim options.
  const trimOptions = [
    { value: "ET", label: "ET - 700 ET Trim W/ Lever" },
    { value: "FLL", label: "FLL - FL Pull Plate with L Pull" },
    { value: "FSL", label: "FSL - FS Pull Plate with L Pull" },
    { value: "FLW", label: "FLW - FL Pull Plate with W Pull" },
    { value: "FSW", label: "FSW - FS Pull Plate with W Pull" },
    { value: "MAL", label: "MAL - MA Pull Plate with L Pull" },
    { value: "MSL", label: "MSL - MS Pull Plate with L Pull" },
    { value: "STS", label: "STS - STS Pull (No Plate)" },
    { value: "PTB", label: "PTB - PT Pull Plate with B Pull" },
    { value: "PSB", label: "PSB - PS Pull Plate with B Pull" },
    { value: "862", label: '862 - 10" CTC | 4" Wide | 1" diameter' },
    { value: "863", label: '863 - 18" CTC | 4" Wide | 1" diameter' },
    { value: "864", label: '864 - 10" CTC | 3-1/2" Wide | 3/4" diameter' },
  ];

  // Finish options using react‑select with images.
  const finishOptions = [
    { value: "03", label: "03 - Brushed Nickel", image: images.finish03 },
    { value: "04", label: "04 - Polished Chrome", image: images.finish04 },
    { value: "09", label: "09 - Matte Black", image: images.finish09 },
    { value: "10", label: "10 - Satin Bronze", image: images.finish10 },
    { value: "10B", label: "10B - Antique Bronze", image: images.finish10B },
    {
      value: "10BE",
      label: "10BE - Oil-Rubbed Bronze",
      image: images.finish10BE,
    },
    { value: "10BL", label: "10BL - Black", image: images.finish10BL },
    { value: "14", label: "14 - Bright Brass", image: images.finish14 },
    { value: "15", label: "15 - Satin Gold", image: images.finish15 },
    { value: "20D", label: "20D - Dark Bronze", image: images.finish20D },
    { value: "26", label: "26 - Light Chrome", image: images.finish26 },
    { value: "26D", label: "26D - Dark Nickel", image: images.finish26D },
    { value: "BSP", label: "BSP - Brushed Stainless", image: images.finishBSP },
    { value: "WSP", label: "WSP - White Stainless", image: images.finishWSP },
  ];

  // Handlers for field changes
  const handleSeriesChange = (e) => {
    const newSeries = e.target.value;
    setFormData({
      ...formData,
      series: newSeries,
      device: newSeries === "7000" ? newSeries : "",
      functionCode: "",
      outsideFunctionCode: "",
      insideFunctionCode: "",
      cylinderPrefixes: [],
      electricalPrefixes: [],
      doorThickness: "",
      trim: "",
      leverStyle: "",
      finish: "",
      handing: "",
    });
    setWarning("");
  };

  const handleDeviceChange = (e) => {
    setFormData({
      ...formData,
      device: e.target.value,
    });
  };

  const handleFunctionChange = (e) => {
    setFormData({
      ...formData,
      functionCode: e.target.value,
    });
    if (
      (e.target.value === "73" || e.target.value === "74") &&
      formData.electricalPrefixes.length > 0
    ) {
      setWarning(
        "If your 7000 series device has an ELR (Electric latch retraction) then you cannot pair it with this electrified trim function. Please choose a mechanical function."
      );
    } else {
      setWarning("");
    }
  };

  const handleOutsideFunctionChange = (e) => {
    setFormData({
      ...formData,
      outsideFunctionCode: e.target.value,
    });
  };

  const handleInsideFunctionChange = (e) => {
    setFormData({
      ...formData,
      insideFunctionCode: e.target.value,
    });
  };

  const handleElectricalPrefixChange = (e) => {
    const code = e.target.value;
    const isChecked = e.target.checked;
    const updated = isChecked
      ? [...formData.electricalPrefixes, code]
      : formData.electricalPrefixes.filter((p) => p !== code);
    setFormData({
      ...formData,
      electricalPrefixes: updated,
    });
  };

  const handleCylinderPrefixChange = (selectedOptions) => {
    const newValues = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setFormData({
      ...formData,
      cylinderPrefixes: newValues,
    });
  };

  const handleFinishChange = (selectedOption) => {
    setFormData({
      ...formData,
      finish: selectedOption ? selectedOption.value : "",
    });
  };

  const handleDoorThicknessChange = (e) => {
    setFormData({
      ...formData,
      doorThickness: e.target.value,
    });
  };

  const handleTrimChange = (selectedOption) => {
    setFormData({
      ...formData,
      trim: selectedOption ? selectedOption.value : "",
    });
  };

  // NEW: Handler for lever style selection
  const handleLeverStyleChange = (selectedOption) => {
    setFormData({
      ...formData,
      leverStyle: selectedOption ? selectedOption.value : "",
    });
  };

  // Add this with your other conflict mappings
const trimConflicts = {
  // Format: "device-function": [allowed trims]
  "8800-04": ["FSL", "FSW", "MAL", "PSB", "STS"], // Trims with S as 2nd letter
  // Add more device-function pairs as needed
};

  // Compute available trim options based on selected function codes.
  const pullOnlyFunctions = ["28", "62", "63", "66"];
  const availableTrimOptions = (() => {
    // Existing pull trim logic
    let options = trimOptions;
    if (pullOnlyFunctions) {
      options = options.filter(opt => opt.value !== "ET");
    }
  
    // NEW: Trim conflicts check
    if (formData.series !== "7000") {
      const conflictKey = `${formData.device}-${formData.functionCode}`;
      if (trimConflicts[conflictKey]) {
        options = options.filter(opt => 
          trimConflicts[conflictKey].includes(opt.value)
        );
      }
    }
    
    return options;
  })();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.series === "7000") {
      const finishSuffix = formData.finish ? "-" + formData.finish : "";
      // For 7000 series, if trim is "ET", use leverStyle; otherwise use the selected trim.
      const trimText =
        formData.trim === "ET"
          ? formData.leverStyle
            ? formData.leverStyle
            : "ETL"
          : formData.trim
          ? formData.trim
          : "ETL";
      let outsideBase = formData.outsideFunctionCode.startsWith("0")
        ? "70" + Number(formData.outsideFunctionCode).toString()
        : "7" + formData.outsideFunctionCode;
      let insideBase = formData.insideFunctionCode.startsWith("0")
        ? "70" + Number(formData.insideFunctionCode).toString()
        : "7" + formData.insideFunctionCode;
      const insideTrim =
        "MP-" + insideBase + "-2 " + trimText + " LH" + finishSuffix;
      const outsideTrim = outsideBase + "-2 " + trimText + " RH" + finishSuffix;
      setPartNumber(`Inside: ${insideTrim} | Outside: ${outsideTrim}`);
      setNote("");
    } else {
      // For non-7000 series devices when using pull trims (trim !== "ET")
      if (formData.trim !== "ET") {
        const pullMapping = {
          "04": "814",
          10: "810",
          28: "828",
          63: "866",
          66: "866",
        };
        const mappedBase = pullMapping[formData.functionCode];
        if (mappedBase) {
          // Include the trim and finish with appropriate separators
          const trimPart = formData.trim ? ` ${formData.trim}` : "";
          const finishPart = formData.finish ? ` ${formData.finish}` : "";
          const finalNumber = `${mappedBase}${trimPart}${finishPart}`;
          setPartNumber(finalNumber);
          setNote("");
          return;
        }
      }
      // Otherwise, use partsData lookup.
      const lookupKey = `${formData.series}-${formData.device}-${formData.functionCode}`;
      const partEntry = partsData.trimsParts[lookupKey] || "Not Found";
      if (partEntry === "Not Found" || partEntry === "Not Available") {
        setPartNumber("Not Available");
        setNote("This configuration is not available. Please try another.");
        return;
      }
      let generatedNumber = partEntry;
      if (generatedNumber.includes("[handing]")) {
        generatedNumber = generatedNumber.replace(
          "[handing]",
          formData.handing
        );
      }
      if (generatedNumber.includes("[finish]")) {
        generatedNumber = generatedNumber.replace("[finish]", formData.finish);
      }
      if (generatedNumber.includes("[thickness]")) {
        generatedNumber = generatedNumber.replace(
          "[thickness]",
          formData.doorThickness
        );
      }
      if (generatedNumber.includes("[trim]")) {
        generatedNumber = generatedNumber.replace("[trim]", formData.trim);
      }
      if (generatedNumber.includes("[lever style]")) {
        generatedNumber = generatedNumber.replace(
          "[lever style]",
          formData.leverStyle
        );
      }
      setPartNumber(generatedNumber);
      setNote("");
    }
  };

  // Reset handler
  const handleReset = () => {
    setFormData({
      series: "",
      device: "",
      functionCode: "",
      outsideFunctionCode: "",
      insideFunctionCode: "",
      cylinderPrefixes: [],
      electricalPrefixes: [],
      doorThickness: "",
      trim: "",
      leverStyle: "",
      finish: "",
      handing: "",
    });
    setPartNumber("");
    setNote("");
    setWarning("");
  };

  // react‑select custom styles
  const customStyles = {
    control: (provided) => ({ ...provided, minHeight: "40px" }),
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  // Compute a display string for selected prefixes (for verification)
  const selectedPrefixesDisplay = [
    ...formData.electricalPrefixes,
    ...formData.cylinderPrefixes,
  ]
    .sort()
    .join("-");

  return (
    <div className="app-container">
      <h1 className="Heading">
        Trims Part Number Lookup
        <br />
        🚧Under Construction🚧
        <br />
        🛑 Do Not Use Yet 🛑
      </h1>
      <form onSubmit={handleSubmit} className="part-form">
        {/* Device Series */}
        <div className="form-group">
          <label>Device Series:</label>
          <select
            value={formData.series}
            onChange={handleSeriesChange}
            required
          >
            <option value="">Select Series</option>
            <option value="80">80</option>
            <option value="PE80">PE80</option>
            <option value="90">90</option>
            <option value="7000">7000</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        {/* Device (only for non-7000 series) */}
        {formData.series && formData.series !== "7000" && (
          <div className="form-group">
            <label>Device:</label>
            <select
              value={formData.device}
              onChange={handleDeviceChange}
              required
            >
              <option value="">Select Device</option>
              {devicesBySeries[formData.series]?.map((dev) => (
                <option key={dev.value} value={dev.value}>
                  {dev.display}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Function(s) */}
        {formData.series !== "7000" && formData.device && (
          <div className="form-group">
            <label>Function:</label>
            <select
              value={formData.functionCode}
              onChange={handleFunctionChange}
              required
            >
              <option value="">Select Function</option>
              {functionOptions.map((func) => {
                const isDisabled =
                  formData.device &&
                  functionConflicts[formData.device] &&
                  functionConflicts[formData.device].includes(func.value);
                return (
                  <option
                    key={func.value}
                    value={func.value}
                    disabled={isDisabled}
                  >
                    {isDisabled ? "(Not available) " : ""}
                    {func.label}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        {formData.series === "7000" && (
          <>
            <div className="form-group">
              <label>Outside Function:</label>
              <select
                value={formData.outsideFunctionCode}
                onChange={handleOutsideFunctionChange}
                required
              >
                <option value="">Select Outside Function</option>
                {functionOptions.map((func) => (
                  <option key={func.value} value={func.value}>
                    {func.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Inside Function:</label>
              <select
                value={formData.insideFunctionCode}
                onChange={handleInsideFunctionChange}
                required
              >
                <option value="">Select Inside Function</option>
                {functionOptions.map((func) => (
                  <option key={func.value} value={func.value}>
                    {func.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Handing (only for non-7000 series) */}
        {formData.series && formData.series !== "7000" && formData.device && (
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
              <option value="LHR">Left Hand Reverse (LHR)</option>
              <option value="RHR">Right Hand Reverse (RHR)</option>
            </select>
          </div>
        )}

        {/* Electrical Prefixes (checkboxes) */}
        {formData.series && (
          <div className="form-group">
            <label>Mechanical/Electrical Prefixes:</label>
            <div className="checkbox-group">
              {electricalPrefixes.map((prefix) => (
                <label key={prefix.code}>
                  <input
                    type="checkbox"
                    value={prefix.code}
                    checked={formData.electricalPrefixes.includes(prefix.code)}
                    onChange={handleElectricalPrefixChange}
                  />
                  {prefix.code} — {prefix.name}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Door Thickness (if electrical prefix "31" is selected) */}
        {formData.electricalPrefixes.includes("31") && (
          <div className="form-group">
            <label>Door Thickness:</label>
            <select
              value={formData.doorThickness}
              onChange={handleDoorThicknessChange}
              required
            >
              <option value="">Select Thickness</option>
              {doorThicknessOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Cylinder Prefixes as a multi-select */}
        {formData.series && (
          <div className="form-group">
            <label>Cylinder Prefixes:</label>
            <Select
              isMulti
              options={cylinderPrefixOptions}
              value={cylinderPrefixOptions.filter((opt) =>
                formData.cylinderPrefixes.includes(opt.value)
              )}
              onChange={handleCylinderPrefixChange}
              placeholder="Select Cylinder Prefixes"
              isOptionDisabled={isCylinderOptionDisabled}
              styles={customStyles}
            />
          </div>
        )}

        {/* Trim Selection */}
        <div className="form-group">
          <label>Trim:</label>
          <Select
            options={availableTrimOptions}
            onChange={handleTrimChange}
            value={
              trimOptions.find((opt) => opt.value === formData.trim) || null
            }
            placeholder="Select Trim"
            styles={customStyles}
          />
        </div>

        {/* NEW: Lever Style Selection for ET trim */}
        {formData.trim === "ET" && (
          <div className="form-group">
            <label>Lever Style:</label>
            <Select
              options={leverStyleOptions}
              onChange={handleLeverStyleChange}
              value={
                leverStyleOptions.find(
                  (opt) => opt.value === formData.leverStyle
                ) || null
              }
              placeholder="Select Lever Style"
              components={{
                Option: CustomLeverOption,
                SingleValue: CustomLeverSingleValue,
              }}
              styles={customLeverStyles}
            />
          </div>
        )}

        {/* Finish using react‑select */}
        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={finishOptions}
            onChange={handleFinishChange}
            value={
              finishOptions.find((f) => f.value === formData.finish) || null
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

      {/* Display Generated Part Number and additional info */}
      {partNumber && (
        <div ref={resultRef} className="result-container">
          <h2>Found Part Number:</h2>
          <div className="part-number">
            {selectedPrefixesDisplay} {partNumber}
          </div>
          {note && <div className="note">{note}</div>}
          {warning && (
            <div className="note" style={{ color: "red" }}>
              {warning}
            </div>
          )}
          {selectedPrefixesDisplay.length > 0 && (
            <div
              style={{ fontSize: "0.8em", color: "#666", marginTop: "0.5rem" }}
            >
              Selected Prefixes: {selectedPrefixesDisplay}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrimsForm;
