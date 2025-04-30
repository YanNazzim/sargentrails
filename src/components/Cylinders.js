// components/Cylinders.js
import React, { useState } from "react";
import Select, { components } from "react-select";
import {
  deviceTypes,
  functionsByDeviceType,
  prefixes, // Ensure this is the updated array with categories
  finishes,
  partNumbers,
} from "../cylindersdata";
import "../App.css"; // Main CSS
import CategorizedPrefixSelector from './CategorizedPrefixSelector'; // Import the new component

// Styles and custom components for the Finish dropdown
// (Consider moving these to a separate file like 'finishDropdownStyles.js' for better organization)
const finishDropdownStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isFocused ? '#007bff20' : provided.backgroundColor,
    borderRadius: state.isFocused ? '25px' : '0px',
    padding: '8px 12px',
    margin: '2px 4px',
    width: 'calc(100% - 8px)',
    transition: 'background-color 0.2s ease, border-radius 0.2s ease',
    display: 'flex',
    alignItems: 'center',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    display: 'flex',
    alignItems: 'center',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px',
  }),
   control: (provided) => ({
     ...provided,
     minHeight: '40px',
   }),
};

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
    <span>{children}</span>
  </components.Option>
);

const CustomSingleValue = ({ children, ...props }) => (
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
      <span>{children}</span>
    </components.SingleValue>
);
// End of Finish dropdown styles/components


const Cylinders = () => {
  const [formData, setFormData] = useState({
    deviceType: null,
    function: null,
    prefixes: [],
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
      options: deviceTypes.filter((d) => d.value !== "exitDevices"), // Assuming deviceTypes is imported correctly
    },
  ];

  // Handle device type change
  const handleDeviceChange = (selected) => {
    const isTrimCylinder = selected?.value === "trimCylinders";
    setShowFunction(isTrimCylinder);

    setFormData({
      deviceType: selected,
      function: null, // Reset function
      prefixes: [], // Reset prefixes
      finish: formData.finish, // Keep finish if already selected
    });
    setPartNumber(""); // Clear part number on device change
  };

  // Handle function change
  const handleFunctionChange = (selected) => {
     setFormData((prevData) => ({
        ...prevData,
        function: selected,
        prefixes: [], // Reset prefixes when function changes
     }));
     setPartNumber(""); // Clear part number
  };

  // Handle finish change
  const handleFinishChange = (selected) => {
     setFormData((prevData) => ({
        ...prevData,
        finish: selected,
     }));
     // No need to clear part number here typically
  };

  // Handle prefix change - This logic applies the selection and resolves conflicts
  const handlePrefixChange = (e) => {
    const prefixCode = e.target.value;
    const isChecked = e.target.checked;

    setFormData(prevData => {
      const currentPrefixes = prevData.prefixes;
      let newPrefixes = isChecked
        ? [...currentPrefixes, prefixCode]
        : currentPrefixes.filter((p) => p !== prefixCode);

      // --- Conflict Resolution ---
      const changedPrefixDef = prefixes.find(p => p.code === prefixCode);
      const conflictsOfChanged = changedPrefixDef?.conflicts || [];

      if (isChecked) {
        // If adding a prefix, remove any existing ones that conflict with it.
        newPrefixes = newPrefixes.filter(p => {
          if (p === prefixCode) return true; // Keep the newly added one
          const pDef = prefixes.find(px => px.code === p);
          // Remove p if it conflicts with prefixCode OR if prefixCode conflicts with it
          return !conflictsOfChanged.includes(p) && !(pDef?.conflicts?.includes(prefixCode));
        });
      }
      // If unchecking, the source of conflict is removed, no further filtering needed here for basic conflicts.

      // --- Device/Function Specific Conflict Logic (Applied AFTER basic conflicts) ---
      let finalPrefixes = [...newPrefixes];
       if (prevData.deviceType?.value === 'trimCylinders' && prevData.function?.value === '04') {
           finalPrefixes = finalPrefixes.filter(p => p !== 'LC');
       }
       if (prevData.deviceType?.value === 'alarmKit') {
           const restricted = ['51', '52', '60', '63', '64', '65', '70', '72', '73', '73-7P'];
           finalPrefixes = finalPrefixes.filter(p => !restricted.includes(p));
       }
       if (prevData.deviceType?.value === 'cylinderDogging') {
           const restricted = ['73', '73-7P', 'LC'];
           finalPrefixes = finalPrefixes.filter(p => !restricted.includes(p));
       }
       if (prevData.deviceType?.value === 'delayedEgressKit') {
           const restricted = ['51', '52', '60', '63', '64', '65', '70', '72', '73', '73-7P', 'LC'];
           finalPrefixes = finalPrefixes.filter(p => !restricted.includes(p));
       }
       // Add more device/function specific rules here

      return { ...prevData, prefixes: finalPrefixes };
    });
    setPartNumber(""); // Clear part number when prefixes change
  };

  // Determine if a prefix checkbox should be disabled
  const isPrefixDisabled = (prefixCode) => {
     // 1. Check direct conflicts between selected prefixes
     const prefixDef = prefixes.find(p => p.code === prefixCode);
     if (prefixDef?.conflicts?.some(c => formData.prefixes.includes(c))) {
         return true; // Disabled if it conflicts with any currently selected prefix
     }
     // 2. Check if any selected prefix conflicts *with this one*
     for (const selectedCode of formData.prefixes) {
         const selectedDef = prefixes.find(p => p.code === selectedCode);
         if (selectedDef?.conflicts?.includes(prefixCode)) {
             return true; // Disabled if a selected prefix lists this one as a conflict
         }
     }

     // 3. Device/Function Specific Disabling Logic
      if (prefixCode === 'LC' && formData.deviceType?.value === 'trimCylinders' && formData.function?.value === '04') {
          return true;
      }
      if (formData.deviceType?.value === 'alarmKit') {
          const restricted = ['51', '52', '60', '63', '64', '65', '70', '72', '73', '73-7P'];
          if (restricted.includes(prefixCode)) return true;
      }
      if (formData.deviceType?.value === 'cylinderDogging') {
          const restricted = ['73', '73-7P', 'LC'];
          if (restricted.includes(prefixCode)) return true;
      }
       if (formData.deviceType?.value === 'delayedEgressKit') {
           const restricted = ['51', '52', '60', '63', '64', '65', '70', '72', '73', '73-7P', 'LC'];
           if (restricted.includes(prefixCode)) return true;
       }
      // Add more device/function specific rules here

     return false; // Not disabled
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { deviceType, finish: selectedFinish, prefixes: selectedPrefixes, function: selectedFunction } = formData;

    if (!deviceType || !selectedFinish) {
      alert("Please select Device Type and Finish.");
      return;
    }
    if (deviceType.value === 'trimCylinders' && !selectedFunction) {
        alert("Please select a Function for Trim Cylinders.");
        return;
    }

    let basePart = "";
    let lookupKey = deviceType.value;
    let partData = null; // To store the relevant section from partNumbers

    // Find the correct data structure in partNumbers
    if (lookupKey === 'trimCylinders' && selectedFunction) {
      partData = partNumbers.exitDevices?.[selectedFunction.value];
      basePart = partData?.base || "N/A";
    } else if (lookupKey === 'cylinderDogging') {
      partData = partNumbers.exitDevices?.cylinderDogging;
      basePart = partData?.base || "N/A";
    } else if (lookupKey === 'alarmKit') {
      partData = partNumbers.exitDevices?.alarmKit;
      basePart = partData?.base || "N/A"; // Note: Alarm kit has special handling below
    } else if (lookupKey === 'delayedEgressKit') {
      partData = partNumbers.exitDevices?.delayedEgressKit;
      basePart = partData?.base || "N/A";
    } else {
      partData = partNumbers[lookupKey]; // For mortiseLocks, boredLocks, etc.
      basePart = partData?.base || "N/A";
    }

    if (basePart === "N/A") {
      setPartNumber("Part number not found for this configuration.");
      return;
    }

    // Apply prefix overrides if applicable
    const prefixKey = selectedPrefixes.sort().join("-"); // Combined key
    let finalPart = basePart; // Start with the base part

    if (partData?.prefixes) {
      if (partData.prefixes[prefixKey]) {
          finalPart = partData.prefixes[prefixKey]; // Use combined prefix override if exists
      } else {
          // Apply individual prefixes if no combined override.
          // This simple approach assumes the last applicable prefix wins.
          // More complex logic might be needed if multiple prefixes can modify the base part differently without a combined key.
           selectedPrefixes.forEach(p => {
               if(partData.prefixes[p]){
                   finalPart = partData.prefixes[p]; // Overwrite with the prefix part
               }
           });
      }
    }

    // --- Special Case for Alarm Kit (Uses 10-078 + Cylinder) ---
    if (lookupKey === 'alarmKit') {
        // Note: `finalPart` here is the base *cylinder* part number (ALARM-BASE) from partNumbers
        const cylinderPrefixStr = selectedPrefixes.length > 0 ? selectedPrefixes.sort().join('-') + '-' : '';
        setPartNumber(`<strong>Kit:</strong> 10-078<br /><strong>Cylinder:</strong> ${cylinderPrefixStr}${finalPart}-${selectedFinish.value} - Specify Keying`);
        return; // Exit early as the format is different
    }

    // Construct the final part number string for other cases
    const prefixesString = selectedPrefixes.length > 0 ? selectedPrefixes.sort().join("-") + "-" : "";
    const finishString = selectedFinish.value;

    setPartNumber(`${prefixesString}${finalPart}-${finishString} - Specify Keying`);
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      deviceType: null,
      function: null,
      prefixes: [],
      finish: null,
    });
    setPartNumber("");
    setShowFunction(false);
  };


  return (
    <div className="content-transition">
      <h1 className="Heading">Cylinders</h1>

      <form onSubmit={handleSubmit} className="part-form">
        {/* Device Type Select */}
        <div className="form-group">
           <label>Device Type:</label>
           <select
             value={formData.deviceType ? formData.deviceType.value : ""}
             onChange={(e) => {
                const selectedValue = e.target.value;
                let selectedOption = null;
                deviceOptions.forEach(group => {
                    const found = group.options.find(opt => opt.value === selectedValue);
                    if (found) selectedOption = found;
                });
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

        {/* Function Dropdown (Conditional) */}
        {showFunction && formData.deviceType?.value === "trimCylinders" && (
          <div className="form-group">
             <label>Trim Function:</label>
             <Select
                options={functionsByDeviceType.exitDevices || []}
                value={formData.function}
                onChange={handleFunctionChange}
                placeholder="Select Trim Function..."
                required={showFunction && formData.deviceType?.value === "trimCylinders"}
                styles={{ // Basic styles for black text
                 option: (base) => ({ ...base, color: 'black' }),
                 singleValue: (base) => ({ ...base, color: 'black' }),
                 control: (base) => ({...base, minHeight: '40px'}),
               }}
             />
          </div>
        )}

        {/* === Replace Prefixes Grid with New Component === */}
        <div className="form-group">
          <label>Prefixes:</label>
          <CategorizedPrefixSelector
            allPrefixes={prefixes} // Pass the categorized prefixes data
            selectedPrefixes={formData.prefixes}
            onPrefixChange={handlePrefixChange} // Pass the handler
            isPrefixDisabled={isPrefixDisabled} // Pass the check function
          />
        </div>
        {/* ============================================= */}

        {/* Finish Select */}
        <div className="form-group">
           <label>Finish:</label>
            <Select
                options={finishes}
                value={formData.finish}
                onChange={handleFinishChange}
                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                styles={finishDropdownStyles}
                required
                placeholder="Select Finish..."
           />
        </div>

        {/* Form Actions */}
        <div className="form-actions">
           <button type="submit" className="generate-button">Find Part Number</button>
           <button type="button" onClick={handleReset} className="reset-button">Reset</button>
        </div>
      </form>

      {/* Results */}
      {partNumber && (
        <div className="result-container">
          <h2>Part Number:</h2>
          {/* Use dangerouslySetInnerHTML if your part number string contains HTML like <br /> */}
          <div className="part-number" dangerouslySetInnerHTML={{ __html: partNumber }}></div>
        </div>
      )}
    </div>
  );
};

export default Cylinders;