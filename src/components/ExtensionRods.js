// src/components/ExtensionRods.js
import React from "react";
import "../App.css"; 
import images from "../images"; // <-- ADDED IMPORT

// Data for the Extension Rods (unchanged)
const extensionRodData = {
    cvr: [
        { size: '12"', part: "68-4209", description: "Concealed Vertical Rod (CVR) - For 8400/8600 Series Devices." },
        { size: '18"', part: "68-4210", description: "Concealed Vertical Rod (CVR) - For 8400/8600 Series Devices." },
        { size: '24"', part: "68-4211", description: "Concealed Vertical Rod (CVR) - For 8400/8600 Series Devices." },
    ],
    svr: [
        { size: '6"', part: "571-6-FINISH", description: "Surface Vertical Rod (SVR) - For 8700 Series Devices. *Finish Required." },
        { size: '12"', part: "571-12-FINISH", description: "Surface Vertical Rod (SVR) - For 8700 Series Devices. *Finish Required." },
        { size: '18"', part: "571-18-FINISH", description: "Surface Vertical Rod (SVR) - For 8700 Series Devices. *Finish Required." },
    ],
};

// Consolidated finishes array with image paths (using imported images object)
const fullFinishOptions = [
    { value: "03", label: "03", image: images.finish03 },
    { value: "04", label: "04", image: images.finish04 },
    { value: "09", label: "09", image: images.finish09 },
    { value: "10", label: "10", image: images.finish10 },
    { value: "10B", label: "10B", image: images.finish10B },
    { value: "10BE", label: "10BE", image: images.finish10BE },
    { value: "10BL", label: "10BL", image: images.finish10BL },
    { value: "14", label: "14", image: images.finish14 },
    { value: "15", label: "15", image: images.finish15 },
    { value: "20D", label: "20D", image: images.finish20D },
    { value: "26", label: "26", image: images.finish26 },
    { value: "26D", label: "26D", image: images.finish26D },
    { value: "32", label: "32", image: images.finish32 },
    { value: "32D", label: "32D", image: images.finish32D },
    { value: "BSP", label: "BSP", image: images.finishBSP },
    { value: "WSP", label: "WSP", image: images.finishWSP },
];

// Reusable component to render the list of rods
const RodList = ({ title, rods, requiresFinish }) => (
    <div className="parts-column" style={{ padding: '2rem' }}>
        <h3 style={{ borderBottom: '2px solid #2ecc71', paddingBottom: '1rem', marginBottom: '1.5rem' }}>{title}</h3>
        {rods.map((rod) => (
            <div key={rod.part} style={{ marginBottom: '1rem', borderBottom: '1px solid #172a45', paddingBottom: '1rem' }}>
                <div className="part-number" style={{ fontSize: '1.4rem', color: requiresFinish ? '#ffcc00' : '#2ecc71' }}>
                    {rod.size}: {rod.part}
                </div>
                <p style={{ color: '#ffffff', margin: '0.25rem 0 0 0' }}>
                    {rod.description}
                </p>
                {requiresFinish && (
                    <>
                    <p style={{ color: '#ffcc00', fontSize: '0.9rem', margin: '0.5rem 0 0.5rem 0' }}>
                        *Hover over finish codes to see swatch
                    </p>
                    <div className="finish-swatch-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {fullFinishOptions.map(f => (
                            <span 
                                key={f.value} 
                                className="finish-swatch-item" 
                                style={{
                                    backgroundColor: '#001f3f', 
                                    padding: '5px 10px', 
                                    borderRadius: '5px', 
                                    border: '1px solid #ffcc00', 
                                    cursor: 'pointer',
                                    position: 'relative',
                                    color: '#fff',
                                    fontSize: '0.9rem'
                                }}
                            >
                                -{f.label}
                                {/* Image element for hover popup, controlled by CSS */}
                                <img
                                    src={f.image}
                                    alt={`Finish ${f.label}`}
                                    className="finish-hover-image"
                                />
                            </span>
                        ))}
                    </div>
                    </>
                )}
            </div>
        ))}
    </div>
);


const ExtensionRods = () => {

    return (
        <div className="content-transition">
            <h1 className="Heading">Extension Rods</h1>
            <p className="note" style={{ 
                textAlign: 'center', 
                color: 'red', 
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                border: '2px solid red',
                padding: '1rem',
                backgroundColor: '#172a45'
            }}>
                <span style={{ fontSize: '1.2rem', color: '#ffcc00' }}>⚠ Important Warning ⚠</span>
                <br /><br />
                <strong>NEVER CUT EXTENSION RODS</strong>
                <br />
                <strong>ONLY CUT ORIGINAL ROD FROM UNTHREADED SIDE</strong>
            </p>

            <div className="result-container" style={{ alignItems: 'stretch' }}>
                <h2>Available Rod Extensions</h2>
                <div className="parts-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <RodList 
                        title="CVR Extension Rods (8600/PE8600)" 
                        rods={extensionRodData.cvr} 
                        requiresFinish={false}
                    />
                    <RodList 
                        title="SVR Extension Rods (8700/9700/PE8700)" 
                        rods={extensionRodData.svr} 
                        requiresFinish={true}
                    />
                </div>

            </div>
        </div>
    );
};

export default ExtensionRods;