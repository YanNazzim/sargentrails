// src/components/MortiseSpindles.js
import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../App.css"; // Ensure App.css styles are applied

// MORTISE SPINDLE DATA - EXPORTED
export const spindleData = {
  "Standard Trim": { // Corresponds to "PART No." column
    "1-3/8 to 1-5/8": { partNo: "82-1625", dimension: { standard: "1.712", studio: "1.692" } },
    "1-3/4 to 2": { partNo: "82-1626", dimension: { standard: "1.900", studio: "1.880" } },
    "2-1/8 to 2-3/8": { partNo: "82-1627", dimension: { standard: "2.087", studio: "2.067" } },
    "2-1/2 to 2-3/4": { partNo: "82-1628", dimension: { standard: "2.274", studio: "2.254" } },
    "2-7/8 to 3-1/8": { partNo: "82-1629", dimension: { standard: "2.462", studio: "2.442" } },
    "3-1/4 to 3-1/2": { partNo: "82-1630", dimension: { standard: "2.650", studio: "2.630" } },
    "3-5/8 to 3-7/8": { partNo: "82-1631", dimension: { standard: "2.837", studio: "2.817" } },
    "4 to 4-1/4": { partNo: "82-1632", dimension: { standard: "3.024", studio: "3.004" } },
    "4-3/8 to 4-5/8": { partNo: "82-1633", dimension: { standard: "3.212", studio: "3.192" } },
    "4-3/4 to 5": { partNo: "82-1634", dimension: { standard: "3.399", studio: "3.379" } },
    "5-1/8 to 5-3/8": { partNo: "82-1635", dimension: { standard: "3.587", studio: "3.567" } },
    "5-1/2 to 5-3/4": { partNo: "82-1636", dimension: { standard: "3.774", studio: "3.754" } },
    "5-7/8 to 6": { partNo: "82-1637", dimension: { standard: "3.962", studio: "3.942" } },
    "4-1/4 to 4-1/2": { partNo: "82-1638", dimension: { standard: "4.149", studio: "4.129" } }, // New range
    "5-1/8 to 5-7/8": { partNo: "82-1639", dimension: { standard: "4.337", studio: "4.317" } }, // New range
    "5-1/2 to 6": { partNo: "82-1640", dimension: { standard: "4.524", studio: "4.504" } }, // New range
    "5-7/8 to 6.25": { partNo: "82-1641", dimension: { standard: "4.712", studio: "4.692" } }, // New range
  },
  "Studio Trim": { // Corresponds to "MAKE FROM PART No." column
    "1-3/8 to 1-5/8": { partNo: "82-0367", dimension: { standard: "1.712", studio: "1.692" } },
    "1-3/4 to 2": { partNo: "82-0368", dimension: { standard: "1.900", studio: "1.880" } },
    "2-1/8 to 2-3/8": { partNo: "82-0369", dimension: { standard: "2.087", studio: "2.067" } },
    "2-1/2 to 2-3/4": { partNo: "82-0370", dimension: { standard: "2.274", studio: "2.254" } },
    "2-7/8 to 3-1/8": { partNo: "82-0371", dimension: { standard: "2.462", studio: "2.442" } },
    "3-1/4 to 3-1/2": { partNo: "82-0372", dimension: { standard: "2.650", studio: "2.630" } },
    "3-5/8 to 3-7/8": { partNo: "82-0373", dimension: { standard: "2.837", studio: "2.817" } },
    "4 to 4-1/4": { partNo: "82-0374", dimension: { standard: "3.024", studio: "3.004" } },
    "4-3/8 to 4-5/8": { partNo: "82-0375", dimension: { standard: "3.212", studio: "3.192" } },
    "4-3/4 to 5": { partNo: "82-0376", dimension: { standard: "3.399", studio: "3.379" } },
    "5-1/8 to 5-3/8": { partNo: "82-0377", dimension: { standard: "3.587", studio: "3.567" } },
    "5-1/2 to 5-3/4": { partNo: "82-0378", dimension: { standard: "3.774", studio: "3.754" } },
    "5-7/8 to 6": { partNo: "82-0379", dimension: { standard: "3.962", studio: "3.942" } },
    // Additional ranges from the image for "MAKE FROM PART No." column
    "4-1/4 to 4-1/2": { partNo: "82-0380", dimension: { standard: "4.149", studio: "4.129" } },
    "5-1/8 to 5-7/8": { partNo: "82-0381", dimension: { standard: "4.337", studio: "4.317" } },
    "5-1/2 to 6": { partNo: "82-0382", dimension: { standard: "4.524", studio: "4.504" } },
    "5-7/8 to 6.25": { partNo: "82-0383", dimension: { standard: "4.712", studio: "4.692" } },
  },
};

// Helper function to convert fractional strings to decimal for sorting
const parseThicknessToDecimal = (thicknessStr) => {
  const parts = thicknessStr.split(" ");
  let decimalValue = 0;
  if (parts.length === 1) {
    decimalValue = parseFloat(thicknessStr);
  } else if (parts.length === 2) {
    const whole = parseFloat(parts[0]);
    const fractionParts = parts[1].split("/");
    if (fractionParts.length === 2) {
      const numerator = parseFloat(fractionParts[0]);
      const denominator = parseFloat(fractionParts[1]);
      decimalValue = whole + (numerator / denominator);
    }
  }
  return decimalValue;
};

// Sort the door thickness options numerically
const sortedDoorThicknessKeys = Object.keys(spindleData["Standard Trim"]).sort((a, b) => {
  const decimalA = parseThicknessToDecimal(a);
  const decimalB = parseThicknessToDecimal(b);
  return decimalA - decimalB;
});

const doorThicknessOptions = sortedDoorThicknessKeys.map((key) => ({
  value: key,
  label: `${key}"`,
}));

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
    color: "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isFocused ? "#007bff20" : "white",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px',
  }),
};

const MortiseSpindles = ({ initialData }) => {
  const [formData, setFormData] = useState({
    trimType: null,
    doorThickness: null,
  });
  const [partInfo, setPartInfo] = useState(null);

  useEffect(() => {
    if (initialData) {
      const thicknessOption = doorThicknessOptions.find(opt => opt.value === initialData.doorThickness);
      setFormData({
        trimType: initialData.trimType || null,
        doorThickness: thicknessOption || null
      });
      setPartInfo(null);
    }
  }, [initialData]);

  const handleTrimTypeChange = (e) => {
    setFormData({ ...formData, trimType: e.target.value });
    setPartInfo(null);
  };

  const handleDoorThicknessChange = (selectedOption) => {
    setFormData({ ...formData, doorThickness: selectedOption });
    setPartInfo(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { trimType, doorThickness } = formData;

    if (!trimType || !doorThickness) {
      setPartInfo({ partNo: "Please select both Trim Type and Door Thickness.", dimension: { standard: "", studio: "" } });
      return;
    }

    const foundPart = spindleData[trimType]?.[doorThickness.value];

    if (foundPart) {
      setPartInfo(foundPart);
    } else {
      setPartInfo({ partNo: "Part number not found for this selection. Please try another combination or contact TPS.", dimension: { standard: "", studio: "" } });
    }
  };

  const handleReset = () => {
    setFormData({
      trimType: null,
      doorThickness: null,
    });
    setPartInfo(null);
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">Mortise Spindles</h1>
      <form onSubmit={handleSubmit} className="part-form">
        <div className="form-group">
          <label>Trim Type:</label>
          <div className="radio-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
              <input
                type="radio"
                name="trimType"
                value="Standard Trim"
                checked={formData.trimType === "Standard Trim"}
                onChange={handleTrimTypeChange}
                required
              />
              Standard Trim (Rose/Escutcheons listed)
            </label>
            <label>
              <input
                type="radio"
                name="trimType"
                value="Studio Trim"
                checked={formData.trimType === "Studio Trim"}
                onChange={handleTrimTypeChange}
                required
              />
              Studio Trim (Rose/Escutcheons listed)
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Door Thickness:</label>
          <Select
            options={doorThicknessOptions}
            onChange={handleDoorThicknessChange}
            value={formData.doorThickness}
            placeholder="Select Door Thickness..."
            styles={customSelectStyles}
            required
            isDisabled={!formData.trimType}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="generate-button">
            Find Part Number
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>

      {partInfo && (
        <div className="result-container">
          <h2>Found Spindle Information:</h2>
          <div className="part-number">
            Part Number: {partInfo.partNo}
          </div>
          {partInfo.dimension && (
            <div className="part-number">
              Total Length of Spindle End to End:{" "}
              {formData.trimType === "Standard Trim"
                ? partInfo.dimension.standard
                : partInfo.dimension.studio}{" "}
              inches
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MortiseSpindles;