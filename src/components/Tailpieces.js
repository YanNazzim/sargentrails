// src/components/Tailpieces.js
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import "../App.css";
import images from "../images"; // Import the images object

const tailpieceData = {
  "10X Line": {
    "Fixed Core": {
      "Mechanical Functions": {
        "Conventional, Signature, XC": {
          "1-3/8\"-2\"": { part: "10-3629", imageKey: "TailpieceConventional" },
          "2-1/4\"": { part: "10-3630", imageKey: "TailpieceConventional" },
        },
        Keso: {
          "1-3/8\"-2\"": { part: "10-3637", imageKey: "TailpieceConventionalKESO" },
          "2-1/4\"": { part: "10-3638", imageKey: "TailpieceConventionalKESO" },
        },
      },
      "Electrified Functions": {
        "Conventional, Signature, XC": {
          "1-3/8\"-2\"": { part: "10-3791", imageKey: "TailpieceConventionalEM" },
          "2-1/4\"": { part: "10-3792", imageKey: "TailpieceConventionalEM" },
        },
        Keso: {
          "1-3/8\"-2\"": { part: "10-3793", imageKey: "TailpieceConventionalEMKESO" },
          "2-1/4\"": { part: "10-3794", imageKey: "TailpieceConventionalEMKESO" },
        },
      },
    },
    LFIC: {
      "Mechanical Functions": {
        "LFIC conventional and Signature": {
          "1-3/8\"-2\"": { part: "10-3631", imageKey: "TailpieceSargentLFIC" },
          "2-1/4\"": { part: "10-3632", imageKey: "TailpieceSargentLFIC" },
        },
        "LFIC XC": {
          "1-3/8\"-2\"": { part: "10-3635", imageKey: "TailpieceSargentLFICXC" },
          "2-1/4\"": { part: "10-3636", imageKey: "TailpieceSargentLFICXC" },
        },
      },
      "Electrified Functions": {
        "LFIC conventional and Signature": {
          "1-3/8\"-2\"": { part: "10-3773", imageKey: "TailpieceSargentLFICEM" },
          "2-1/4\"": { part: "10-3774", imageKey: "TailpieceSargentLFICEM" },
        },
        "LFIC XC": {
          "1-3/8\"-2\"": { part: "10-3777", imageKey: "TailpieceSargentLFICXCEM" },
          "2-1/4\"": { part: "10-3778", imageKey: "TailpieceSargentLFICXCEM" },
        },
      },
    },
    SFIC: {
      "Mechanical Functions": {
        "6-Pin SFIC": {
          "1-3/8\"-2\"": { part: "10-3633", imageKey: "TailpieceSargentSFIC" },
          "2-1/4\"": { part: "10-3634", imageKey: "TailpieceSargentSFIC" },
        },
        "7-Pin SFIC": {
          "1-3/8\"-2\"": { part: "10-3633", imageKey: "TailpieceSargentSFIC" },
          "2-1/4\"": { part: "10-3634", imageKey: "TailpieceSargentSFIC" },
        },
        XC: {
          "1-3/8\"-2\"": { part: "10-3641", imageKey: "TailpieceSargentSFICXC" },
          "2-1/4\"": { part: "10-3642", imageKey: "TailpieceSargentSFICXC" },
        },
      },
      "Electrified Functions": {
        "6-Pin SFIC": {
          "1-3/8\"-2\"": { part: "10-3775", imageKey: "TailpieceSargentSFICEM" },
          "2-1/4\"": { part: "10-3776", imageKey: "TailpieceSargentSFICEM" },
        },
        "7-Pin SFIC": {
          "1-3/8\"-2\"": { part: "10-3775", imageKey: "TailpieceSargentSFICEM" },
          "2-1/4\"": { part: "10-3776", imageKey: "TailpieceSargentSFICEM" },
        },
        XC: {
          "1-3/8\"-2\"": { part: "10-3779", imageKey: "TailpieceSargentSFICEMXC" },
          "2-1/4\"": { part: "10-3780", imageKey: "TailpieceSargentSFICEMXC" },
        },
      },
    },
    "Competitive Cylinders/Cores": {
      "Fixed Core": {
        "Schlage": {
          "Mechanical Functions": {
            "Fixed Core 6 Pin": {
              "1-3/8\"-2\"": { part: "10-3625", imageKey: "TailpieceSchlageConventional" },
              "2-1/4\"": { part: "10-3626", imageKey: "TailpieceSchlageConventional" },
            },
          },
          "Electrified Functions": {
            "Fixed Core 6 Pin": {
              "1-3/8\"-2\"": { part: "10-3781", imageKey: "TailpieceSchlageConventionalEM" },
              "2-1/4\"": { part: "10-3782", imageKey: "TailpieceSchlageConventionalEM" },
            },
          },
        },
        "ASSA ABLOY ACCENTRA": {
          "Mechanical Functions": {
            "Fixed Core 6 Pin (YC-)": {
              "1-3/8\"-2\"": { part: "10-3639", imageKey: "TailpieceACCENTRAConventional6" },
              "2-1/4\"": { part: "10-3640", imageKey: "TailpieceACCENTRAConventional6" },
            },
            "Fixed Core 7 Pin (YC-7P-)": {
              "1-3/8\"-2\"": { part: "10-3664", imageKey: "TailpieceACCENTRAConventional7" },
              "2-1/4\"": { part: "10-3665", imageKey: "TailpieceACCENTRAConventional7" },
            },
          },
          "Electrified Functions": {
            "Fixed Core 6 Pin (YC-)": {
              "1-3/8\"-2\"": { part: "10-3783", imageKey: "TailpieceACCENTRAConventional6EM" },
              "2-1/4\"": { part: "10-3784", imageKey: "TailpieceACCENTRAConventional6EM" },
            },
            "Fixed Core 7 Pin (YC-7P-)": {
              "1-3/8\"-2\"": { part: "10-3785", imageKey: "TailpieceACCENTRAConventional7EM" },
              "2-1/4\"": { part: "10-3786", imageKey: "TailpieceACCENTRAConventional7EM" },
            },
          },
        },
      },
      "Interchangeable Core": {
        "All SFIC": {
          "Mechanical Functions": {
            "6 or 7 Pin": {
              "1-3/8\"-2\"": { part: "10-3633", imageKey: "TailpieceSargentSFIC" },
              "2-1/4\"": { part: "10-3634", imageKey: "TailpieceSargentSFIC" },
            },
          },
          "Electrified Functions": {
            "6 or 7 Pin": {
              "1-3/8\"-2\"": { part: "10-3775", imageKey: "TailpieceSargentSFICEM" },
              "2-1/4\"": { part: "10-3776", imageKey: "TailpieceSargentSFICEM" },
            },
          },
        },
        "Schlage": {
          "Mechanical Functions": {
            "LFIC 6 Pin (SF-)": {
              "1-3/8\"-2\"": { part: "10-3627", imageKey: "TailpieceSchlageLFIC" },
              "2-1/4\"": { part: "10-3628", imageKey: "TailpieceSchlageLFIC" },
            },
          },
          "Electrified Functions": {
            "LFIC 6 Pin (SF-)": {
              "1-3/8\"-2\"": { part: "10-3789", imageKey: "TailpieceSchlageLFICEM" },
              "2-1/4\"": { part: "10-3790", imageKey: "TailpieceSchlageLFICEM" },
            },
          },
        },
        "ASSA ABLOY ACCENTRA": {
          "Mechanical Functions": {
            "LFIC 6 Pin (YRC-)": {
              "1-3/8\"-2\"": { part: "10-1191", imageKey: "TailpieceACCENTRALFIC" },
              "2-1/4\"": { part: "10-1192", imageKey: "TailpieceACCENTRALFIC" },
            },
          },
          "Electrified Functions": {
            "LFIC 6 Pin (YRC-)": {
              "1-3/8\"-2\"": { part: "10-3787", imageKey: "TailpieceACCENTRALFICEM" },
              "2-1/4\"": { part: "10-3788", imageKey: "TailpieceACCENTRALFICEM" },
            },
          },
        },
      },
    },
  },
};

const Tailpieces = () => {
  const [selectedLockSeries, setSelectedLockSeries] = useState(null);
  const [selectedCylinderType, setSelectedCylinderType] = useState(null);
  const [selectedCompetitiveType, setSelectedCompetitiveType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedFunctionType, setSelectedFunctionType] = useState(null);
  const [selectedCylinderSubtype, setSelectedCylinderSubtype] = useState(null);
  const [selectedDoorThickness, setSelectedDoorThickness] = useState(null);
  const [partNumber, setPartNumber] = useState("");
  const [partImage, setPartImage] = useState("");

  const resultRef = useRef(null);

  useEffect(() => {
    if (partNumber && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [partNumber]);

  // Options for dropdowns
  const lockSeriesOptions = Object.keys(tailpieceData).map((key) => ({
    value: key,
    label: key,
  }));

  const cylinderTypeOptions = selectedLockSeries
    ? Object.keys(tailpieceData[selectedLockSeries.value]).map((key) => ({
        value: key,
        label: key,
      }))
    : [];

  const competitiveTypeOptions =
    selectedCylinderType &&
    selectedCylinderType.value === "Competitive Cylinders/Cores"
      ? Object.keys(
          tailpieceData[selectedLockSeries.value][selectedCylinderType.value]
        ).map((key) => ({
          value: key,
          label: key,
        }))
      : [];

  const brandOptions =
    selectedCompetitiveType &&
    selectedCylinderType.value === "Competitive Cylinders/Cores"
      ? Object.keys(
          tailpieceData[selectedLockSeries.value][
            selectedCylinderType.value
          ][selectedCompetitiveType.value]
        ).map((key) => ({
          value: key,
          label: key,
        }))
      : [];

  const functionTypeOptions = (() => {
    if (selectedLockSeries && selectedCylinderType) {
      if (selectedCylinderType.value === "Competitive Cylinders/Cores") {
        if (selectedCompetitiveType && selectedBrand) {
          return Object.keys(
            tailpieceData[selectedLockSeries.value][
              selectedCylinderType.value
            ][selectedCompetitiveType.value][selectedBrand.value]
          ).map((key) => ({ value: key, label: key }));
        }
      } else {
        return Object.keys(
          tailpieceData[selectedLockSeries.value][selectedCylinderType.value]
        ).map((key) => ({ value: key, label: key }));
      }
    }
    return [];
  })();

  const cylinderSubtypeOptions = (() => {
    if (selectedLockSeries && selectedCylinderType && selectedFunctionType) {
      if (selectedCylinderType.value === "Competitive Cylinders/Cores") {
        if (selectedCompetitiveType && selectedBrand) {
          return Object.keys(
            tailpieceData[selectedLockSeries.value][
              selectedCylinderType.value
            ][selectedCompetitiveType.value][selectedBrand.value][
              selectedFunctionType.value
            ]
          ).map((key) => ({ value: key, label: key }));
        }
      } else {
        return Object.keys(
          tailpieceData[selectedLockSeries.value][selectedCylinderType.value][
            selectedFunctionType.value
          ]
        ).map((key) => ({ value: key, label: key }));
      }
    }
    return [];
  })();

  const doorThicknessOptions = (() => {
    if (
      selectedLockSeries &&
      selectedCylinderType &&
      selectedFunctionType &&
      selectedCylinderSubtype
    ) {
      let dataPath;
      if (selectedCylinderType.value === "Competitive Cylinders/Cores") {
        if (selectedCompetitiveType && selectedBrand) {
          dataPath =
            tailpieceData[selectedLockSeries.value][
              selectedCylinderType.value
            ][selectedCompetitiveType.value][selectedBrand.value][
              selectedFunctionType.value
            ][selectedCylinderSubtype.value];
        }
      } else {
        dataPath =
          tailpieceData[selectedLockSeries.value][selectedCylinderType.value][
            selectedFunctionType.value
          ][selectedCylinderSubtype.value];
      }
      return dataPath ? Object.keys(dataPath).map((key) => ({ value: key, label: key })) : [];
    }
    return [];
  })();

  // Handlers for selection changes
  const handleLockSeriesChange = (selectedOption) => {
    setSelectedLockSeries(selectedOption);
    setSelectedCylinderType(null);
    setSelectedCompetitiveType(null);
    setSelectedBrand(null);
    setSelectedFunctionType(null);
    setSelectedCylinderSubtype(null);
    setSelectedDoorThickness(null);
    setPartNumber("");
    setPartImage("");
  };

  const handleCylinderTypeChange = (selectedOption) => {
    setSelectedCylinderType(selectedOption);
    setSelectedCompetitiveType(null);
    setSelectedBrand(null);
    setSelectedFunctionType(null);
    setSelectedCylinderSubtype(null);
    setSelectedDoorThickness(null);
    setPartNumber("");
    setPartImage("");
  };

  const handleCompetitiveTypeChange = (selectedOption) => {
    setSelectedCompetitiveType(selectedOption);
    setSelectedBrand(null);
    setSelectedFunctionType(null);
    setSelectedCylinderSubtype(null);
    setSelectedDoorThickness(null);
    setPartNumber("");
    setPartImage("");
  };

  const handleBrandChange = (selectedOption) => {
    setSelectedBrand(selectedOption);
    setSelectedFunctionType(null);
    setSelectedCylinderSubtype(null);
    setSelectedDoorThickness(null);
    setPartNumber("");
    setPartImage("");
  };

  const handleFunctionTypeChange = (selectedOption) => {
    setSelectedFunctionType(selectedOption);
    setSelectedCylinderSubtype(null);
    setSelectedDoorThickness(null);
    setPartNumber("");
    setPartImage("");
  };

  const handleCylinderSubtypeChange = (selectedOption) => {
    setSelectedCylinderSubtype(selectedOption);
    setSelectedDoorThickness(null);
    setPartNumber("");
    setPartImage("");
  };

  const handleDoorThicknessChange = (selectedOption) => {
    setSelectedDoorThickness(selectedOption);
    setPartNumber("");
    setPartImage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let result = null;
    if (selectedLockSeries && selectedCylinderType) {
      if (selectedCylinderType.value === "Competitive Cylinders/Cores") {
        if (
          selectedCompetitiveType &&
          selectedBrand &&
          selectedFunctionType &&
          selectedCylinderSubtype &&
          selectedDoorThickness
        ) {
          result =
            tailpieceData[selectedLockSeries.value][
              selectedCylinderType.value
            ][selectedCompetitiveType.value][selectedBrand.value][
              selectedFunctionType.value
            ][selectedCylinderSubtype.value][selectedDoorThickness.value];
        }
      } else {
        if (
          selectedFunctionType &&
          selectedCylinderSubtype &&
          selectedDoorThickness
        ) {
          result =
            tailpieceData[selectedLockSeries.value][selectedCylinderType.value][
              selectedFunctionType.value
            ][selectedCylinderSubtype.value][selectedDoorThickness.value];
        }
      }
    }

    if (result && result.part) {
      setPartNumber(result.part);
      // Use the images object to get the actual image path
      setPartImage(images[result.imageKey] || "");
    } else {
      setPartNumber("Part number not found for this combination or incomplete selections.");
      setPartImage("");
    }
  };

  const handleReset = () => {
    setSelectedLockSeries(null);
    setSelectedCylinderType(null);
    setSelectedCompetitiveType(null);
    setSelectedBrand(null);
    setSelectedFunctionType(null);
    setSelectedCylinderSubtype(null);
    setSelectedDoorThickness(null);
    setPartNumber("");
    setPartImage("");
  };

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
      borderRadius: "25px",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "4px",
    }),
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">Tailpiece Part Number Lookup</h1>

      <form onSubmit={handleSubmit} className="part-form">
        {/* Lock Series Selection */}
        <div className="form-group">
          <label>Lock Series:</label>
          <Select
            options={lockSeriesOptions}
            onChange={handleLockSeriesChange}
            value={selectedLockSeries}
            placeholder="Select Lock Series..."
            styles={customSelectStyles}
            required
          />
        </div>

        {/* Cylinder Type Selection */}
        {selectedLockSeries && (
          <div className="form-group">
            <label>Cylinder Type:</label>
            <Select
              options={cylinderTypeOptions}
              onChange={handleCylinderTypeChange}
              value={selectedCylinderType}
              placeholder="Select Cylinder Type..."
              styles={customSelectStyles}
              required
            />
          </div>
        )}

        {/* Competitive Type Selection (Fixed Core / Interchangeable Core) */}
        {selectedCylinderType &&
          selectedCylinderType.value === "Competitive Cylinders/Cores" && (
            <div className="form-group">
              <label>Competitive Cylinder Type:</label>
              <Select
                options={competitiveTypeOptions}
                onChange={handleCompetitiveTypeChange}
                value={selectedCompetitiveType}
                placeholder="Select Competitive Cylinder Type..."
                styles={customSelectStyles}
                required
              />
            </div>
          )}

        {/* Brand/Category Selection for Competitive Cylinders */}
        {selectedCompetitiveType &&
          selectedCylinderType.value === "Competitive Cylinders/Cores" && (
            <div className="form-group">
              <label>Brand/Category:</label>
              <Select
                options={brandOptions}
                onChange={handleBrandChange}
                value={selectedBrand}
                placeholder="Select Brand or Category..."
                styles={customSelectStyles}
                required
              />
            </div>
          )}

        {/* Function Type Selection (Mechanical/Electrified) */}
        {(selectedCylinderType &&
          selectedCylinderType.value !== "Competitive Cylinders/Cores") ||
        (selectedCylinderType &&
          selectedCylinderType.value === "Competitive Cylinders/Cores" &&
          selectedBrand) ? (
          <div className="form-group">
            <label>Function Type:</label>
            <Select
              options={functionTypeOptions}
              onChange={handleFunctionTypeChange}
              value={selectedFunctionType}
              placeholder="Select Function Type..."
              styles={customSelectStyles}
              required
            />
          </div>
        ) : null}

        {/* Cylinder Subtype Selection */}
        {selectedFunctionType && (
          <div className="form-group">
            <label>Cylinder Subtype:</label>
            <Select
              options={cylinderSubtypeOptions}
              onChange={handleCylinderSubtypeChange}
              value={selectedCylinderSubtype}
              placeholder="Select Cylinder Subtype..."
              styles={customSelectStyles}
              required
            />
          </div>
        )}

        {/* Door Thickness Selection */}
        {selectedCylinderSubtype && (
          <div className="form-group">
            <label>Door Thickness:</label>
            <Select
              options={doorThicknessOptions}
              onChange={handleDoorThicknessChange}
              value={selectedDoorThickness}
              placeholder="Select Door Thickness..."
              styles={customSelectStyles}
              required
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

      {/* Results */}
      {partNumber && (
        <div ref={resultRef} className="result-container">
          <h2>Found Part Number:</h2>
          <div className="part-number">{partNumber}</div>
          {partImage && (
            <img
              src={partImage}
              alt="Tailpiece Part"
              className="part-image"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Tailpieces;