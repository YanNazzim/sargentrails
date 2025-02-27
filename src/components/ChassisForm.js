import React, { useState } from "react";
import Select, { components } from "react-select";
import images from "../images"; // Adjust the path as needed
import "../App.css";

const ChassisForm = () => {
  const [formData, setFormData] = useState({
    device: "",
    prefixes: [],
    function: "",
    handing: "",
    finish: "",
  });

  const [partNumber, setPartNumber] = useState("");
  const [relatedParts, setRelatedParts] = useState({
    chassis: "",
    innerChassis: "", // Added innerChassis
    chassisCover: "",
    coverScrews: "",
  });

  // Define the devices with divisions for Narrow Stile and Wide Stile
  const devices = [
    // Narrow Stile Devices
    { code: "8300", display: "8300 Mortise", stile: "Narrow" },
    { code: "MD8400", display: "MD8400 CVR", stile: "Narrow" },
    { code: "AD8400", display: "AD8400 CVR", stile: "Narrow" },
    { code: "8500", display: "8500 Rim", stile: "Narrow" },
    // Wide Stile Devices
    { code: "MD8600", display: "MD8600 CVR", stile: "Wide" },
    { code: "AD8600", display: "AD8600 CVR", stile: "Wide" },
    { code: "WD8600", display: "WD8600 CVR", stile: "Wide" },
    { code: "8700", display: "8700 SVR", stile: "Wide" },
    { code: "NB8700", display: "NB8700 SVR (No Bottom Rod)", stile: "Wide" },
    { code: "8800", display: "8800 Rim", stile: "Wide" },
    { code: "8900", display: "8900 Mortise", stile: "Wide" },
  ];

  // Define the prefixes and their conflicts
  const prefixes = [
    { code: "12", name: "Fire Rated (No Dogging)" },
    { code: "49", name: "Inside Visual Indicator for 8816" },
    { code: "5CH", name: "5LB Maximum Force" },
    { code: "53", name: "Latchbolt Monitoring Switch" },
    {
      code: "59",
      name: "Electroguard® Delayed Egress",
    },
    { code: "AL", name: "Alarm" },
    { code: "GL", name: "Guarded Latch" },
    { code: "WS", name: "Windstorm Rated" },
    { code: "HC", name: "Hurricane Rated" },
    { code: "HC4", name: "Hurricane Rated (Stronger)" },
    { code: "FM", name: "FEMA Rated" },
  ];

  // Define the finishes
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

  // Define part combinations with base parts and prefix overrides
  const partCombinations = {
    // Narrow Stile
    "8300-Left": {
      base: {
        chassis: `
        <br /> 1-3/4" Door = 68-2481 
        <br /> 2" to 2-3/4" Door = 68-2483`,
        chassisCover: `68-0496`,
      },
    },
    "8300-Right": {
      base: {
        chassis: `
        <br /> 1-3/4" Door = 68-2482 
        <br /> 2" to 2-3/4" Door = 68-2484`,
        chassisCover: `68-0496`,
      },
    },
    "MD8400-Left": {
      base: {
        chassis: `
        <br /> Standard Door = 68-5944 
        <br /> 1/4" Cladding = 68-6013 
        <br /> 1/2" Cladding = 68-5946`,
        innerChassis: `94-2008`,
        chassisCover: `68-0496`,
        prefixes: {
          53: {
            innerChassis: `68-3854`,
          },
          "5CH": {
            innerChassis: `68-7936`,
          },
          "53-5CH": {
            innerChassis: `68-7789`,
          },
        },
      },
    },
    "MD8400-Right": {
      base: {
        chassis: `
        <br /> Standard Door = 68-5945 
        <br /> 1/4" Cladding = 68-6014 
        <br /> 1/2" Cladding = 68-5951`,
        innerChassis: `94-2008`,
        chassisCover: `68-0496`,
        prefixes: {
          53: {
            innerChassis: `68-3854`,
          },
          "5CH": {
            innerChassis: `68-7936`,
          },
          "53-5CH": {
            innerChassis: `68-7789`,
          },
        },
      },
    },
    "AD8400-Left": {
      base: {
        chassis: `
        <br /> Standard Door = 68-5944 
        <br /> 1/4" Cladding = 68-6013 
        <br /> 1/2" Cladding = 68-5946`,
        innerChassis: `94-2008`,
        chassisCover: `68-0496`,
        prefixes: {
          53: {
            innerChassis: `68-3854`,
          },
          "5CH": {
            innerChassis: `68-7936`,
          },
          "53-5CH": {
            innerChassis: `68-7789`,
          },
        },
      },
    },
    "AD8400-Right": {
      base: {
        chassis: `
        <br /> Standard Door = 68-5945 
        <br /> 1/4" Cladding = 68-6014 
        <br /> 1/2" Cladding = 68-5951`,
        innerChassis: `94-2008`,
        chassisCover: `68-0496`,
        prefixes: {
          53: {
            innerChassis: `68-3854`,
          },
          "5CH": {
            innerChassis: `68-7936`,
          },
          "53-5CH": {
            innerChassis: `68-7789`,
          },
        },
      },
    },
    "8500-Left": {
      base: {
        chassis: `68-5880`,
        chassisCover: `68-0495`,
        prefixes: {
          53: {
            chassis: `68-7411`,
          },
          "5CH": {
            chassis: `68-8009`,
          },
          "53-5CH": {
            chassis: `68-8010`,
          },
          GL: {
            chassis: `68-5881`,
          },
          59: {
            chassis: `68-5882`,
          },
        },
      },
    },
    "8500-Right": {
      base: {
        chassis: `68-5880`,
        chassisCover: `68-0495`,
        prefixes: {
          53: {
            chassis: `68-7411`,
          },
          "5CH": {
            chassis: `68-8009`,
          },
          "53-5CH": {
            chassis: `68-8010`,
          },
          GL: {
            chassis: `68-5881`,
          },
          59: {
            chassis: `68-5882`,
          },
        },
      },
    },
    // Wide Stile
    "MD8600-Left": {
      base: {
        chassis: ` 68-5068`,
        innerChassis: `94-2008`,
        chassisCover: `68-0407`,
        prefixes: {
          12: {
            innerChassis: `68-3627`,
          },
          "12-53": {
            innerChassis: `68-3855`,
          },
          "12-5CH": {
            innerChassis: `68-7935`,
          },
          "12-53-5CH": {
            innerChassis: `68-7935`,
          },
          53: {
            innerChassis: `68-3854`,
          },
          "5CH": {
            innerChassis: `68-7936`,
          },
          "53-5CH": {
            innerChassis: `68-7789`,
          },
          59: {
            chassis: `68-5070`,
          },
        },
      },
    },
    "MD8600-Right": {
      base: {
        chassis: `
        <br /> Standard Door = 68-5945 
        <br /> 1/4" Cladding = 68-6014 
        <br /> 1/2" Cladding = 68-5951`,
        innerChassis: `94-2008`,
        chassisCover: `68-0407`,
        prefixes: {
          12: {
            innerChassis: `68-3627`,
          },
          "12-53": {
            innerChassis: `68-3855`,
          },
          "12-5CH": {
            innerChassis: `68-7935`,
          },
          "12-53-5CH": {
            innerChassis: `68-7935`,
          },
          53: {
            innerChassis: `68-3854`,
          },
          "5CH": {
            innerChassis: `68-7936`,
          },
          "53-5CH": {
            innerChassis: `68-7789`,
          },
          59: {
            chassis: `68-5070`,
          },
        },
      },
    },

    "AD8600-Left": {
      base: {
        chassis: "68-4558",
        innerChassis: `94-2008`,
        chassisCover: `68-0407`,
        prefixes: {
          12: {
            innerChassis: `68-3627`,
          },
          "12-53": {
            innerChassis: `68-3855`,
          },
          "12-5CH": {
            innerChassis: `68-7935`,
          },
          "12-53-5CH": {
            innerChassis: `68-7935`,
          },
          53: {
            innerChassis: `68-3854`,
          },
          "5CH": {
            innerChassis: `68-7936`,
          },
          "53-5CH": {
            innerChassis: `68-7789`,
          },
          59: {
            chassis: `68-5070`,
          },
        },
      },
    },
    "AD8600-Right": {
      base: {
        chassis: "68-4558",
        innerChassis: `94-2008`,
        chassisCover: `68-0407`,
        prefixes: {
          12: {
            innerChassis: `68-3627`,
          },
          "12-53": {
            innerChassis: `68-3855`,
          },
          "12-5CH": {
            innerChassis: `68-7935`,
          },
          "12-53-5CH": {
            innerChassis: `68-7935`,
          },
          53: {
            innerChassis: `68-3854`,
          },
          "5CH": {
            innerChassis: `68-7936`,
          },
          "53-5CH": {
            innerChassis: `68-7789`,
          },
          59: {
            chassis: `68-5070`,
          },
        },
      },
    },
    "WD8600-Left": {
      base: {
        chassis: "68-4558",
        innerChassis: `68-3580`,
        chassisCover: `68-0407`,
        prefixes: {
          12: {
            innerChassis: `68-3580`,
          },
          "12-53": {
            innerChassis: `68-3859`,
          },
          53: {
            innerChassis: `68-3859`,
          },
          "5CH": {
            innerChassis: `68-7785`,
          },
          "53-5CH": {
            innerChassis: `68-7786`,
          },
          59: {
            chassis: `68-5070`,
          },
        },
      },
    },
    "WD8600-Right": {
      base: {
        chassis: "68-4558",
        innerChassis: `94-2008`,
        chassisCover: `68-0407`,
        prefixes: {
          12: {
            innerChassis: `68-3580`,
          },
          "12-53": {
            innerChassis: `68-3859`,
          },
          53: {
            innerChassis: `68-3859`,
          },
          "5CH": {
            innerChassis: `68-7785`,
          },
          "53-5CH": {
            innerChassis: `68-7786`,
          },
          59: {
            chassis: `68-5070`,
          },
        },
      },
    },
    "8700-Left": {
      base: {
        chassis: `
        <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-2201 
        <br /> Functions 10 & 40 = 68-2163 
        <br /> Function 28 = 68-2210 
        <br /> Functions 62 & 63 = 68-2204`,
        chassisCover: `68-0405`,
        prefixes: {
          53: {
            chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-3714 
            <br /> Functions 10 & 40 = 68-3823 
            <br /> Function 28 = 68-3829 
            <br /> Functions 62 & 63 = 68-3826`,
          },
          FM: {
            chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-7306 
            <br /> Functions 10 & 40 = 68-7308/>`,
          },
          HC4: {
            chassis: `68-4112`,
          },
        },
      },
    },
    "8700-Right": {
      base: {
        chassis: `
        <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-2201 
        <br /> Functions 10 & 40 = 68-2163 
        <br /> Function 28 = 68-2210 
        <br /> Functions 62 & 63 = 68-2204`,
        chassisCover: `68-0405`,
        prefixes: {
          53: {
            chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-3715 
            <br /> Functions 10 & 40 = 68-3824 
            <br /> Function 28 = 68-3830 
            <br /> Functions 62 & 63 = 68-3827`,
          },
          FM: {
            chassis: `
            <br /> All Functions (Except 10, 28, 40, 62, 63) = 68-7307 
            <br /> Functions 10 & 40 = 68-7309`,
          },
          HC4: {
            chassis: `68-4113`,
          },
        },
      },
    },
    "NB8700-Left": {
      base: {
        chassis: `68-4568`,
        chassisCover: `68-0405`,
        prefixes: {
          53: {
            chassis: "68-5449",
          },
        },
      },
    },
    "NB8700-Right": {
      base: {
        chassis: `68-4569`,
        chassisCover: `68-0405`,
        prefixes: {
          53: {
            chassis: "68-5450",
          },
        },
      },
    },
    "8800-Left": {
      base: {
        chassis: `
        <br /> All functions (Except 16, 28, 63, 66) = 68-4261 
        <br /> 16 Function Only (No Indicator) = 68-2425 
        <br /> 28 Function Only (Pull Trim) = 68-2329
        <br /> 63 Function Only (Pull Trim) = 68-2326
        <br /> 66 Function Only (Pull Trim) = 68-2443
        `,
        chassisCover: `
        <br /> All Functions (Except 16 & 66) = 68-0406
        <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-0408
        `,
        prefixes: {
          53: {
            chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-6075 
            <br /> 16 Function Only (No Indicator) = 68-3722,
            <br /> 28 Function Only (Pull Trim) = 68-3835
            <br /> 63 Function Only (Pull Trim) = 68-3727
            <br /> 66 Function Only (Pull Trim) = 68-3732
            `,

            chassisCover: `
            <br /> All Functions (Except 16, 28, 63, 66) = 68-0406 
            <br /> 16 & 66 Function (No Indicator) = 68-1015 
            <br /> 28 & 63 Function (Pull Trim) = 68-1014`,
          },
          59: {
            chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
            <br /> 16 Function Only (No Indicator) = 68-3722 
            <br /> 28 Function Only (Pull Trim) = 68-3835
            <br /> 63 Function Only (Pull Trim) = 68-3727
            <br /> 66 Function Only (Pull Trim) = 68-3732
            `,
            chassisCover: `
            <br /> All Functions (Except 16, 28, 63, 66) = 68-0406 
            <br /> 16 & 66 Function (No Indicator) = 68-1015 
            <br /> 28 & 63 Function (Pull Trim) = 68-1014`,
          },
          12: {
            chassis: "68-4263",
          },
          "12-53": {
            chassis: "68-6076",
          },
          GL: {
            chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
            <br /> 16 Function Only (No Indicator) = 68-4077 
            <br /> 28 Function Only (Pull Trim) = 68-4082
            <br /> 63 Function Only (Pull Trim) = 68-4099
            <br /> 66 Function Only (Pull Trim) = 68-4104
            `,
            chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-1014
            <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-1015
            `,
          },
          AL: {
            chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4410 
            <br /> 16 Function Only (No Indicator) = 68-4077 
            <br /> 28 Function Only (Pull Trim) = 68-4082
            <br /> 63 Function Only (Pull Trim) = 68-4099
            <br /> 66 Function Only (Pull Trim) = 68-4104
            `,
            chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-1014
            <br /> 16 & 66 Function (Classroom Intruder - Double Cylinder) = 68-1015
            `,
          },
          49: {
            chassis: `
            <br /> 16 Function (Includes Indicator) = 68-6265
            <br /> 66 Function (Includes Indicator) = 68-6271
            `,
            chassisCover: "68-1782",
          },
          "49-AL": {
            chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6287
            <br /> 16 Function Only (Includes Indicator) = 68-6283
            `,
            chassisCover: "68-1784",
          },
          "49-GL": {
            chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6287`,
            chassisCover: "68-1784",
          },
          "49-59": {
            chassis: `
            <br /> 16 Function Only (Includes Indicator) = 68-6287`,
            chassisCover: "68-1784",
          },
          "12-GL": {
            chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4411 
            <br /> 16 Function Only (No Indicator) = 68-4077
            <br /> 28 Function Only (Pull Trim) = 68-4082`,
            chassisCover: "68-1014",
          },
          "12-AL": {
            chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4411 
            <br /> 16 Function Only (No Indicator) = 68-4077
            <br /> 28 Function Only (Pull Trim) = 68-4082`,
            chassisCover: "68-1014",
          },
          "12-AL-GL": {
            chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-4411 
            <br /> 16 Function Only (No Indicator) = 68-4077
            <br /> 28 Function Only (Pull Trim) = 68-4082`,
            chassisCover: "68-1014",
          },
          "5CH": {
            chassis: `
            <br /> All functions (Except 16, 28, 63, 66) = 68-7484
            <br /> 16 Function Only (No Indicator) = 68-7512  
            <br /> 28 Function Only (Pull Trim) = 68-7514
            <br /> 63 Function Only (Pull Trim) = 68-7516
            <br /> 63 Function Only (Pull Trim) = 68-7518
            `,
            chassisCover: `
            <br /> All Functions (Except 16 & 66) = 68-0406
            <br /> 16 & 66 Function (No Indicator) = 68-0408
            `,
          },
          "53-5CH": {
            chassis: `
            <br /> 16 Function Only (No Indicator) = 68-7965 
            <br /> 28 Function Only (Pull Trim) = 68-7971
            <br /> 63 Function Only (Pull Trim) = 68-7967
            <br /> 66 Function Only (Pull Trim) = 68-7969
            `,
            chassisCover: `
              <br /> 16 & 66 Function (No Indicator) = 68-1015 
              <br /> 28 & 63 Function (Pull Trim) = 68-1014`,
          },
          "59-5CH": {
            chassis: `
            <br /> 16 Function Only (No Indicator) = 68-7965 
            <br /> 28 Function Only (Pull Trim) = 68-7971
            <br /> 63 Function Only (Pull Trim) = 68-7967
            <br /> 66 Function Only (Pull Trim) = 68-7969
            `,
            chassisCover: `
              <br /> 16 & 66 Function (No Indicator) 68-1015 
              <br /> 28 & 63 Function (Pull Trim) = 68-1014`,
          },
        },
      },
    },
  };

  const getPartsForCombination = (device, handing, selectedPrefixes) => {
    const key = `${device}-${handing}`;
    const combination = partCombinations[key];

    if (!combination) {
      return {
        chassis: `Part either not found or doesn't exist, Contact TPS`,
        innerChassis: `Part either not found or doesn't exist, Contact TPS`,
        chassisCover: `Part either not found or doesn't exist, Contact TPS`,
        coverScrews: `Part either not found or doesn't exist, Contact TPS`,
      };
    }

    // Start with the base parts
    let parts = { ...combination.base };

    // Get the prefix overrides from the base object
    const prefixOverrides = combination.base.prefixes;
    if (prefixOverrides) {
      // Create a sorted composite key from all selected prefixes
      const sortedSelected = [...selectedPrefixes].sort();
      const compositeKey = sortedSelected.join("-");

      // If the composite key exists, use that override
      if (prefixOverrides.hasOwnProperty(compositeKey)) {
        parts = { ...parts, ...prefixOverrides[compositeKey] };
      } else {
        // Otherwise, apply individual overrides
        selectedPrefixes.forEach((prefix) => {
          if (prefixOverrides.hasOwnProperty(prefix)) {
            parts = { ...parts, ...prefixOverrides[prefix] };
          }
        });
      }
    }

    return parts;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.device || !formData.finish || !formData.handing) {
      alert("Please fill out all required fields.");
      return;
    }

    // Check for conflicting prefixes
    const hasConflict = formData.prefixes.some((prefix) => {
      const prefixInfo = prefixes.find((p) => p.code === prefix);
      return prefixInfo.conflicts?.some((conflict) =>
        formData.prefixes.includes(conflict)
      );
    });

    if (hasConflict) {
      alert("Conflicting prefixes selected!");
      return;
    }

    // Look up related parts
    const parts = getPartsForCombination(
      formData.device,
      formData.handing,
      formData.prefixes
    );

    // Apply finish to parts
    setRelatedParts({
      chassis: parts.chassis,
      innerChassis: parts.innerChassis, // Added innerChassis
      chassisCover: parts.chassisCover,
      coverScrews: parts.coverScrews
    });

    // Generate part number
    const prefixKey = formData.prefixes.sort().join("-");
    const key = `${prefixKey}-${formData.device}-${formData.function}${
      formData.handing ? `-${formData.handing}` : ""
    }`;
    const generatedNumber = `${key}`;
    setPartNumber(generatedNumber);
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      device: "",
      prefixes: [],
      function: "",
      handing: "",
      finish: "",
    });
    setPartNumber("");
    setRelatedParts({
      chassis: "",
      innerChassis: "", // Reset innerChassis
      chassisCover: "",
      coverScrews: "",
    });
  };

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

  return (
    <div className="content-transition">
      <h1 className="Heading">80/PE80 Series Chassis</h1>

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
            <optgroup label="Narrow Stile Devices">
              {devices
                .filter((device) => device.stile === "Narrow")
                .map((device) => (
                  <option key={device.code} value={device.code}>
                    {device.display}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Wide Stile Devices">
              {devices
                .filter((device) => device.stile === "Wide")
                .map((device) => (
                  <option key={device.code} value={device.code}>
                    {device.display}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>

        {/* Prefixes Grid */}
        <div className="form-group">
          <label>Prefixes:</label>
          <div className="checkbox-group">
            {prefixes.map((prefix) => (
              <label key={prefix.code}>
                <input
                  type="checkbox"
                  value={prefix.code}
                  checked={formData.prefixes.includes(prefix.code)}
                  onChange={(e) => {
                    const newPrefixes = e.target.checked
                      ? [...formData.prefixes, prefix.code]
                      : formData.prefixes.filter((p) => p !== prefix.code);
                    setFormData({ ...formData, prefixes: newPrefixes });
                  }}
                />
                <span className="custom-checkbox"></span>
                <span>
                  <strong>({prefix.code})</strong> — {prefix.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Handing Dropdown */}
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
            <option value="Left">Left Hand</option>
            <option value="Right">Right Hand</option>
          </select>
        </div>

        {/* Finish Dropdown */}
        <div className="form-group">
          <label>Finish:</label>
          <Select
            options={finishes}
            onChange={(selectedOption) =>
              setFormData({ ...formData, finish: selectedOption.value })
            }
            value={finishes.find((f) => f.value === formData.finish) || null}
            placeholder="Select Finish"
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

      {/* Display Generated Part Number and Related Parts */}
      {partNumber && (
        <div className="result-container">
          <h2>Found Part Numbers:</h2>

          {/* Display Related Parts */}
          <div className="part-number">
            <p>
              <strong>Chassis:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{ __html: relatedParts.chassis }}
              />
            </p>
            {relatedParts.innerChassis && ( // Conditionally display innerChassis
              <p>
                <strong>Inner Chassis:</strong>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: relatedParts.innerChassis,
                  }}
                />
              </p>
            )}
            <p>
              <strong>Chassis Cover:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{ __html: relatedParts.chassisCover }}
              />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChassisForm;
