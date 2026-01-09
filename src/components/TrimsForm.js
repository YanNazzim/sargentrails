// src/components/TrimsForm.js
import React, { useState, useEffect, useRef } from "react";
import { trimsData } from "../trimsData"; 
import "../App.css";
import images from "../images"; 
import Select, { components } from "react-select";
import leverStyles from "./LeverStyles"

// Custom Option for finish dropdown
const FinishOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{
            width: "24px",
            height: "24px",
            marginRight: "10px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

const FinishSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{
            width: "20px",
            height: "20px",
            marginRight: "8px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );
};

// Custom Option for Lever Style
const CustomLeverOption = (props) => {
  const { partNumbers = {} } = props.data;

  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{
            width: "80px",
            height: "auto",
            marginRight: "20px",
            borderRadius: "8px",
            border: "1px solid var(--glass-border)",
          }}
        />
        <div>
          <h3 style={{ margin: "0 0 5px 0", color: "var(--accent-cyan)", fontSize: '1rem' }}>{props.data.label}</h3>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            {Object.entries(partNumbers).map(([platform, part]) => (
              <div key={platform}>
                <strong>{platform}:</strong>{" "}
                {typeof part === "object"
                  ? `${part.inside || "N/A"} / ${part.outside || "N/A"}`
                  : part || "N/A"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </components.Option>
  );
};

const CustomLeverSingleValue = (props) => (
  <components.SingleValue {...props}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "40px",
          height: "auto",
          marginRight: "15px",
          borderRadius: "4px",
        }}
      />
      <span>{props.data.label}</span>
    </div>
  </components.SingleValue>
);

const CustomTrimOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center", padding: "5px" }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{
            width: "auto",
            height: "80px",
            borderRadius: "4px",
            marginRight: "15px",
            border: "1px solid var(--glass-border)",
          }}
        />
        <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>
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
            height: "40px",
            borderRadius: "4px",
            marginRight: "10px"
          }}
        />
        <span style={{ fontWeight: "600" }}>
          {props.data.label}
        </span>
      </div>
    </components.SingleValue>
  );
};

const TrimsForm = ({ initialData }) => {
  const [formData, setFormData] = useState({
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
  const [partNumber, setPartNumber] = useState("");
  const [note, setNote] = useState("");
  const [warning, setWarning] = useState("");
  const resultRef = useRef(null);

  useEffect(() => {
    if (initialData && initialData.functionCode) {
      const newFormData = {
        series: initialData.series || "",
        device: initialData.device || "",
        functionCode: initialData.series !== "7000" ? initialData.functionCode || "" : "",
        outsideFunctionCode: "",
        insideFunctionCode: "", 
        cylinderPrefixes: [], 
        electricalPrefixes: [], 
        doorThickness: initialData.doorThickness || "",
        trim: initialData.trim || "",
        leverStyle: initialData.leverStyle || "",
        finish: initialData.finish || "",
        handing: initialData.handing || "",
      };
      setFormData(newFormData);
    }
  }, [initialData]); 

  useEffect(() => {
    if (partNumber && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [partNumber]);

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

  const noCylinderFunctions = ["10", "40", "15", "73", "74"];

  const shouldShowCylinderDropdown =
    formData.series !== "7000" &&
    formData.series !== "20" &&
    formData.series !== "30" &&
    !noCylinderFunctions.includes(formData.functionCode); 

  const functionOptions = [
    { value: "01", label: "01 - Blank Escutcheon Plate" },
    { value: "04", label: "04 - Night Latch - Key Retracts Latch" },
    { value: "06", label: "06 - Store Room - Key unlocks Trim, Trim retracts latch/Trim relocks when key is removed" },
    { value: "10", label: "10 - Dummy Trim - No outside operation (No Cylinder) - ET Control is used as Pull Only" },
    { value: "13", label: "13 - Classroom - Key Outside Unlocks/locks Trim" },
    { value: "15", label: "15 - Passage - (No cylinder)" },
    { value: "16", label: "16 - Classroom Intruder - Key Outside Retracts Latch/Key Inside Unlocks/Locks O/S Trim" },
    { value: "28", label: "28 - Passage Only (No cylinder) With Pull" },
    { value: "40", label: "40 - Freewheeling Dummy" },
    { value: "43", label: "43 - Freewheeling Classroom" },
    { value: "44", label: "44 - Freewheeling Night Latch" },
    { value: "46", label: "46 - Freewheeling Store Room" },
    { value: "62", label: "62 - Key unlocks Thumbpiece, Thumbpiece retracts latch" },
    { value: "63", label: "63 - Key Outside Unlocks/Locks Thumbpiece" },
    { value: "66", label: "66 - Key Outside Retracts Latch/Key Inside Unlocks/Lock Outside Trim" },
    { value: "73", label: "73 - Electrified ET Trim (Fail Safe)" },
    { value: "74", label: "74 - Electrified ET Trim (Fail Secure)" },
    { value: "75", label: "75 - Electrified ET Trim (Fail Safe, Key Retracts Latch)" },
    { value: "76", label: "76 - Electrified ET Trim (Fail Secure, Key Retracts Latch)" },
  ];

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

  const electricalPrefixes = [
    { code: "54", name: "Outside Lever Monitor micro switch" },
    { code: "55", name: "Inside Lever Monitor micro switch (For 7000 series only)" },
    { code: "76", name: "Tactile Warning - Milled Outside Lever" },
    { code: "86", name: "Tactile Warning - Abrasive Coating on Outside Lever" },
  ];

  const cylinderPrefixes = [
    { code: "LC", name: "Less Cylinder" },
    { code: "BR", name: "Bump Resistant Cylinder" },
    { code: "SC", name: "Schlage C keyway cylinder" },
    { code: "SE", name: "Schlage E keyway cylinder" },
    { code: "SF", name: "L Lever to accept Schlage® LFIC" },
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
    { code: "73", name: "6-Pin SFIC (Includes masterkeying)" },
    { code: "73-7P", name: "7-Pin SFIC (Includes masterkeying)" },
  ];
  
  const cylinderPrefixOptions = cylinderPrefixes.map((prefix) => ({
    value: prefix.code,
    label: `${prefix.code} — ${prefix.name}`,
  }));

  const cylinderDependencies = {
    DG1: ["21", "60", "63", "64", "65"],
    DG2: ["21", "60", "63", "64", "65"],
    DG3: ["21", "60", "63", "64", "65"],
    65: ["DG1", "DG2", "DG3", "70", "72", "73", "73-7P"],
    10: ["21", "63"],
    11: ["21", "60", "63", "64", "65", "70", "72", "73", "73-7P"],
  };

  const isCylinderOptionDisabled = (option) => {
    const selected = formData.cylinderPrefixes;
    for (const [dependency, allowedValues] of Object.entries(cylinderDependencies)) {
      if (selected.includes(dependency) && option.value !== dependency) {
        if (!allowedValues.includes(option.value)) {
          return true;
        }
      }
      if (option.value === dependency) {
        if (selected.some((val) => val !== dependency && !allowedValues.includes(val))) {
          return true;
        }
      }
    }
    return false;
  };

  const trimOptions = [
    { value: "WE", label: "WE - Wide Escutcheon", image: images.P700WE },
    { value: "NE", label: "NE - Narrow Escutcheon", image: images.P700NE },
    { value: "ET", label: "ET - ET Trim", image: images.ET700 },
    { value: "ER", label: "ER - ET Trim + Rectangular Plate", image: images.ER700 },
    { value: "ES", label: "ES - ET Trim + Sculpted Plate", image: images.ES700 },
    { value: "FLL", label: "FLL - FL Pull Plate with L Pull", image: images.PullFLL },
    { value: "FSL", label: "FSL - FS Pull Plate with L Pull", image: images.PullFLL },
    { value: "FLW", label: "FLW - FL Pull Plate with W Pull", image: images.PullFLW },
    { value: "FSW", label: "FSW - FS Pull Plate with W Pull", image: images.PullFLW },
    { value: "MAL", label: "MAL - MA Pull Plate with L Pull", image: images.PullMAL },
    { value: "MSL", label: "MSL - MS Pull Plate with L Pull", image: images.PullMAL },
    { value: "STS", label: "STS - STS Pull (No Plate)", image: images.PullSTS },
    { value: "PTB", label: "PTB - PT Pull Plate with B Pull", image: images.PullPTB },
    { value: "PSB", label: "PSB - PS Pull Plate with B Pull", image: images.PullPTB },
    { value: "862", label: '862 - 10" CTC | 4" Wide | 1" diameter', image: images.Pull862 },
    { value: "863", label: '863 - 18" CTC | 4" Wide | 1" diameter', image: images.Pull863 },
    { value: "864", label: '864 - 10" CTC | 3-1/2" Wide | 3/4" diameter', image: images.Pull864 },
  ];

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
    setFormData({ ...formData, device: e.target.value });
  };

  const handleFunctionChange = (e) => {
    const newFunction = e.target.value;
    setFormData((prev) => {
      const validTrims = getAvailableTrims(prev.series, prev.device, newFunction);
      return {
        ...prev,
        functionCode: newFunction,
        trim: validTrims.includes(prev.trim) ? prev.trim : validTrims[0], 
      };
    });
  };

  const handleOutsideFunctionChange = (e) => {
    const selectedFunction = e.target.value;
    const conflicts = functionConflicts[formData.device] || [];

    if (formData.series === "7000" && conflicts.includes(selectedFunction)) {
      setWarning(`Function ${selectedFunction} is not available for the 7000 series.`);
      return;
    }

    const newInsideFunction = selectedFunction === "16" ? "16" : formData.insideFunctionCode;

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
      setWarning(`Function ${selectedFunction} is not available for the 7000 series.`);
      return;
    }
    setFormData({ ...formData, insideFunctionCode: selectedFunction });
    setWarning("");
  };

  const handleElectricalPrefixChange = (e) => {
    const code = e.target.value;
    const isChecked = e.target.checked;
    const updated = isChecked
      ? [...formData.electricalPrefixes, code]
      : formData.electricalPrefixes.filter((p) => p !== code);
    setFormData({ ...formData, electricalPrefixes: updated });
  };

  const handleCylinderPrefixChange = (selectedOptions) => {
    const newValues = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setFormData({ ...formData, cylinderPrefixes: newValues });
  };

  const handleFinishChange = (selectedOption) => {
    setFormData({ ...formData, finish: selectedOption ? selectedOption.value : "" });
  };

  const handleTrimChange = (selectedOption) => {
    setFormData({ ...formData, trim: selectedOption ? selectedOption.value : "" });
  };

  const handleLeverStyleChange = (selectedOption) => {
    setFormData({ ...formData, leverStyle: selectedOption ? selectedOption.value : "" });
  };

  const getAvailableTrims = (series, device, functionCode) => {
    if (functionCode === "04" && (device === "8800" || device === "PE8800")) {
      return ["FSW", "FSL", "PSB", "MSL", "STS", "862", "863", "864", ...(series === "PE80" ? ["WE", "NE"] : ["ET"])];
    }
    if (functionCode === "04" || functionCode === "10") {
      return ["FLL", "FLW", "MAL", "PTB", "STS", "862", "863", "864", ...(series === "PE80" ? ["WE", "NE"] : ["ET"])];
    }
    if (["28", "62", "63", "66"].includes(functionCode)) {
      return ["FLL", "FLW", "MAL", "PTB", "STS"];
    }
    if (series === "7000") {
      return ["ET", "ER", "ES"];
    }
    return series === "PE80" ? ["WE", "NE"] : ["ET"];
  };

  const availableTrimOptions = trimOptions.filter((opt) =>
    getAvailableTrims(formData.series, formData.device, formData.functionCode).includes(opt.value)
  );

  const getTrimHardware = (series, thickness, basePartNumber) => {
    if (!basePartNumber) return { screws: ["Unknown Screws"], spindle: "Unknown Spindle" };
    const category = series.startsWith("7000") ? "7000" : "standard";
    const suffixMatch = basePartNumber.match(/-(8|4|2)$/);
    const suffix = suffixMatch ? suffixMatch[0] : "";
    const screws = trimsData.trimHardware[category]?.[thickness]?.screws || ["Unknown Screws"];
    const spindle = trimsData.trimHardware[category]?.[thickness]?.spindles?.[suffix] || "Unknown Spindle";
    return { screws, spindle };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.doorThickness) {
      setNote("⚠ Please select a door thickness before proceeding.");
      return;
    }
    if (!formData.trim) {
      setNote("⚠ Please select a trim before proceeding.");
      return;
    }

    const thickness = formData.doorThickness;
    const series = formData.series;
    let lookupKey = `${formData.series}-${formData.device}-${formData.functionCode}`;
    const partEntry = trimsData.trimsParts[lookupKey] || "Not Found";
    const basePartNumber = partEntry.split(" ")[0];

    let hardwareDetails = getTrimHardware(series, thickness, basePartNumber);
    let hardwareText = "";

    if (!Array.isArray(hardwareDetails.screws)) {
      hardwareText = "Hardware details not available";
    } else {
      if (formData.functionCode === "04") {
        hardwareText = hardwareDetails.screws.slice(0, 2).join(", ");
      } else if (formData.functionCode === "10") {
        hardwareText = hardwareDetails.screws[0] || "";
      } else {
        hardwareText = hardwareDetails.screws[0] + `<br />` + (hardwareDetails.spindle || "");
      }
    }

    if (["862", "863", "864"].includes(formData.trim)) {
      setPartNumber(`${formData.trim} ${formData.finish} ${formData.thickness} <br /> ${hardwareText}`);
      setNote("");
      return;
    }

    const getCylinderUsed = (lookupKey) => {
      const cylinderData = trimsData.cylinders && trimsData.cylinders[lookupKey];
      return cylinderData && thickness in cylinderData
        ? cylinderData[thickness]
        : "This device doesn’t use a cylinder or it may not be set up yet (Contact TPS)";
    };

    if (formData.series === "7000") {
      lookupKey = `7000-${formData.outsideFunctionCode}-${formData.insideFunctionCode}`;
    } else {
      lookupKey = `${formData.series}-${formData.device}-${formData.functionCode}`;
    }

    const cylinderUsed = getCylinderUsed(lookupKey);
    const needs31Prefix = thickness !== "1-3/4"; 
    const selectedPrefixesDisplay = [...formData.electricalPrefixes, ...formData.cylinderPrefixes].sort().join("-");

    if (formData.series === "7000") {
      if (["ET", "ER", "ES"].includes(formData.trim)) {
        const insidePrefix = formData.electricalPrefixes.includes("55") ? "55-" : "";
        const outsidePrefix = formData.electricalPrefixes.includes("54") ? "54-" : "";
        const generalPrefixes = formData.electricalPrefixes.filter((p) => p !== "55" && p !== "54");
        const generalPrefix = generalPrefixes.length > 0 ? generalPrefixes.join("-") + "-" : "";
        const insideFunction = formData.insideFunctionCode || "";
        const outsideFunction = formData.outsideFunctionCode || "";
        const trim = formData.trim || "";
        const lever = formData.leverStyle || "";
        const handing = formData.handing || "";
        const finish = formData.finish || "";

        const insidePartNumber = `${needs31Prefix ? "31-" : ""}MP-${insidePrefix}${generalPrefix}7${insideFunction}-2 ${trim}${lever} ${handing} ${finish} ${thickness}`;
        const outsidePartNumber = `${needs31Prefix ? "31-" : ""}${outsidePrefix}${generalPrefix}7${outsideFunction}-2 ${trim}${lever} ${handing} ${finish} ${thickness}`;
        const cylinderData = getCylinderUsed(lookupKey);

        if (typeof cylinderData === "object") {
          setPartNumber(`
            <strong style="color:var(--accent-purple)">Outside:</strong> ${outsidePartNumber} <br />
            <strong style="color:var(--accent-purple)">Inside:</strong> ${insidePartNumber} <br />
            <strong>Outside Cylinder:</strong> ${cylinderData.outside} <br />
            <strong>Inside Cylinder:</strong> ${cylinderData.inside} <br /> ${hardwareText}
          `);
        } else {
          setPartNumber(`
            <strong style="color:var(--accent-purple)">Outside:</strong> ${outsidePartNumber} <br />
            <strong style="color:var(--accent-purple)">Inside:</strong> ${insidePartNumber} <br />
            ${cylinderData} <br />
            ${hardwareText}
          `);
        }
        setNote("");
        return;
      }
    }

    if (["04", "10"].includes(formData.functionCode)) {
      if (["ET", "WE", "NE"].includes(formData.trim)) {
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
          <strong>Cylinder Used:</strong> ${cylinderUsed}<br />
          ${hardwareText}
        `);
        setNote("");
        return;
      }
    }

    const pullMapping = { "04": "814", 10: "810", 28: "828", 62: "866", 63: "866", 66: "866" };

    if (pullMapping[formData.functionCode]) {
      setPartNumber(`
        ${pullMapping[formData.functionCode]} ${formData.trim} ${formData.finish} ${thickness} <br />
        Cylinder Used: This device doesn’t use a cylinder or may not be set up yet (Contact TPS) <br />
      `);
      setNote("");
      return;
    }

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
      <strong>Cylinder Used:</strong> ${cylinderUsed} <br /> ${hardwareText}
    `);
    setNote("");
  };

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

  return (
    <div className="content-transition">
      <h1 className="title">
        Trims & Pulls <span style={{ fontSize: '0.6em', opacity: 0.7 }}>| 700 ET | P700 WE/NE</span>
      </h1>
      <form onSubmit={handleSubmit} className="part-form">
        <div className="form-group">
          <label>Device Series:</label>
          <select value={formData.series} onChange={handleSeriesChange} required>
            <option value="">Select Series</option>
            <option value="80">80</option>
            <option value="PE80">PE80</option>
            <option value="90">90</option>
            <option value="7000">7000</option>
          </select>
        </div>

        {formData.series && formData.series !== "7000" && (
          <div className="form-group">
            <label>Device:</label>
            <select value={formData.device} onChange={handleDeviceChange} required>
              <option value="">Select Device</option>
              {devicesBySeries[formData.series]?.map((dev) => (
                <option key={dev.value} value={dev.value}>{dev.display}</option>
              ))}
            </select>
          </div>
        )}

        {formData.series !== "7000" && formData.device && (
          <div className="form-group">
            <label>Function:</label>
            <select value={formData.functionCode} onChange={handleFunctionChange} required>
              <option value="">Select Function</option>
              {functionOptions.map((func) => {
                const isDisabled = formData.device && functionConflicts[formData.device] && functionConflicts[formData.device].includes(func.value);
                return <option key={func.value} value={func.value} disabled={isDisabled}>{isDisabled ? "(Not available) " : ""}{func.label}</option>;
              })}
            </select>
          </div>
        )}

        {formData.series === "7000" && (
          <>
            <div className="form-group">
              <label>Outside Function:</label>
              <select value={formData.outsideFunctionCode} onChange={handleOutsideFunctionChange} required>
                <option value="">Select Outside Function</option>
                {functionOptions.map((func) => {
                  const isDisabled = functionConflicts[formData.device] && functionConflicts[formData.device].includes(func.value);
                  return <option key={func.value} value={func.value} disabled={isDisabled}>{isDisabled ? "(Not available) " : ""}{func.label}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Inside Function:</label>
              <select value={formData.insideFunctionCode} onChange={handleInsideFunctionChange} required disabled={formData.outsideFunctionCode === "16"}>
                <option value="">Select Inside Function</option>
                {functionOptions.map((func) => {
                  const isDisabled = (formData.outsideFunctionCode === "16" && func.value !== "16") || functionConflicts[formData.device]?.includes(func.value);
                  return <option key={func.value} value={func.value} disabled={isDisabled}>{isDisabled ? "(Not available) " : ""}{func.label}</option>;
                })}
              </select>
            </div>
          </>
        )}

        {formData.series === "7000" ? (
          <div className="form-group">
            <label>Handing:</label>
            <select value={formData.handing} onChange={(e) => setFormData({ ...formData, handing: e.target.value })} required>
              <option value="">Select Handing</option>
              <option value="LHR">Left Hand Reverse (LHR) | Outside Trim = LH | Inside Trim = RH</option>
              <option value="RHR">Right Hand Reverse (RHR) Outside RH/Inside LH</option>
            </select>
          </div>
        ) : (
          formData.series && formData.device && (
            <div className="form-group">
              <label>Handing:</label>
              <select value={formData.handing} onChange={(e) => setFormData({ ...formData, handing: e.target.value })} required>
                <option value="">Select Handing</option>
                <option value="LHR">Left Hand Reverse (LHR)</option>
                <option value="RHR">Right Hand Reverse (RHR)</option>
              </select>
            </div>
          )
        )}

        {formData.series && (
          <div className="form-group">
            <label>Mechanical/Electrical Prefixes:</label>
            <div className="checkbox-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '8px' }}>
              {electricalPrefixes
                .filter((prefix) => formData.series === "7000" || prefix.code !== "55")
                .map((prefix) => (
                  <label key={prefix.code} style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                    <input
                      type="checkbox"
                      value={prefix.code}
                      checked={formData.electricalPrefixes.includes(prefix.code)}
                      onChange={handleElectricalPrefixChange}
                      style={{ marginRight: '10px' }}
                    />
                    <span><strong style={{ color: 'var(--accent-cyan)' }}>{prefix.code}</strong> — {prefix.name}</span>
                  </label>
                ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Door Thickness:</label>
          <select value={formData.doorThickness} onChange={(e) => setFormData({ ...formData, doorThickness: e.target.value })} required>
            <option value="">Select Thickness</option>
            <option value="1-3/4">1-3/4"</option>
            <option value="2">2"</option>
            <option value="2-1/4">2-1/4"</option>
            <option value="QSPAR">QSPAR for anything over 2-1/4"</option>
          </select>
        </div>

        {shouldShowCylinderDropdown && (
          <div className="form-group">
            <label>Cylinder Prefixes:</label>
            <Select
              isMulti
              options={cylinderPrefixOptions}
              value={cylinderPrefixOptions.filter((opt) => formData.cylinderPrefixes.includes(opt.value))}
              onChange={handleCylinderPrefixChange}
              placeholder="Select Cylinder Prefixes"
              isOptionDisabled={isCylinderOptionDisabled}
              classNamePrefix="react-select"
            />
          </div>
        )}

        <div className="form-group">
          <label style={{ fontSize: "1.5rem", marginBottom: "8px", color: "var(--accent-purple)" }}>Trim:</label>
          <Select
            options={availableTrimOptions}
            onChange={handleTrimChange}
            value={trimOptions.find((opt) => opt.value === formData.trim) || null}
            placeholder="Select Trim"
            components={{ Option: CustomTrimOption, SingleValue: CustomTrimSingleValue }}
            classNamePrefix="react-select"
          />
        </div>

        {((formData.series === "7000" && (formData.trim === "ET" || formData.trim === "ER" || formData.trim === "ES")) ||
          (formData.series !== "7000" && (formData.trim === "ET" || formData.trim === "WE" || formData.trim === "NE"))) && (
          <div className="form-group">
            <label>Lever Style:</label>
            <Select
              options={leverStyles}
              onChange={handleLeverStyleChange}
              value={leverStyles.find((opt) => opt.value === formData.leverStyle) || null}
              placeholder="Select Lever Style"
              components={{ Option: CustomLeverOption, SingleValue: CustomLeverSingleValue }}
              classNamePrefix="react-select"
            />
          </div>
        )}

        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={finishOptions}
            onChange={handleFinishChange}
            value={finishOptions.find((f) => f.value === formData.finish) || null}
            placeholder="Select Finish"
            components={{ Option: FinishOption, SingleValue: FinishSingleValue }}
            classNamePrefix="react-select"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="generate-button">Find Part Number</button>
          <button type="button" onClick={handleReset} className="reset-button">Reset</button>
        </div>
      </form>

      {partNumber && (
        <div ref={resultRef} className="result-container">
          <h2 className="title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Found Part Number:</h2>
          <div className="part-number" dangerouslySetInnerHTML={{ __html: formData.series === "7000" ? partNumber : `${partNumber}` }} />
          {note && <div className="note" style={{ color: 'var(--text-muted)', marginTop: '8px' }}>{note}</div>}
          {warning && <div className="note" style={{ color: "var(--accent-cyan)", fontWeight: 'bold' }}>{warning}</div>}
        </div>
      )}
    </div>
  );
};

export default TrimsForm;