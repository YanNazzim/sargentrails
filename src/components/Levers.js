import React, { useState, useEffect } from "react";
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
          <h3 style={customStyles}>{props.data.label}</h3>
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

const platformOptions = [
  { value: "10X Series", label: "10X Series (Bored Locks)" },
  { value: "DL Series", label: "DL Series (Bored Locks)" },
  { value: "Mortise", label: "Mortise Locks" },
  { value: "Exits", label: "Exit Devices" },
];

const radioOptions = [
  { value: "Plain", label: "Plain" },
  { value: "Push Button", label: "Push Button" },
  { value: "Thumb Turn", label: "Thumb Turn" },
  { value: "LFIC", label: "LFIC" },
  { value: "SFIC", label: "SFIC" },
  { value: "KESO", label: "KESO" },
];

const categoryOptions = [
  { value: "Standard", label: "Standard" },
  { value: "Milling", label: "Milling" },
  {
    value: "Red/Green Indicator Lever (VSLL)",
    label: "Red/Green Indicator (VSLL)",
    triggers: "VSLL-GRN"
  },
  {
    value: "Red/white Indicator Lever (VSLL)", // Lowercase 'w' in white
    label: "Red/White Indicator (VSLL)",
    triggers: "VSLL-WHT"
  }
];

const handingOptions = [
  { value: "LH", label: "Left Hand" },
  { value: "RH", label: "Right Hand" },
];

const leversRequiringHanding = [
  "A",
  "S",
  "G",
  "Y",
  "MV",
  "MU",
  "MT",
  "MS",
  "MQ",
  "MN",
  "MM",
  "ML",
  "MK",
  "MH",
  "MG",
  "MW",
  "MX",
  "MY",
  "MZ",
  "ND",
  "NF",
  "NI",
  "NJ",
  "NS",
  "NU",
  "VSLL-GRN",
  "VSLL-WHT"
];

const Levers = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedLever, setSelectedLever] = useState(null);
  const [selectedFinish, setSelectedFinish] = useState(null);
  const [selectedHanding, setSelectedHanding] = useState(null);
  const [partNumber, setPartNumber] = useState("");
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (selectedPlatform?.value !== "10X Series") {
      setSelectedCategory(null);
      setSelectedRadio(null);
    }
  }, [selectedPlatform]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finishText = selectedFinish ? ` ${selectedFinish.value}` : "";

    if (!selectedPlatform || !selectedLever) {
      setPartNumber("Please select a platform and lever style.");
      return;
    }

    if (leversRequiringHanding.includes(selectedLever.value) && !selectedHanding) {
      setPartNumber("Please select a handing.");
      return;
    }

    if (selectedPlatform.value === "10X Series") {
      if (!selectedCategory) {
        setPartNumber("Please select a category.");
        return;
      }
      if (!selectedRadio) {
        setPartNumber("Please select an option (LFIC, SFIC, KESO, etc.).");
        return;
      }
    }

    console.log('Selected Lever:', selectedLever);
    console.log('Platform:', selectedPlatform?.value);
    console.log('Category:', selectedCategory?.value);

    let parts;
    if (selectedPlatform.value === "10X Series") {
      parts = selectedLever.partNumbers?.[selectedPlatform.value]?.categories?.[selectedCategory.value];
      console.log('10X Series parts:', parts);
    } else {
      parts = selectedLever.partNumbers?.[selectedPlatform.value];
      console.log('Other platform parts:', parts);
    }

    let result = "";

    if (selectedPlatform.value === "10X Series") {
      const selectedOption = parts[selectedRadio];
      if (typeof selectedOption === "object") {
        result = `Inside: ${selectedOption.inside}${finishText} <br /> Outside: ${selectedOption.outside}${finishText}`;
      } else {
        result = `${selectedOption}${finishText}`;
      }
    } else {
      if (leversRequiringHanding.includes(selectedLever.value)) {
        const insidePart = parts.inside?.[selectedHanding.value] || "N/A";
        const outsidePart = parts.outside?.[selectedHanding.value] || "N/A";
        result = `Inside: ${insidePart}${finishText} <br /> Outside: ${outsidePart}${finishText}`;
      } else if (parts.inside && parts.outside) {
        result = `Inside: ${parts.inside}${finishText} <br /> Outside: ${parts.outside}${finishText}`;
      } else {
        result = `${parts.toString()}${finishText}`;
      }
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
            styles={customStyles}
          />
        </div>

        {selectedPlatform?.value === "10X Series" && (
          <div className="form-group">
            <label style={{ color: "black" }}>Category:</label>
            <Select
              options={categoryOptions}
              onChange={(selected) => {
                console.log('Selected Category:', selected);
                setSelectedCategory(selected);
                if (selected?.triggers) {
                  console.log('Looking for lever with value:', selected.triggers);
                  const vsllLever = leverStyleOptions.find(l => l.value === selected.triggers);
                  console.log('Found lever:', vsllLever);
                  setSelectedLever(vsllLever);
                } else {
                  setSelectedLever(null);
                }
              }}
              value={selectedCategory}
              placeholder="Select Category..."
              styles={customStyles}
            />
          </div>
        )}

        {selectedPlatform?.value === "10X Series" && selectedCategory && (
          <div className="form-group">
            <label style={{ color: "black" }}>Select Option:</label>
            <div>
              {radioOptions.map((option) => (
                <label key={option.value} style={{ marginRight: "10px" }}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={selectedRadio === option.value}
                    onChange={() => setSelectedRadio(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label style={{ color: "black" }}>Lever Style:</label>
          <Select
            // In the lever Select options filter:
            options={
              selectedPlatform
                ? leverStyleOptions.filter(lever => {
                  console.log('Checking lever:', lever.value);
                  if (selectedCategory?.triggers) {
                    console.log('Category trigger:', selectedCategory.triggers);
                    console.log('Match?', lever.value === selectedCategory.triggers);
                    return lever.value === selectedCategory.triggers;
                  }
                  const hasParts = !!lever.partNumbers[selectedPlatform.value];
                  console.log('Lever', lever.value, 'has parts for platform?', hasParts);
                  return hasParts;
                })
                : leverStyleOptions
            }
            onChange={(selectedOption) => {
              setSelectedLever(selectedOption);
              setSelectedHanding(null);
            }}
            value={selectedLever}
            isDisabled={!selectedPlatform}
            placeholder="Select Lever Style..."
            components={{
              Option: CustomLeverOption,
              SingleValue: CustomLeverSingleValue,
            }}
            styles={customStyles}
          />
        </div>

        {selectedLever && leversRequiringHanding.includes(selectedLever.value) && (
          <div className="form-group">
            <label style={{ color: "black" }}>Handing:</label>
            <Select
              options={handingOptions}
              onChange={setSelectedHanding}
              value={selectedHanding}
              placeholder="Select Handing..."
              styles={customStyles}
              required
            />
          </div>
        )}

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
              setSelectedHanding(null);
              setPartNumber("");
              setSelectedCategory(null);
              setSelectedRadio(null);
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