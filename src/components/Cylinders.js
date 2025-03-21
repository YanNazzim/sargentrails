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

    let results = [];
    if (formData.deviceType.value === "trimCylinders" && formData.function) {
      const funcData = partNumbers.exitDevices[formData.function.value];

      // Handle prefixes
      if (formData.prefixes.length > 0) {
        formData.prefixes.forEach((prefix) => {
          const prefixData = funcData.prefixes?.[prefix];
          if (prefixData) {
            if (formData.function.value === "16") {
              // Special handling for 16 function (inside/outside cylinders)
              results.push({
                mortise: {
                  inside: `${prefixData.mortise.inside} - ${formData.finish.value}`,
                  outside: `${prefixData.mortise.outside} - ${formData.finish.value}`,
                },
                regular: {
                  inside: `${prefixData.regular.inside} - ${formData.finish.value}`,
                  outside: `${prefixData.regular.outside} - ${formData.finish.value}`,
                },
              });
            } else {
              // Regular handling for other functions
              results.push({
                mortise: `${prefixData.mortise} - ${formData.finish.value}`,
                regular: `${prefixData.regular} - ${formData.finish.value}`,
              });
            }
          }
        });
      } else {
        // Base numbers without prefixes
        if (formData.function.value === "16") {
          // Special handling for 16 function (inside/outside cylinders)
          results.push({
            mortise: {
              inside: `${funcData.mortiseBase.inside} - ${formData.finish.value}`,
              outside: `${funcData.mortiseBase.outside} - ${formData.finish.value}`,
            },
            regular: {
              inside: `${funcData.regularBase.inside} - ${formData.finish.value}`,
              outside: `${funcData.regularBase.outside} - ${formData.finish.value}`,
            },
          });
        } else {
          // Regular handling for other functions
          results.push({
            mortise: `${funcData.mortiseBase} - ${formData.finish.value}`,
            regular: `${funcData.regularBase} - ${formData.finish.value}`,
          });
        }
      }
    }

    // Format final output with proper line breaks
    const finalOutput = results
      .map((r) => {
        if (formData.function.value === "16") {
          return `Mortise Exit Devices:
    - Inside Cylinder: ${r.mortise.inside} - Specify Keying Details
    - Outside Cylinder: ${r.mortise.outside} - Specify Keying Details
  All other Devices:
    - Inside Cylinder: ${r.regular.inside} - Specify Keying Details
    - Outside Cylinder: ${r.regular.outside} - Specify Keying Details`;
        } else {
          return `Mortise Exit Devices: ${r.mortise} - Specify Keying Details\nAll other Devices: ${r.regular} - Specify Keying Details`;
        }
      })
      .join("\n");

    setPartNumber(finalOutput);
  };

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
      <h1 className="Heading">
        Cylinders <br /> 🚧 UNDER CONSTRUCTION : COMING SOON 🚧
      </h1>

      <form onSubmit={handleSubmit} className="part-form">
        {/* Device Type Select */}
        <div className="form-group">
          <label>Device Type:</label>
          <select
            value={formData.deviceType ? formData.deviceType.value : ""}
            onChange={(e) => {
              const selectedValue = e.target.value;
              let selectedOption = null;
              // Find the matching option in our grouped options
              deviceOptions.forEach((group) => {
                const found = group.options.find(
                  (option) => option.value === selectedValue
                );
                if (found) selectedOption = found;
              });
              // Use the same handler to update state and show function dropdown if needed
              handleDeviceChange(selectedOption);
            }}
            required
          >
            <option value="">Select a device type</option>
            {deviceOptions.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Function Dropdown (only for Trim Cylinders) */}
        {showFunction && (
          <div className="form-group">
            <label>Function:</label>
            <select
              value={formData.function ? formData.function.value : ""}
              onChange={(e) => {
                const selectedValue = e.target.value;
                const selectedOption = functionsByDeviceType.exitDevices.find(
                  (option) => option.value === selectedValue
                );
                setFormData((prevData) => ({
                  ...prevData,
                  function: selectedOption,
                }));
              }}
              required
            >
              <option value="">Select a function</option>
              {functionsByDeviceType.exitDevices.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
            className="ReactSelect"
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
            {partNumber.split("\n").map((line, index) => (
              <p key={index}>
                {line.split(": ").map((part, i) => (
                  <span key={i}>
                    {i === 0 ? <strong>{part}:</strong> : part}
                    {i === 0 && " "}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      )}
    </div> // Closing the main div
  ); // Closing the return statement
}; // Closing the Cylinders component

export default Cylinders;
