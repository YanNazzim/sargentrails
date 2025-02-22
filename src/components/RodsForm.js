import React, { useState } from "react";
import Select, { components } from "react-select"; // Import Select and components
import images from "../images"; // Adjust the path as needed

import "../App.css";

const RodsForm = () => {
  const [formData, setFormData] = useState({
    device: "",
    has5CHPrefix: false,
    hasAuxiliaryControl: false, // New state for 106/113 Auxiliary Control
    openingHeight: "",
    aff: "",
    finish: "",
  });

  const [partNumber, setPartNumber] = useState("");
  const [topRodParts, setTopRodParts] = useState([]);
  const [bottomRodParts, setBottomRodParts] = useState([]);
  const [topCaseParts, setTopCaseParts] = useState([]);
  const [bottomCaseParts, setBottomCaseParts] = useState([]);

  // Define the devices and their corresponding rod kits
  const devices = [
    // Surface Vertical Rods
    {
      code: "8700",
      display: "8700",
      topRodKit: "670T",
      topRodParts: [
        { code: "670T", description: "Top Rod Only", type: "Standard" },
        {
          code: `97-0020 x ${formData.finish}`,
          description: "Rod Guide",
          type: "Standard",
        },
        {
          code: "646",
          description: "Top Strike ~ Standard & 12- (Fire Rated)",
          type: "Standard",
        },
        {
          code: "659",
          description: "Top Strike ~ 12-(FM, HC, HC4) or just FM, HC, HC4",
          type: "12-",
        },
      ],
      bottomRodKit: "670B",
      bottomRodParts: [
        { code: "670B", description: "Bottom Rod Only", type: "Standard" },
        {
          code: `97-0020 x ${formData.finish}`,
          description: "Rod Guide",
          type: "Standard",
        },
        {
          code: "624",
          description: "Bottom Strike ~ Standard Device Only",
          type: "Standard",
        },
        {
          code: "655",
          description:
            "Bottom Strike ~ 12- (Fire Rated), HC-/HC4- (Hurricane Rated)",
          type: "12-",
        },
        {
          code: "653",
          description: "Bottom Strike ~ FM (FEMA Rated)",
          type: "FM",
        },
      ],
      topCaseParts: [
        {
          code: "97-2434",
          description: "Top Case Assembly ~ Manufactured Before 11/11/2002",
          type: "Standard",
        },
        {
          code: "68-4557",
          description: "Top Case Assembly ~ Manufactured After 11/11/2002",
          type: "Standard",
        },
        {
          code: `97-0018 x ${formData.finish}`,
          description: "Top Case Cover",
          type: "Standard",
        },
        {
          code: `68-3905 x ${formData.finish}`,
          description: "Top Case Cover Screws",
          type: "Standard",
        },

        {
          code: "97-2963",
          description: "Top Case Assembly ~ Manufactured Before 11/11/2002",
          type: "12-",
        },
        {
          code: "68-4559",
          description: "Top Case Assembly ~ Manufactured Before 11/11/2002",
          type: "12-",
        },
        {
          code: `97-0392 x ${formData.finish}`,
          description: "Top Case Cover",
          type: "12-",
        },
        {
          code: `68-3905 x ${formData.finish}`,
          description: "Top Case Cover Screws",
          type: "12-",
        },

        { code: "68-3933", description: "Top Case Assembly", type: "(12-)NB " },
        {
          code: `97-0392 x ${formData.finish}`,
          description: "Top Case Cover",
          type: "(12-)NB ",
        },
        {
          code: `68-3905 x ${formData.finish}`,
          description: "Top Case Cover Screws",
          type: "(12-)NB",
        },

        {
          code: "97-2003",
          description: "Top Case Assembly ~ Manufactured Before 11/11/2002",
          type: "(12-)(FM, HC, HC4)",
        },
        {
          code: "68-4561",
          description: "Top Case Assembly ~ Manufactured Before 11/11/2002",
          type: "(12-)(FM, HC, HC4)",
        },
        {
          code: `97-0084 x ${formData.finish}`,
          description: "Top Case Cover",
          type: "(12-)(FM, HC, HC4)",
        },
        {
          code: `68-3905 x ${formData.finish}`,
          description: "Top Case Cover Screws",
          type: "(12-)(FM, HC, HC4)",
        },
      ],
      bottomCaseParts: [
        {
          code: "97-2038",
          description: "Bottom Case Assembly ~ Manufactured Before 11/11/2002",
          type: "Standard",
        },
        {
          code: "68-4549",
          description: "Bottom Case Assembly ~ Manufactured After 11/11/2002",
          type: "Standard",
        },
        {
          code: `97-0018 x ${formData.finish}`,
          description: "Bottom Case Cover",
          type: "Standard",
        },

        {
          code: "97-2002",
          description: "Bottom Case Assembly ~ Manufactured Before 11/11/2002",
          type: "(12-)(FM, HC, HC4) ",
        },
        {
          code: "68-4558",
          description: "Bottom Case Assembly ~ Manufactured Before 11/11/2002",
          type: "(12-)(FM, HC, HC4) ",
        },
        {
          code: `97-0087 x ${formData.finish}`,
          description: "Bottom Case Cover",
          type: "(12-)(FM, HC, HC4) ",
        },
      ],
    },
    {
      code: "PE8700",
      display: "PE8700",
      topRodKit: "670T",
      topRodParts: [
        { code: "670T", description: "Top Rod Only", type: "Standard" },
        {
          code: `97-0020 x ${formData.finish}`,
          description: "Rod Guide",
          type: "Standard",
        },
        {
          code: "646",
          description: "Top Strike ~ Standard & 12- (Fire Rated)",
          type: "Standard",
        },
        {
          code: "659",
          description: "Top Strike ~ 12-(FM, HC, HC4) or just FM, HC, HC4",
          type: "12-",
        },
      ],
      bottomRodKit: "670B",
      bottomRodParts: [
        { code: "670B", description: "Bottom Rod Only", type: "Standard" },
        {
          code: `97-0020 x ${formData.finish}`,
          description: "Rod Guide",
          type: "Standard",
        },
        {
          code: "624",
          description: "Bottom Strike ~ Standard Device Only",
          type: "Standard",
        },
        {
          code: "655",
          description:
            "Bottom Strike ~ 12- (Fire Rated), HC-/HC4- (Hurricane Rated)",
          type: "12-",
        },
        {
          code: "653",
          description: "Bottom Strike ~ FM (FEMA Rated)",
          type: "FM",
        },
      ],
      topCaseParts: [
        { code: "68-4557", description: "Top Case Assembly", type: "Standard" },
        {
          code: `97-0018 x ${formData.finish}`,
          description: "Top Case Cover",
          type: "Standard",
        },
        {
          code: `68-3905 x ${formData.finish}`,
          description: "Top Case Cover Screws",
          type: "Standard",
        },

        { code: "68-4559", description: "Top Case Assembly", type: "12-" },
        {
          code: `97-0392 x ${formData.finish}`,
          description: "Top Case Cover",
          type: "12-",
        },
        {
          code: `68-3905 x ${formData.finish}`,
          description: "Top Case Cover Screws",
          type: "12-",
        },

        { code: "68-3933", description: "Top Case Assembly", type: "(12-)NB " },
        {
          code: `97-0392 x ${formData.finish}`,
          description: "Top Case Cover",
          type: "(12-)NB ",
        },
        {
          code: `68-3905 x ${formData.finish}`,
          description: "Top Case Cover Screws",
          type: "(12-)NB",
        },

        {
          code: "68-4561",
          description: "Top Case Assembly",
          type: "(12-)(FM, HC, HC4) ",
        },
        {
          code: `97-0084 x ${formData.finish}`,
          description: "Top Case Cover",
          type: "(12-)(FM, HC, HC4)",
        },
        {
          code: `68-3905 x ${formData.finish}`,
          description: "Top Case Cover Screws",
          type: "(12-)(FM, HC, HC4)",
        },
      ],
      bottomCaseParts: [
        {
          code: "68-4549",
          description: "Bottom Case Assembly",
          type: "Standard",
        },
        {
          code: `97-0018 x ${formData.finish}`,
          description: "Bottom Case Cover",
          type: "Standard",
        },
        {
          code: `68-3905 x ${formData.finish}`,
          description: "Top Case Cover Screws",
          type: "Standard",
        },

        {
          code: "68-4558",
          description: "Bottom Case Assembly",
          type: "(12-)(FM, HC, HC4)",
        },
        {
          code: `97-0087 x ${formData.finish}`,
          description: "Bottom Case Cover",
          type: "(12-)(FM, HC, HC4)",
        },
        {
          code: `68-3905 x ${formData.finish}`,
          description: "Top Case Cover Screws",
          type: "(12-)(FM, HC, HC4)",
        },
      ],
    },

    // Concealed Vertical Rods
    {
      code: "MD8600",
      display: "MD8600",
      topRodKit: "MD691T",
      topRodParts: [
        { code: "MD660T", description: "Top Rod Only" },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
      ],
      bottomRodKit: "691B",
      bottomRodParts: [
        { code: "660B", description: "Bottom Rod Only" },
        { code: "94-0039", description: "Bolt Sleeve" },
        { code: "01-4389", description: "Roll Pin" },
        { code: "97-0454", description: "Spring (Bottom Bolt)" },
        { code: "94-0038", description: "Bottom Bolt" },
      ],
    },
    {
      code: "AD8600",
      display: "AD8600",
      topRodKit: "MD691T",
      topRodParts: [
        { code: "MD660T", description: "Top Rod Only" },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
      ],
      bottomRodKit: "691B",
      bottomRodParts: [
        { code: "660B", description: "Bottom Rod Only" },
        { code: "94-0039", description: "Bolt Sleeve" },
        { code: "01-4389", description: "Roll Pin" },
        { code: "97-0454", description: "Spring (Bottom Bolt)" },
        { code: "94-0038", description: "Bottom Bolt" },
      ],
    },
    {
      code: "WD8600",
      display: "WD8600",
      topRodKit: "WD691T",
      topRodParts: [
        { code: "WD660T", description: "Top Rod Only" },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
      ],
      topRodKitAuxiliary: "WDA691T", // Part number for rods when using 106/113 Auxiliary Control
      topRodPartsAuxiliary: [
        {
          code: "01-1137",
          description: "Screw #8-32 x 7/16 (To Attach Extension)",
        },
        {
          code: "68-0918",
          description: "Extension Rod (When using Auxiliary)",
        },
        {
          code: "68-0917",
          description: "Auxiliary Control Plate (How Aux Retracts rods)",
        },
        {
          code: "WD660T",
          description: "Top Rod Only (Cut to accomodate Aux Extension)",
        },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
        { code: "106-113", description: "Auxiliary Control Kit" },
      ],
      bottomRodKit: "691B",
      bottomRodParts: [
        { code: "660B", description: "Bottom Rod Only" },
        { code: "94-0039", description: "Bolt Sleeve" },
        { code: "01-4389", description: "Roll Pin" },
        { code: "97-0454", description: "Spring (Bottom Bolt)" },
        { code: "94-0038", description: "Bottom Bolt" },
      ],
    },
    {
      code: "MD8400",
      display: "MD8400",
      topRodKit: "MD691T",
      topRodParts: [
        { code: "MD660T", description: "Top Rod Only" },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
      ],
      bottomRodKit: "691B",
      bottomRodParts: [
        { code: "660B", description: "Bottom Rod Only" },
        { code: "94-0039", description: "Bolt Sleeve" },
        { code: "01-4389", description: "Roll Pin" },
        { code: "97-0454", description: "Spring (Bottom Bolt)" },
        { code: "94-0038", description: "Bottom Bolt" },
      ],
    },
    {
      code: "AD8400",
      display: "AD8400",
      topRodKit: "MD691T",
      topRodParts: [
        { code: "MD660T", description: "Top Rod Only" },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
      ],
      bottomRodKit: "691B",
      bottomRodParts: [
        { code: "660B", description: "Bottom Rod Only" },
        { code: "94-0039", description: "Bolt Sleeve" },
        { code: "01-4389", description: "Roll Pin" },
        { code: "97-0454", description: "Spring (Bottom Bolt)" },
        { code: "94-0038", description: "Bottom Bolt" },
      ],
    },

    {
      code: "MD-PE8600",
      display: "MD-PE8600",
      topRodKit: "MD691T",
      topRodParts: [
        { code: "MD660T", description: "Top Rod Only" },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
      ],
      bottomRodKit: "691B",
      bottomRodParts: [
        { code: "660B", description: "Bottom Rod Only" },
        { code: "94-0039", description: "Bolt Sleeve" },
        { code: "01-4389", description: "Roll Pin" },
        { code: "97-0454", description: "Spring (Bottom Bolt)" },
        { code: "94-0038", description: "Bottom Bolt" },
      ],
    },
    {
      code: "AD-PE8600",
      display: "AD-PE8600",
      topRodKit: "MD691T",
      topRodParts: [
        { code: "MD660T", description: "Top Rod Only" },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
      ],
      bottomRodKit: "691B",
      bottomRodParts: [
        { code: "660B", description: "Bottom Rod Only" },
        { code: "94-0039", description: "Bolt Sleeve" },
        { code: "01-4389", description: "Roll Pin" },
        { code: "97-0454", description: "Spring (Bottom Bolt)" },
        { code: "94-0038", description: "Bottom Bolt" },
      ],
    },
    {
      code: "WD-PE8600",
      display: "WD-PE8600",
      topRodKit: "WD691T",
      topRodParts: [
        { code: "WD660T", description: "Top Rod Only" },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
      ],
      topRodKitAuxiliary: "WDA691T", // Part number for rods when using 106/113 Auxiliary Control
      topRodPartsAuxiliary: [
        {
          code: "01-1137",
          description: "Screw #8-32 x 7/16 (To Attach Extension)",
        },
        {
          code: "68-0918",
          description: "Extension Rod (When using Auxiliary)",
        },
        {
          code: "68-0917",
          description: "Auxiliary Control Plate (How Aux Retracts rods)",
        },
        {
          code: "WD660T",
          description: "Top Rod Only (Cut to accomodate Aux Extension)",
        },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
        { code: "106-113", description: "Auxiliary Control Kit" },
      ],
      bottomRodKit: "691B",
      bottomRodParts: [
        { code: "660B", description: "Bottom Rod Only" },
        { code: "94-0039", description: "Bolt Sleeve" },
        { code: "01-4389", description: "Roll Pin" },
        { code: "97-0454", description: "Spring (Bottom Bolt)" },
        { code: "94-0038", description: "Bottom Bolt" },
      ],
    },
    {
      code: "MD-PE8400",
      display: "MD-PE8400",
      topRodKit: "MD691T",
      topRodParts: [
        { code: "MD660T", description: "Top Rod Only" },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
      ],
      bottomRodKit: "691B",
      bottomRodParts: [
        { code: "660B", description: "Bottom Rod Only" },
        { code: "94-0039", description: "Bolt Sleeve" },
        { code: "01-4389", description: "Roll Pin" },
        { code: "97-0454", description: "Spring (Bottom Bolt)" },
        { code: "94-0038", description: "Bottom Bolt" },
      ],
    },
    {
      code: "AD-PE8400",
      display: "AD-PE8400",
      topRodKit: "MD691T",
      topRodParts: [
        { code: "MD660T", description: "Top Rod Only" },
        { code: "01-0696", description: "Coiled Pin" },
        { code: "68-4840", description: "Latch Bolt Assembly" },
      ],
      bottomRodKit: "691B",
      bottomRodParts: [
        { code: "660B", description: "Bottom Rod Only" },
        { code: "94-0039", description: "Bolt Sleeve" },
        { code: "01-4389", description: "Roll Pin" },
        { code: "97-0454", description: "Spring (Bottom Bolt)" },
        { code: "94-0038", description: "Bottom Bolt" },
      ],
    },
  ];

  const finishes = [
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

  const groupPartsByType = (parts) => {
    return parts.reduce((groups, part) => {
      const type = part.type || "Standard"; // Default to "Standard" if no type is specified
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(part);
      return groups;
    }, {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.device || !formData.openingHeight || !formData.aff) {
      alert("Please fill out all fields.");
      return;
    }

    // Find the selected device
    const selectedDevice = devices.find((dev) => dev.code === formData.device);

    if (!selectedDevice) {
      alert("Invalid device selected.");
      return;
    }

    // Determine the top rod kit and parts based on the 106/113 Auxiliary Control checkbox
    const topRodKit = formData.hasAuxiliaryControl
      ? selectedDevice.topRodKitAuxiliary
      : selectedDevice.topRodKit;

    const topRodParts = formData.hasAuxiliaryControl
      ? selectedDevice.topRodPartsAuxiliary
      : selectedDevice.topRodParts;

    // Build the full part numbers for top and bottom rod kits
    const topRodPartNumber = `${
      formData.has5CHPrefix ? "5CH-" : ""
    }${topRodKit} x ${formData.openingHeight} x ${formData.aff}`;
    const bottomRodPartNumber = `${formData.has5CHPrefix ? "5CH-" : ""}${
      selectedDevice.bottomRodKit
    } x ${formData.openingHeight} x ${formData.aff}`;

    // Combine the part numbers with line breaks
    // Add finish to the part number if a Surface Rod Device is selected
    const fullPartNumber = formData.device.includes("8700")
      ? `${topRodPartNumber} ${formData.finish} <br /> ${bottomRodPartNumber} ${formData.finish}`
      : `${topRodPartNumber} <br /> ${bottomRodPartNumber}`;

    // Set the full part number and individual parts
    setPartNumber(fullPartNumber);
    setTopRodParts(topRodParts);
    setBottomRodParts(selectedDevice.bottomRodParts);

    // Set top and bottom case parts
    setTopCaseParts(selectedDevice.topCaseParts || []);
    setBottomCaseParts(selectedDevice.bottomCaseParts || []);
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      device: "",
      has5CHPrefix: false,
      hasAuxiliaryControl: false,
      openingHeight: "",
      aff: "",
    });
    setPartNumber("");
    setTopRodParts([]);
    setBottomRodParts([]);
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">
        Surface/Concealed Rod <br />
        Exit Device Parts
      </h1>

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

            {/* Surface Rod Devices */}
            <optgroup label="Surface Rod Devices">
              {devices
                .filter((device) => device.code.includes("8700")) // Filter for 8700 and PE8700
                .map((device) => (
                  <option key={device.code} value={device.code}>
                    {device.display}
                  </option>
                ))}
            </optgroup>

            {/* Concealed Rod Devices */}
            <optgroup label="Concealed Rod Devices">
              {devices
                .filter((device) => !device.code.includes("8700")) // Exclude 8700 and PE8700
                .map((device) => (
                  <option key={device.code} value={device.code}>
                    {device.display}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>

        {/* 5CH Prefix Checkbox */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.has5CHPrefix}
              onChange={(e) =>
                setFormData({ ...formData, has5CHPrefix: e.target.checked })
              }
            />
            Include 5CH Prefix (5LB Maximum Force)
          </label>
        </div>

        {/* 106/113 Auxiliary Control Checkbox (Only for WD8600 or WD-PE8600) */}
        {(formData.device === "WD8600" || formData.device === "WD-PE8600") && (
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.hasAuxiliaryControl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hasAuxiliaryControl: e.target.checked,
                  })
                }
              />
              Device has an auxiliary control (106/113)
            </label>
          </div>
        )}

        {/* Opening Height */}
        <div className="form-group">
          <label>Opening Height:</label>
          <input
            type="text"
            value={formData.openingHeight}
            onChange={(e) =>
              setFormData({ ...formData, openingHeight: e.target.value })
            }
            placeholder="Enter opening height (Inches or mm)"
            required
          />
        </div>

        {/* Mounting Height (AFF) */}
        <div className="form-group">
          <label>Mounting Height (AFF):</label>
          <input
            type="text"
            value={formData.aff}
            onChange={(e) => setFormData({ ...formData, aff: e.target.value })}
            placeholder="Enter mounting height (AFF)"
            required
          />
        </div>
        {/* Finish Dropdown (Conditional for Surface Rod Devices) */}
        {formData.device.includes("8700") && (
          <div className="form-group">
            <label>Finish:</label>
            <Select
              options={finishes}
              onChange={(selectedOption) =>
                setFormData({ ...formData, finish: selectedOption.value })
              }
              value={finishes.find((f) => f.value === formData.finish) || null}
              placeholder="Select Finish"
              required
              components={{
                Option: FinishOption,
                SingleValue: FinishSingleValue,
              }}
              styles={{
                control: (provided) => ({
                  ...provided,
                  minHeight: "40px",
                }),
                option: (provided) => ({
                  ...provided,
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                }),
              }}
            />
          </div>
        )}

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
        <div className="result-container">
          <h2>Found Part Number:</h2>
          <div
            className="part-number"
            dangerouslySetInnerHTML={{ __html: partNumber }} // Use dangerouslySetInnerHTML to render the <br /> tag
          />

          {/* Display Individual Parts in Two Columns */}
          <div className="parts-grid">
            {/* Top Rod Parts */}
            <div className="parts-column">
              <h3>Top Rod Parts:</h3>
              <ul>
                {topRodParts.map((part) => (
                  <li className="parts-desc" key={part.code}>
                    <strong>{part.code}</strong> — {part.description}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Rod Parts */}
            <div className="parts-column">
              <h3>Bottom Rod Parts:</h3>
              <ul>
                {bottomRodParts.map((part) => (
                  <li className="parts-desc" key={part.code}>
                    <strong>{part.code}</strong> — {part.description}
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Case Parts */}
            <div className="parts-column">
              <h3>Top Case/Latch Parts:</h3>
              {Object.entries(groupPartsByType(topCaseParts)).map(
                ([type, parts]) => (
                  <div key={type}>
                    <h4 className="type-labels">{type}</h4>
                    <ul>
                      {parts.map((part) => (
                        <li className="parts-desc" key={part.code}>
                          <strong>{part.code}</strong> — {part.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>

            {/* Bottom Case Parts */}
            <div className="parts-column">
              <h3>Bottom Case/Latch Parts:</h3>
              {Object.entries(groupPartsByType(bottomCaseParts)).map(
                ([type, parts]) => (
                  <div key={type}>
                    <h4 className="type-labels">{type}</h4>
                    <ul>
                      {parts.map((part) => (
                        <li className="parts-desc" key={part.code}>
                          <strong>{part.code}</strong> — {part.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RodsForm;
