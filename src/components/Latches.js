// src/components/Latches.js
import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import images from "../images"; 
import "../App.css"; 

export const boredLockLatchesData = {
    "6Line": {
        type: "dimensions", 
        options: {
            "2-3/8_Standard": {
                label: '2-3/8" backset - 2-1/4" x 1" latch face width (Standard)',
                base: `Guarded: 06-5083 <br/> Non-Guarded: 06-5225`,
            },
            "2-3/8_RadiusCorner": {
                label: '2-3/8" Radius Corner - 2-1/4" x 1" latch face width',
                base: `Guarded: 06-5085 <br/> Unguarded: 06-5227`,
            },
            "2-3/4_Standard": {
                label: '2-3/4" backset - 2-1/4" x 1" latch face width (17- Option)',
                base: `Guarded: 06-5094 <br/> Unguarded: 06-5231`,
            },
            "2-3/4_Alt": {
                label: '2-3/4" backset - 2-1/4" x 1-1/8" latch face width(24- Option)',
                base: `Guarded: 06-5102 <br/> Unguarded: 06-5234`,
            },
            "3-3/4_Standard": {
                label: '3-3/4" backset - 2-1/4" x 1" latch face width',
                base: `Guarded: 06-5096 <br/> Unguarded: 06-5232`,
            },
            "Guarded_Drive_in": {
                label: 'Guarded Drive-In Latchbolt',
                base: `06-5100`,
            },
        },
    },
    "6500Series": {
        type: "dimensions",
        options: {
            "2-3/8 backset": {
                label: '2-3/8" backset - 1" latch face width (20- Option)',
                base: `Guarded: 05-2184 <br/> Unguarded: 05-2185`,
            },
            "2-3/4 backset": {
                label: '2-3/4" backset - 1-1/8" latch face width (Standard)',
                base: `Guarded: 05-2182 <br/> Unguarded: 05-2183`,
            },
        },
    },
    "7Line": {
        type: "backsetOnly",
        options: {
            "2-3/8": {
                label: '2-3/8" backset - 1" latch face width (20- Option)',
                base: `Guarded: 07-2431 <br/> Unguarded: 07-2433`,
            },
            "2-3/4": {
                label: '2-3/4" backset - 1-1/8" latch face width (Standard)',
                base: `Guarded: 07-2430 <br/> Unguarded: 07-2432`,
            },
        },
    },
    "8X": {
        type: "Function",
        options: {
            "2-3/4": {
                label: 'Standard 2-3/4" Backset with 1" Latch Face Width',
                base: `Guarded: 08-5283 <br/> Unguarded: 08-5282`,
            }
        }
    },
    "10X": {
        type: "function",
        options: {
            "2-3/8_Unguarded": {
                label: '10XU15, 10XU65, 10XU68 - 2-3/8" backset - 1" latch face width (Unguarded | 20- option)',
                base: `10-3187`,
            },
            "2-3/4_Unguarded": {
                label: '10XU15, 10XU65, 10XU68 - 2-3/4" backset - 1-1/8" latch face width (Unguarded | Standard)',
                base: `10-2022`,
            },
            "3-3/4_Unguarded": {
                label: '10XU15, 10XU65, 10XU68 - 3-3/4" backset - 1-1/8" latch face width (Unguarded | 23- Option)',
                base: `10-2054`,
            },
            "5_Unguarded": {
                label: '10XU15, 10XU65, 10XU68 - 5" backset - 1-1/8" latch face width (Unguarded | 25- Option)',
                base: `10-2057`,
            },
            "2-3/8_Guarded": {
                label: 'All Other Mechanical Functions - 2-3/8" backset - 1" latch face width - 1/2" Throw (Guarded | 20- option)',
                base: `10-3186`,
            },
            "2-3/4_Guarded": {
                label: 'All Other Mechanical Functions - 2-3/4" backset - 1-1/8" latch face width - 1/2" Throw (Guarded | Standard)',
                base: `10-3192`,
            },
            "2-3/4_Guardedthrow": {
                label: 'All Other Mechanical Functions - 2-3/4" backset - 1-1/8" latch face width - 3/4" Throw (Guarded | Optional)',
                base: `10-2634`,
            },
            "3-3/4_Guarded": {
                label: 'All Other Mechanical Functions - 3-3/4" backset - 1-1/8" latch face width - 1/2" Throw (Guarded | 23- option)',
                base: `10-2053`,
            },
            "5_Guarded": {
                label: 'All Other Mechanical Functions - 5" backset - 1-1/8" latch face width - 1/2" Throw (Guarded | 25- option)',
                base: `10-2058`,
            },
            "2-3/8_Guarded_E": {
                label: 'All Electrified Functions - 2-3/8" backset - 1" latch face width - 1/2" Throw (Guarded | 20- option)',
                base: `10-3433`,
            },
            "2-3/4_Guarded_E": {
                label: 'All Electrified Functions - 2-3/4" backset - 1-1/8" latch face width - 1/2" Throw (Guarded | Standard)',
                base: `10-3430`,
            },
            "3-3/4_Guarded_E": {
                label: 'All Electrified Functions - 3-3/4" backset - 1-1/8" latch face width - 1/2" Throw (Guarded | 23- option)',
                base: `10-3431`,
            },
            "5_Guarded_E": {
                label: 'All Electrified Functions - 5" backset - 1-1/8" latch face width - 1/2" Throw (Guarded | 25- option)',
                base: `10-3432`,
            },
        },
    },
    "11Line": {
        type: "functions",
        options: {
            "Group B": {
                label: "Functions 11G04, 11G05, 11G13, 11G15-3, 11G16, 11G17, 11G30, 11G37, 11G38, ",
                base: `11-2106`, 
            },
            "Group A": {
                label: "11U15 - Passage",
                base: `11-2107`, 
            },
            "Group D": {
                label: "Functions 11G44, 11G50, 11G54",
                base: `11-2110`, 
            },
            "Group K": {
                label: "11G24 - Entrance",
                base: `11-2108`, 
            },
        }
    },
};

export const seriesOptions = [
    { value: "6Line", label: "6 Line Bored Lock" },
    { value: "6500Series", label: "6500 Series Bored Lock" },
    { value: "7Line", label: "7 Line Bored Lock" },
    { value: "8X", label: "8X Line Bored Lock" },
    { value: "10X", label: "10X Series Bored Lock" },
    { value: "11Line", label: "11 Line Bored Lock" },
];

export const finishOptions = [
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
    { value: "32", label: "32 - Bright Stainless Steel", image: images.finish32 },
    { value: "32D", label: "32D - Satin Stainless Steel", image: images.finish32D },
    { value: "BSP", label: "BSP - Black suede powder coat, sprayed", image: images.finishBSP },
    { value: "WSP", label: "WSP - White suede powder coat, sprayed", image: images.finishWSP },
];

// Custom components
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
                <span>{props.children}</span>
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
                <span>{props.children}</span>
            </div>
        </components.SingleValue>
    );
};

const Latches = ({ initialData }) => {
    const [formData, setFormData] = useState({
        series: "",
        latchType: "",
        finish: null,
    });
    const [partNumber, setPartNumber] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({
                ...prev,
                series: initialData.series || "",
                latchType: initialData.latchType || "",
                finish: null, 
            }));
        }
    }, [initialData]);

    const getLatchOptions = (series) => {
        const seriesData = boredLockLatchesData[series];
        if (!seriesData || !seriesData.options) return [];
        return Object.keys(seriesData.options).map(key => ({
            value: key,
            label: seriesData.options[key].label,
        }));
    };

    const getLatchLabel = (series) => {
        const seriesData = boredLockLatchesData[series];
        if (!seriesData) return "Latch Type:";
        switch (seriesData.type) {
            case "dimensions": return "Backset/Latch Dimensions:";
            case "functions": return "Function:";
            case "backsetOnly": return "Backset:";
            default: return "Latch Type:";
        }
    };

    const handleSeriesChange = (e) => {
        setFormData({ ...formData, series: e.target.value, latchType: "" });
        setPartNumber("");
    };

    const handleLatchTypeChange = (e) => {
        setFormData({ ...formData, latchType: e.target.value });
        setPartNumber("");
    };

    const handleFinishChange = (selectedOption) => {
        setFormData({ ...formData, finish: selectedOption });
        setPartNumber("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { series, latchType, finish } = formData;
        if (!series || !latchType || !finish) {
            alert("Please fill out all required fields: Series, Latch Type, and Finish.");
            setPartNumber("");
            return;
        }

        const seriesData = boredLockLatchesData[series];
        if (!seriesData || !seriesData.options) {
            setPartNumber("Series data or latch type options not found.");
            return;
        }

        const selectedLatchOption = seriesData.options[latchType];
        if (!selectedLatchOption) {
            setPartNumber("Selected latch type not found for this series.");
            return;
        }

        let basePart = selectedLatchOption.base;
        const partsWithFinish = basePart.split('<br/>').map(part => `${part.trim()}-${finish.value}`).join('<br/>');
        setPartNumber(partsWithFinish);
    };

    const handleReset = () => {
        setFormData({ series: "", latchType: "", finish: null });
        setPartNumber("");
    };

    return (
        <div className="content-transition">
            <h1 className="title">Bored Lock Latches</h1>
            <form onSubmit={handleSubmit} className="part-form">
                <div className="form-group">
                    <label>Lock Series:</label>
                    <select value={formData.series} onChange={handleSeriesChange} required>
                        <option value="">Select Series</option>
                        {seriesOptions.map((series) => (
                            <option key={series.value} value={series.value}>{series.label}</option>
                        ))}
                    </select>
                </div>

                {formData.series && (
                    <div className="form-group">
                        <label>{getLatchLabel(formData.series)}</label>
                        <select value={formData.latchType} onChange={handleLatchTypeChange} required>
                            <option value="">Select {getLatchLabel(formData.series).replace(':', '')}</option>
                            {getLatchOptions(formData.series).map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="form-group">
                    <label>Finish:</label>
                    <Select
                        options={finishOptions}
                        onChange={handleFinishChange}
                        value={formData.finish}
                        placeholder="Select Finish..."
                        components={{ Option: FinishOption, SingleValue: FinishSingleValue }}
                        classNamePrefix="react-select"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="generate-button">Find Part Number</button>
                    <button type="button" onClick={handleReset} className="reset-button">Reset</button>
                </div>
            </form>

            {partNumber && (
                <div className="result-container">
                    <h2 className="title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Found Part Number:</h2>
                    <div className="part-number" dangerouslySetInnerHTML={{ __html: partNumber }} />
                </div>
            )}
        </div>
    );
};

export default Latches;