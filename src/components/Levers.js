import React, { useState } from "react";
import Select, { components } from "react-select";
import images from "../images";
import leverStyleOptions from "./LeverStyles";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isSelected ? "#2ecc71" : provided.backgroundColor,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "black",
  }),
};

// Custom components for lever style (already defined)
const CustomLeverOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{
            width: "120px",
            height: "auto",
            marginRight: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        />
        <div>
          <h3 style={customStyles}>
            {props.data.label}
          </h3>

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
          width: "60px",
          height: "auto",
          marginRight: "15px",
          borderRadius: "8px",
        }}
      />
      <span>{props.data.label}</span>
    </div>
  </components.SingleValue>
);

// Custom components for finish dropdown (with images)
const FinishOption = (props) => {
  return (
    <components.Option {...props}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{
          width: "50px",
          height: "auto",
          marginRight: "10px",
          borderRadius: "8px",
          verticalAlign: "middle",
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
        }}
      />
      <span>{props.data.label}</span>
    </components.SingleValue>
  );
};

// Sample finish options (from your TrimsForm)
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

const platformOptions = [
  { value: "Cylindrical (Bored Locks)", label: "Cylindrical Locks (Bored Locks)" },
  { value: "DL Series", label: "DL Series (Bored Locks)" },
  { value: "Mortise", label: "Mortise Locks" },
  { value: "Exits", label: "Exit Devices" },
];

const Levers = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedLever, setSelectedLever] = useState(null);
  const [selectedFinish, setSelectedFinish] = useState(null);
  const [partNumber, setPartNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPlatform || !selectedLever) {
      setPartNumber("Please select a platform and lever style.");
      return;
    }
  
    const parts = selectedLever.partNumbers?.[selectedPlatform.value];
    if (!parts) {
      setPartNumber("Part numbers not available for this combination.");
      return;
    }
  
    let finishText = selectedFinish ? ` ${selectedFinish.value}` : "";
    let result = "";
    if (typeof parts === "object") {
      result = `Inside: ${parts.inside || "N/A"}${finishText} <br /> Outside: ${parts.outside || "N/A"}${finishText}`;
    } else {
      result = `${parts.toString()}${finishText}`;
    }
  
    setPartNumber(result);
  };
  

  return (
    <div className="content-transition">
      <h1 className="Heading">
        Lever Selection Guide
        <br />
        <span style={{ fontSize: "1.2rem" }}>
          Choose your platform, lever style, and finish
        </span>
      </h1>

      <form onSubmit={handleSubmit} className="part-form">
        <div className="form-group">
          <label style={{ color: "black" }}>Platform Type:</label>
          <Select
            options={platformOptions}
            onChange={setSelectedPlatform}
            value={selectedPlatform}
            placeholder="Select Platform..."
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
          />
        </div>

        <div className="form-group">
          <label style={{ color: "black" }}>Lever Style:</label>
          <Select
            options={leverStyleOptions}
            onChange={setSelectedLever}
            value={selectedLever}
            isDisabled={!selectedPlatform}
            placeholder="Select Lever Style..."
            components={{
              Option: CustomLeverOption,
              SingleValue: CustomLeverSingleValue,
            }}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
          />
        </div>

        {/* New: Finish Dropdown */}
        <div className="form-group">
          <label style={{ color: "black" }}>Finish:</label>
          <Select
            options={finishOptions}
            onChange={setSelectedFinish}
            value={selectedFinish}
            placeholder="Select Finish..."
            components={{
              Option: FinishOption,
              SingleValue: FinishSingleValue,
            }}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="generate-button">
            Get Part Numbers
          </button>
          <button
            type="button"
            className="reset-button"
            onClick={() => {
              setSelectedPlatform(null);
              setSelectedLever(null);
              setSelectedFinish(null);
              setPartNumber("");
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {partNumber && (
        <div className="result-container">
          <h2>Part Numbers:</h2>
          <div
            className="part-number"
            dangerouslySetInnerHTML={{ __html: partNumber }}
          />
        </div>
      )}
    </div>
  );
};

export default Levers;
