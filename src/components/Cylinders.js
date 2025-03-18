import React, { useState } from "react";
import Select, { components } from "react-select";
import {
  deviceTypes,
  functionsByDeviceType,
  prefixes,
  finishes,
  partNumbers,
} from "../cylindersdata";
import "../App.css";

const Cylinders = () => {
  const [formData, setFormData] = useState({
    deviceType: null,
    function: null,
    prefixes: [], // Initialize as empty array
    finish: null,
  });

  const [partNumber, setPartNumber] = useState("");
  const [showFunction, setShowFunction] = useState(false);

  // Grouped device options
  const deviceOptions = [
    {
      label: "Exit Devices",
      options: [
        { value: "trimCylinders", label: "Trim Cylinders" },
        { value: "cylinderDogging", label: "Cylinder Dogging" },
        { value: "alarmKit", label: "Alarm Kit" },
        { value: "delayedEgressKit", label: "Delayed Egress Kit" },
      ],
    },
    {
      label: "Other Devices",
      options: deviceTypes.filter((d) => d.value !== "exitDevices"),
    },
  ];

  // Handle device type change
  const handleDeviceChange = (selected) => {
    const isTrimCylinder = selected?.value === "trimCylinders";
    setShowFunction(isTrimCylinder);

    setFormData({
      deviceType: selected,
      function: null,
      prefixes: [], // Reset to empty array
      finish: null,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.deviceType || !formData.finish) {
      alert("Please fill out all required fields.");
      return;
    }

    let finalPart = "";
    if (formData.deviceType.value === "trimCylinders" && formData.function) {
      // Trim cylinder logic
      finalPart = partNumbers.exitDevices[formData.function.value]?.base || "";

      // Handle combined prefixes
      const prefixKey = formData.prefixes.sort().join("-"); // Sort to ensure consistent key
      if (
        partNumbers.exitDevices[formData.function.value]?.prefixes?.[prefixKey]
      ) {
        finalPart =
          partNumbers.exitDevices[formData.function.value].prefixes[prefixKey];
      } else {
        formData.prefixes.forEach((prefix) => {
          finalPart =
            partNumbers.exitDevices[formData.function.value]?.prefixes?.[
              prefix
            ] || finalPart;
        });
      }
    } else {
      // Other device logic
      finalPart = partNumbers[formData.deviceType.value]?.base || "";
    }

    // Join prefixes with a hyphen
    const prefixesString = formData.prefixes.join("-");

    // Apply finish and keying suffix
    finalPart = `${prefixesString}-${finalPart} - ${formData.finish.value} - Specify Keying Details`;
    setPartNumber(finalPart);
  };

  // Custom group heading
  const GroupHeading = (props) => (
    <div
      className="group-heading"
      style={{
        padding: "8px 12px",
        backgroundColor: "#f0f4f8",
        color: "black",
        fontWeight: "600",
      }}
    >
      {props.children}
    </div>
  );

  // Custom option component
  const CustomOption = ({ children, ...props }) => (
    <components.Option {...props}>
      {props.data.image && (
        <img
          src={props.data.image}
          alt=""
          style={{
            width: "30px",
            height: "auto",
            marginRight: "10px",
            verticalAlign: "middle",
            borderRadius: "25px",
          }}
        />
      )}
      <span style={{ color: "black" }}>{children}</span>
    </components.Option>
  );

  return (
    <div className="content-transition">
      <h1 className="Heading">Cylinders <br /> 🚧 UNDER CONSTRUCTION : COMING SOON 🚧</h1>

      <form onSubmit={handleSubmit} className="part-form">
        {/* Device Type Select */}
        <div className="form-group">
          <label>Device Type:</label>
          <Select
            options={deviceOptions}
            value={formData.deviceType}
            onChange={handleDeviceChange}
            components={{
              Option: CustomOption,
              Group: components.Group,
              GroupHeading,
            }}
            required
            isSearchable={false}
          />
        </div>

        {/* Function Dropdown (only for Trim Cylinders) */}
        {showFunction && (
          <div className="form-group">
            <label>Function:</label>
            <Select
              options={functionsByDeviceType.exitDevices}
              value={formData.function}
              onChange={(selected) =>
                setFormData((p) => ({ ...p, function: selected }))
              }
              required
            />
          </div>
        )}

        {/* Prefixes Grid (only for Trim Cylinders) */}
          <div className="form-group">
            <label>Prefixes:</label>
            <div className="checkbox-group">
              {prefixes &&
                prefixes.map((prefix) => (
                  <label key={prefix.code}>
                    <input
                      type="checkbox"
                      value={prefix.code}
                      checked={formData.prefixes.includes(prefix.code)}
                      onChange={(e) => {
                        const newPrefixes = e.target.checked
                          ? [...formData.prefixes, prefix.code]
                          : formData.prefixes.filter((p) => p !== prefix.code);

                        // Handle conflicts
                        const filtered = newPrefixes.filter(
                          (p) =>
                            !prefixes
                              .find((px) => px.code === prefix.code)
                              ?.conflicts?.includes(p)
                        );
                        setFormData((p) => ({ ...p, prefixes: filtered }));
                      }}
                      disabled={
                        prefix.conflicts &&
                        prefix.conflicts.some((c) =>
                          formData.prefixes.includes(c)
                        )
                      }
                    />
                    <span className="custom-checkbox"></span>
                    <span>
                      <strong>({prefix.code})</strong> — {prefix.name}
                    </span>
                  </label>
                ))}
            </div>
          </div>


        {/* Finish Select */}
        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={finishes}
            value={formData.finish}
            onChange={(selected) =>
              setFormData((p) => ({ ...p, finish: selected }))
            }
            components={{
              Option: CustomOption,
              SingleValue: (props) => (
                <components.SingleValue {...props}>
                  {props.data.image && (
                    <img
                      src={props.data.image}
                      alt=""
                      style={{
                        width: "30px",
                        height: "auto",
                        marginRight: "10px",
                        verticalAlign: "middle",
                        borderRadius: "25px",
                      }}
                    />
                  )}
                  {props.data.label}
                </components.SingleValue>
              ),
            }}
            required
          />
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="generate-button">
            Find Part Number
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                deviceType: null,
                function: null,
                prefixes: [], // Reset to empty array
                finish: null,
              });
              setPartNumber("");
              setShowFunction(false);
            }}
            className="reset-button"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Results */}
      {partNumber && (
        <div className="result-container">
          <h2>Found Part Numbers:</h2>
          <div className="part-number">
            <p>
              <strong>Cylinder:</strong> {partNumber}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cylinders;
