// TrimsForm.js
import React, { useState, useEffect, useRef } from "react";
import { trimsData } from "../trimsData"; // Import trimsData instead of partsDataimport "../App.css";
import images from "../images"; // Adjust path as needed
import Select, { components } from "react-select";

const customTrimStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 10, // Ensures dropdown is not hidden behind other elements
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "250px", // Scrollable menu
    overflowY: "auto",
    padding: "10px",
  }),
  control: (provided, state) => ({
    ...provided,
    minHeight: "50px",
    borderRadius: "10px",
    border: state.isFocused ? "2px solid #007bff" : "1px solid #ccc",
    boxShadow: state.isFocused ? "0 0 5px rgba(0, 123, 255, 0.5)" : "none",
    "&:hover": {
      border: "2px solid #007bff",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    padding: "12px",
    backgroundColor: state.isFocused ? "#007bff20" : "white",
    borderRadius: "10px",
    transition: "background-color 0.2s",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
};

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
          width: "180px", // Increased width for bigger image
          height: "auto",
          marginRight: "10px",
          verticalAlign: "middle",
          borderRadius: "25px",
        }}
      />
      <span
        style={{
          fontSize: "2em",
          textAlign: "center",
        }}
      >
        {props.data.label}
      </span>
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

const CustomTrimOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center", padding: "5px" }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{
            width: "auto",
            height: "200px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          }}
        />
        <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
          {props.data.label}
        </span>
      </div>
    </components.Option>
  );
};

const CustomTrimSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{
            width: "auto",
            height: "120px",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        />
        <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
          {props.data.label}
        </span>
      </div>
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
          "If your 7000 series device has an ELR (Electric latch retraction) then you cannot pair it with this electrified trim function (73/74 function). Please choose a mechanical function."
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
      { value: "9700", display: "9700" },
      { value: "9800", display: "9800" },
      { value: "9900", display: "9900" },
    ],
    7000: [{ value: "7000", display: "7000" }],
  };

  // Define functions that do NOT require a cylinder
  const noCylinderFunctions = ["10", "40", "15", "73", "74"];

  // Check if cylinder dropdown should be shown
  const shouldShowCylinderDropdown =
    formData.series !== "7000" && // Exclude 7000 series
    formData.series !== "20" && // Exclude 20 series
    formData.series !== "30" && // Exclude 30 series
    !noCylinderFunctions.includes(formData.functionCode); // Hide if function is in noCylinderFunctions

  // Lever style options (NEW)
  const leverStyleOptions = [
    // Standard Levers
    { value: "A", label: "A Lever (Handed)", image: images.LeverA },
    { value: "B", label: "B Lever", image: images.LeverB },
    { value: "E", label: "E Lever", image: images.LeverE },
    { value: "F", label: "F Lever", image: images.LeverF },
    { value: "J", label: "J Lever", image: images.LeverJ },
    { value: "L", label: "L Lever", image: images.LeverL },
    { value: "P", label: "P Lever", image: images.LeverP },
    { value: "W", label: "W Lever", image: images.LeverW },

    // Coastal Series
    { value: "R", label: "R - Rockport Lever", image: images.LeverR },
    { value: "S", label: "S - Sanibel Lever (Handed)", image: images.LeverS },
    { value: "Y", label: "Y - Yarmouth Lever (Handed)", image: images.LeverY },
    { value: "G", label: "G - Gulfport Lever (Handed)", image: images.LeverG },

    // Centro Series
    { value: "MD", label: "MD Lever", image: images.LeverMD },
    { value: "MJ", label: "MJ Lever", image: images.LeverMJ },
    { value: "MP", label: "MP Lever", image: images.LeverMP },
    { value: "ND", label: "ND Lever", image: images.LeverND },
    { value: "NJ", label: "NJ Lever", image: images.LeverNJ },

    // Notting Hill Series
    { value: "MA", label: "MA Lever", image: images.LeverMA },
    { value: "MQ", label: "MQ Lever (Handed)", image: images.LeverMQ },
    { value: "MT", label: "MT Lever (Handed)", image: images.LeverMT },
    { value: "MO", label: "MO Lever ", image: images.LeverMO },
    { value: "MZ", label: "MZ Lever (Handed)", image: images.LeverMZ },
    { value: "GT", label: "GT Lever (Handed)", image: images.LeverGT },

    // Aventura Series
    { value: "MB", label: "MB Lever", image: images.LeverMB },
    { value: "ME", label: "ME Lever", image: images.LeverME },
    { value: "MF", label: "MF Lever", image: images.LeverMF },
    { value: "NF", label: "NF Lever", image: images.LeverNF },
    { value: "MG", label: "MG Lever", image: images.LeverMG },
    { value: "MI", label: "MI Lever", image: images.LeverMI },
    { value: "MW", label: "MW Lever", image: images.LeverMW },

    // Odeon Series
    { value: "MN", label: "MN Lever (Handed)", image: images.LeverMN },
    { value: "MH", label: "MH Lever (Handed)", image: images.LeverMH },
    { value: "MS", label: "MS Lever (Handed)", image: images.LeverMS },
    { value: "MU", label: "MU Lever (Handed)", image: images.LeverMU },
    { value: "MV", label: "MV Lever (Handed)", image: images.LeverMV },
    { value: "NU", label: "NU Lever (Handed)", image: images.LeverNU },
    { value: "WG", label: "WG Lever (Handed)", image: images.LeverWG },

    // Gramercy Series
    { value: "RCM", label: "RCM Lever", image: images.LeverRCM },
    { value: "RAL", label: "RAL Lever", image: images.LeverRAL },
    { value: "REM", label: "REM Lever", image: images.LeverREM },
    { value: "RAM", label: "RAM Lever", image: images.LeverRAM },
    { value: "RAS", label: "RAS Lever", image: images.LeverRAS },
    { value: "RAG", label: "RAG Lever", image: images.LeverRAG },
    { value: "RGM", label: "RGM Lever", image: images.LeverRGM },
    { value: "H015", label: "H015 Lever", image: images.LeverH015 },
    { value: "H016", label: "H016 Lever", image: images.LeverH016 },
    { value: "H017", label: "H017 Lever", image: images.LeverH017 },
    { value: "H018", label: "H018 Lever", image: images.LeverH018 },

    // Wooster Square
    { value: "H001", label: "H001 Lever", image: images.LeverH001 },
    { value: "H002", label: "H002 Lever", image: images.LeverH002 },
    { value: "H003", label: "H003 Lever", image: images.LeverH003 },
    { value: "H004", label: "H004 Lever", image: images.LeverH004 },
    { value: "H005", label: "H005 Lever", image: images.LeverH005 },
    { value: "H006", label: "H006 Lever", image: images.LeverH006 },
    { value: "H007", label: "H007 Lever", image: images.LeverH007 },
    { value: "H008", label: "H008 Lever", image: images.LeverH008 },
    { value: "H011", label: "H011 Lever", image: images.LeverH011 },
  ];

  // Function options (same for all series)
  const functionOptions = [
    { value: "01", label: "01 - Blank Escutcheon Plate" },
    { value: "04", label: "04 - Night Latch - Key Retracts Latch" },
    {
      value: "06",
      label:
        "06 - Store Room - Key unlocks Trim, Trim retracts latch/Trim relocks when key is removed",
    },
    {
      value: "10",
      label:
        "10 - Dummy Trim - No outside operation (No Cylinder) - ET Control is used as Pull Only",
    },
    { value: "13", label: "13 - Classroom - Key Outside Unlocks/locks Trim" },
    { value: "15", label: "15 - Passage - (No cylinder)" },
    {
      value: "16",
      label:
        "16 - Classroom Intruder - Key Outside Retracts Latch; Key Inside Unlocks/Locks O/S Trim",
    },
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
      label:
        "66 - Key Outside Retracts Latch; Key Inside Unlocks/Lock Outside Trim",
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
    7000: ["04", "28", "44", "62", "63", "66", "75", "76"],
    8300: ["01", "06", "16", "46", "62", "66"],
    8400: ["01", "04", "16", "44", "75", "76", "28", "62", "63", "66"],
    8500: ["01", "75", "16", "76", "28", "62", "63", "66"],
    8600: ["01", "04", "16", "44", "75", "76", "28", "62", "63", "66"],
    8700: ["01", "04", "16", "44", "75", "76", "66"],
    "NB-8700": ["01", "04", "16", "44", "75", "76", "28", "62", "63", "66"],
    8800: ["01", "62"],
    8900: ["01", "62"],
    "PENB-8700": ["01", "04", "16", "44", "75", "76", "66"],
    PE8700: ["01", "04", "16", "44", "75", "76", "66"],
    PE8800: ["01", "62"],
    PE8900: ["01", "62"],
    PE8500: ["01", "75", "16", "76", "28", "62", "63", "66"],
    PE8400: ["01", "04", "16", "44", "75", "76", "28", "62", "63", "66"],
    PE8300: ["01", "06", "16", "46", "62", "66"],
    PE8600: ["01", "04", "16", "44", "75", "76", "28", "62", "63", "66"],
    9700: ["01", "04", "16", "40", "43", "44", "46", "62", "63", "66", "75", "76"],
    9800: ["01", "06", "16", "40", "43", "44", "46", "62", "66"],
    9900: ["01", "06", "16", "40", "43", "44", "46", "62", "66"],
  };

  // Electrical prefixes (checkboxes)
  const electricalPrefixes = [
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
    { code: "LC", name: "Less Cylinder" },
    {
      code: "BR",
      name: "Bump Resistant Cylinder (Available with Conventional & Conventional XC Cylinders Only)",
    },
    {
      code: "SC",
      name: "Schlage C keyway cylinder, 0 bitted (not available with: 8904, 8916, 8944, 8975, 8976, 8866, 8304, 8344, 8375 & 8376)",
    },
    {
      code: "SE",
      name: "Schlage E keyway cylinder, 0 bitted (not available with: 8904, 8916, 8944, 8975, 8976, 8866, 8304, 8344, 8375 & 8376)",
    },
    {
      code: "SF",
      name: "L Lever to accept Schlage® large format interchangable core (supplied less core, tailpiece included)",
    },
    { code: "DG1", name: "Degree Level 1" },
    { code: "DG2", name: "Degree Level 2" },
    { code: "DG3", name: "Degree Level 3" },
    { code: "10", name: "SARGENT Signature Key System" },
    { code: "11", name: "XC Key System" },
    { code: "21", name: "SARGENT Lost Ball Construction" },
    { code: "51", name: "Removable Core Cylinder (Old Style)" },
    { code: "52", name: "Removable Construction Core (Old Style)" },
    { code: "60", name: "Large Format Interchangeable Core (Disposable)" },
    { code: "63", name: "Large Format Interchangeable Core Cylinder" },
    { code: "64", name: "Keyed Construction Core for LFIC" },
    { code: "65", name: "Unassembled/Uncombined Core" },
    { code: "70", name: "Accept 6/7-Pin SFIC Permanent Cores" },
    { code: "72", name: "Accept 6/7-Pin SFIC (Keyed Construction Core)" },
    {
      code: "73",
      name: "6-Pin SFIC (Includes masterkeying, grand masterkeying)",
    },
    {
      code: "73-7P",
      name: "7-Pin SFIC (Includes masterkeying, grand masterkeying)",
    },
  ];
  // Map cylinder prefixes to react‑select options.
  const cylinderPrefixOptions = cylinderPrefixes.map((prefix) => ({
    value: prefix.code,
    label: `${prefix.code} — ${prefix.name}`,
  }));

  // Conflict logic for cylinder multi-select:
  const cylinderDependencies = {
    DG1: ["21", "60", "63", "64", "65"],
    DG2: ["21", "60", "63", "64", "65"],
    DG3: ["21", "60", "63", "64", "65"],
    65: ["DG1", "DG2", "DG3", "70", "72", "73", "73-7P"],
    10: ["21", "63"],
    11: ["21", "60", "63", "64", "65", "70", "72", "73", "73-7P"],
    // Add more dependencies here as needed
  };

  const isCylinderOptionDisabled = (option) => {
    const selected = formData.cylinderPrefixes;

    // Check each dependency in the mapping
    for (const [dependency, allowedValues] of Object.entries(
      cylinderDependencies
    )) {
      if (selected.includes(dependency) && option.value !== dependency) {
        // If the dependency is selected, disable options not in its allowed values
        if (!allowedValues.includes(option.value)) {
          return true;
        }
      }
      if (option.value === dependency) {
        // If the option is the dependency itself, disable it if any selected value conflicts
        if (
          selected.some(
            (val) => val !== dependency && !allowedValues.includes(val)
          )
        ) {
          return true;
        }
      }
    }

    // If no conflicts, the option is not disabled
    return false;
  };

  // Define trim options.
  const trimOptions = [
    { value: "WE", label: "WE - Wide Escutcheon", image: images.P700WE },
    { value: "NE", label: "NE - Narrow Escutcheon", image: images.P700NE },
    { value: "ET", label: "ET - ET Trim", image: images.ET700 },
    {
      value: "ER",
      label: "ER - ET Trim + Rectangular Plate",
      image: images.ER700,
    },
    {
      value: "ES",
      label: "ES - ET Trim + Sculpted Plate",
      image: images.ES700,
    },
    {
      value: "FLL",
      label: "FLL - FL Pull Plate with L Pull",
      image: images.PullFLL,
    },
    {
      value: "FSL",
      label: "FSL - FS Pull Plate with L Pull",
      image: images.PullFLL,
    },
    {
      value: "FLW",
      label: "FLW - FL Pull Plate with W Pull",
      image: images.PullFLW,
    },
    {
      value: "FSW",
      label: "FSW - FS Pull Plate with W Pull",
      image: images.PullFLW,
    },
    {
      value: "MAL",
      label: "MAL - MA Pull Plate with L Pull",
      image: images.PullMAL,
    },
    {
      value: "MSL",
      label: "MSL - MS Pull Plate with L Pull",
      image: images.PullMAL,
    },
    { value: "STS", label: "STS - STS Pull (No Plate)", image: images.PullSTS },
    {
      value: "PTB",
      label: "PTB - PT Pull Plate with B Pull",
      image: images.PullPTB,
    },
    {
      value: "PSB",
      label: "PSB - PS Pull Plate with B Pull",
      image: images.PullPTB,
    },
    {
      value: "862",
      label: '862 - 10" CTC | 4" Wide | 1" diameter',
      image: images.Pull862,
    },
    {
      value: "863",
      label: '863 - 18" CTC | 4" Wide | 1" diameter',
      image: images.Pull863,
    },
    {
      value: "864",
      label: '864 - 10" CTC | 3-1/2" Wide | 3/4" diameter',
      image: images.Pull864,
    },
  ];

  // Finish options using react‑select with images.
  const finishOptions = [
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
    const newFunction = e.target.value;
    setFormData((prev) => {
      const validTrims = getAvailableTrims(
        prev.series,
        prev.device,
        newFunction
      );
      return {
        ...prev,
        functionCode: newFunction,
        trim: validTrims.includes(prev.trim) ? prev.trim : validTrims[0], // Auto-adjust trim
      };
    });
  };

  // Update handleOutsideFunctionChange in 7000 series section
  const handleOutsideFunctionChange = (e) => {
    const selectedFunction = e.target.value;
    const conflicts = functionConflicts[formData.device] || [];

    if (formData.series === "7000" && conflicts.includes(selectedFunction)) {
      setWarning(
        `Function ${selectedFunction} is not available for the 7000 series.`
      );
      return;
    }

    // NEW: Auto-set inside function to 16 when outside is 16
    const newInsideFunction =
      selectedFunction === "16" ? "16" : formData.insideFunctionCode;

    setFormData({
      ...formData,
      outsideFunctionCode: selectedFunction,
      insideFunctionCode: newInsideFunction,
    });
    setWarning("");
  };

  const handleInsideFunctionChange = (e) => {
    const selectedFunction = e.target.value;
    const conflicts = functionConflicts[formData.device] || [];

    if (formData.series === "7000" && conflicts.includes(selectedFunction)) {
      setWarning(
        `Function ${selectedFunction} is not available for the 7000 series.`
      );
      return;
    }

    setFormData({
      ...formData,
      insideFunctionCode: selectedFunction,
    });
    setWarning("");
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

  const getAvailableTrims = (series, device, functionCode) => {
    // 🔹 Function 04 on 8800/PE8800 (Special FS/MS/PS Pulls + ET/WE/NE)
    if (functionCode === "04" && (device === "8800" || device === "PE8800")) {
      return [
        "FSW",
        "FSL",
        "PSB",
        "MSL",
        "STS",
        "862",
        "863",
        "864",
        ...(series === "PE80" ? ["WE", "NE"] : ["ET"]), // PE80 → WE/NE | 80/90/7000 → ET
      ];
    }

    // 🔹 Function 04 on any other device (Regular FL/MA/PTB Pulls + ET/WE/NE)
    if (functionCode === "04" || functionCode === "10") {
      return [
        "FLL",
        "FLW",
        "MAL",
        "PTB",
        "STS",
        "862",
        "863",
        "864",
        ...(series === "PE80" ? ["WE", "NE"] : ["ET"]), // PE80 → WE/NE | 80/90/7000 → ET
      ];
    }

    // 🔹 Pull functions (28, 62, 63, 66)
    if (["28", "62", "63", "66"].includes(functionCode)) {
      return ["FLL", "FLW", "MAL", "PTB", "STS"];
    }

    if (series === "7000") {
      return ["ET", "ER", "ES"];
    }

    // 🔹 Trim-only functions
    return series === "PE80" ? ["WE", "NE"] : ["ET"];
  };

  // Get the list of valid trims
  const availableTrimOptions = trimOptions.filter((opt) =>
    getAvailableTrims(
      formData.series,
      formData.device,
      formData.functionCode
    ).includes(opt.value)
  );

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Prevent Submission if Door Thickness is Not Selected
    if (!formData.doorThickness) {
      setNote("⚠ Please select a door thickness before proceeding.");
      return;
    }

    const thickness = formData.doorThickness; // Now always required
    // 🔹 Handle 862, 863, 864 trims (Direct mapping)
    if (["862", "863", "864"].includes(formData.trim)) {
      setPartNumber(`${formData.trim} ${formData.finish} ${formData.thickness}`);
      setNote("");
      return;
    }

    // Helper function to lookup cylinder based on series-device-function and door thickness.
    const getCylinderUsed = (lookupKey) => {
      const cylinderData =
        trimsData.cylinders && trimsData.cylinders[lookupKey];

      return cylinderData && thickness in cylinderData
        ? cylinderData[thickness]
        : "This device doesn’t use a cylinder or it may not be set up yet (Contact TPS)";
    };

    // 🔹 Construct lookup key for both standard and 7000 series
    let lookupKey;

    if (formData.series === "7000") {
      lookupKey = `7000-${formData.outsideFunctionCode}-${formData.insideFunctionCode}`;
    } else {
      lookupKey = `${formData.series}-${formData.device}-${formData.functionCode}`;
    }

    const cylinderUsed = getCylinderUsed(lookupKey);

      // 🔹 Apply "31-" prefix if thickness is over 1-3/4"
  const needs31Prefix = thickness !== "1-3/4"; // Applies for "2", "2-1/4", "QSPAR"


    // 🔹 Special handling for 7000 series
    if (formData.series === "7000") {
      if (["ET", "ER", "ES"].includes(formData.trim)) {
        // Separate "55-" for inside and "54-" for outside
        const insidePrefix = formData.electricalPrefixes.includes("55")
          ? "55-"
          : "";
        const outsidePrefix = formData.electricalPrefixes.includes("54")
          ? "54-"
          : "";

        // Filter out "55" and "54" when generating general prefixes
        const generalPrefixes = formData.electricalPrefixes.filter(
          (p) => p !== "55" && p !== "54"
        );
        const generalPrefix =
          generalPrefixes.length > 0 ? generalPrefixes.join("-") + "-" : "";

        // Ensure required fields are not undefined
        const insideFunction = formData.insideFunctionCode || "";
        const outsideFunction = formData.outsideFunctionCode || "";
        const trim = formData.trim || "";
        const lever = formData.leverStyle || "";
        const handing = formData.handing || "";
        const finish = formData.finish || "";

        // Build the inside and outside part numbers
        const insidePartNumber = `${needs31Prefix ? "31-" : ""}MP-${insidePrefix}${generalPrefix}7${insideFunction}-2 ${trim}${lever} ${handing} ${finish} ${thickness}`;
        const outsidePartNumber = `${needs31Prefix ? "31-" : ""}${outsidePrefix}${generalPrefix}7${outsideFunction}-2 ${trim}${lever} ${handing} ${finish} ${thickness}`;

        // Use new lookup format
        const cylinderData = getCylinderUsed(lookupKey);

        // Construct the final output with trim and cylinder details.
        if (typeof cylinderData === "object") {
          setPartNumber(`
            <strong>Outside:</strong> ${outsidePartNumber} <br />
            <strong>Inside:</strong> ${insidePartNumber} <br />
            <strong>Outside Cylinder:</strong> ${cylinderData.outside} <br />
            <strong>Inside Cylinder:</strong> ${cylinderData.inside} <br />
          `);
        } else {
          setPartNumber(`
            <strong>Outside:</strong> ${outsidePartNumber} <br />
            <strong>Inside:</strong> ${insidePartNumber} <br />
            ${cylinderData} <br />
          `);
        }

        setNote("");
        return;
      }
    }

    // 🔹 Handling for 04 and 10 functions (ET, WE, or NE)
    if (["04", "10"].includes(formData.functionCode)) {
      if (["ET", "WE", "NE"].includes(formData.trim)) {
        const lookupKey = `${formData.series}-${formData.device}-${formData.functionCode}`;
        const partEntry = trimsData.trimsParts[lookupKey] || "Not Found";

        if (partEntry === "Not Found" || partEntry === "Not Available") {
          setPartNumber("Not Available");
          setNote("This configuration is not available. Please try another.");
          return;
        }

        let generatedNumber = partEntry
          .replace("[handing]", formData.handing)
          .replace("[finish]", formData.finish)
          .replace("[thickness]", thickness)
          .replace("[trim]", formData.trim)
          .replace("[lever style]", formData.leverStyle);

        setPartNumber(`
          ${needs31Prefix ? "31 " : ""}${selectedPrefixesDisplay} ${generatedNumber}<br />
          <strong>Cylinder Used:</strong> ${cylinderUsed} <br />
        `);

        setNote("");
        return;
      }
    }

    // 🔹 Handle pull functions (28, 62, 63, 66)
    const pullMapping = {
      "04": "814",
      10: "810",
      28: "828",
      62: "866",
      63: "866",
      66: "866",
    };

    if (pullMapping[formData.functionCode]) {
      setPartNumber(`
        ${pullMapping[formData.functionCode]} ${formData.trim} ${
        formData.finish
      } ${thickness} <br />
        Cylinder Used: This device doesn’t use a cylinder or may not be set up yet (Contact TPS)
      `);
      setNote("");
      return;
    }

    // 🔹 Default lookup in trimsData
    const partEntry = trimsData.trimsParts[lookupKey] || "Not Found";

    if (partEntry === "Not Found" || partEntry === "Not Available") {
      setPartNumber("Not Available");
      setNote("This configuration is not available. Please try another.");
      return;
    }

    let generatedNumber = partEntry
      .replace("[handing]", formData.handing)
      .replace("[finish]", formData.finish)
      .replace("[thickness]", formData.doorThickness)
      .replace("[trim]", formData.trim)
      .replace("[lever style]", formData.leverStyle);

    setPartNumber(`
      ${generatedNumber} <br />
      <strong>Cylinder Used:</strong> ${cylinderUsed} <br />
    `);
    setNote("");
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
        Sargent <br />
        Trims Part Number Lookup <br />
        700 ET/WE/NE & Pull Trims
        <br />
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
                {functionOptions.map((func) => {
                  const isDisabled =
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
            <div className="form-group">
              <label>Inside Function:</label>
              <select
                value={formData.insideFunctionCode}
                onChange={handleInsideFunctionChange}
                required
                disabled={formData.outsideFunctionCode === "16"}
              >
                <option value="">Select Inside Function</option>
                {functionOptions.map((func) => {
                  const isDisabled =
                    (formData.outsideFunctionCode === "16" &&
                      func.value !== "16") ||
                    functionConflicts[formData.device]?.includes(func.value);
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
          </>
        )}

        {formData.series === "7000" && (
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
              <option value="LHR">
                Left Hand Reverse (LHR) | Outside Trim = LH | Inside Trim = RH
              </option>
              <option value="RHR">
                Right Hand Reverse (RHR) Outside RH/Inside LH
              </option>
            </select>
          </div>
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
              {electricalPrefixes
                .filter(
                  (prefix) => formData.series === "7000" || prefix.code !== "55"
                ) // 👈 Hides '55' unless series is 7000
                .map((prefix) => (
                  <label key={prefix.code}>
                    <input
                      type="checkbox"
                      value={prefix.code}
                      checked={formData.electricalPrefixes.includes(
                        prefix.code
                      )}
                      onChange={handleElectricalPrefixChange}
                    />
                    {prefix.code} — {prefix.name}
                  </label>
                ))}
            </div>
          </div>
        )}

        {/* Door Thickness (Always Required) */}
        <div className="form-group">
          <label>Door Thickness:</label>
          <select
            value={formData.doorThickness}
            onChange={(e) =>
              setFormData({ ...formData, doorThickness: e.target.value })
            }
            required
          >
            <option value="">Select Thickness</option>
            <option value="1-3/4">1-3/4"</option>
            <option value="2">2"</option>
            <option value="2-1/4">2-1/4"</option>
            <option value="QSPAR">QSPAR for anything over 2-1/4"</option>
          </select>
        </div>

        {/* Cylinder Prefixes as a multi-select */}
        {shouldShowCylinderDropdown && (
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
              isOptionDisabled={isCylinderOptionDisabled} // Use the generic function here
              styles={customStyles}
            />
          </div>
        )}

        {/* Trim Selection */}
        <div className="form-group">
          <label
            style={{
              fontWeight: "bold",
              fontSize: "2em",
              marginBottom: "8px",
            }}
          >
            Trim:
          </label>
          <Select
            options={availableTrimOptions}
            onChange={handleTrimChange}
            value={
              trimOptions.find((opt) => opt.value === formData.trim) || null
            }
            placeholder="Select Trim"
            components={{
              Option: CustomTrimOption,
              SingleValue: CustomTrimSingleValue,
            }}
            styles={customTrimStyles} // New styling applied
          />
        </div>

        {((formData.series === "7000" &&
          (formData.trim === "ET" ||
            formData.trim === "ER" ||
            formData.trim === "ES")) ||
          (formData.series !== "7000" &&
            (formData.trim === "ET" ||
              formData.trim === "WE" ||
              formData.trim === "NE"))) && (
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
          <div
            className="part-number"
            dangerouslySetInnerHTML={{
              __html:
                formData.series === "7000"
                  ? partNumber
                  : `${partNumber}`,
            }}
          />

          {note && <div className="note">{note}</div>}
          {warning && (
            <div className="note" style={{ color: "red" }}>
              {warning}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrimsForm;
