// src/components/9400Parts.js
import React from "react";
import "../App.css"; 

const partsData = [
    {
        part: "94-2376",
        description: "Center Case, Active (Chassis)",
        note: "This is the chassis assembly located in the center of the push bar for the active leaf.",
    },
    {
        part: "94-2380",
        description: "Center Case, InActive (Chassis)",
        note: "This is the chassis assembly located in the center of the push bar for the inactive leaf (used in double door applications).",
    },
    {
        part: "94-2385",
        description: "Top Latch Assembly (6'4\" to 8'6\" Doors)",
        note: "The top vertical latch mechanism for standard door heights.",
    },
    {
        part: "94-2474",
        description: "Top Latch Assembly (8'6\" to 10'8\" Doors)",
        note: "The top vertical latch mechanism for extended/tall door heights.",
    },
    {
        part: "94-2386-FINISH",
        description: "Bottom Latch Assembly",
        note: "Base part number (e.g., 94-2386-26D). Must specify finish code for full part number.",
        finishRequired: true,
    },
    {
        part: "94-0190-FINISH",
        description: "Crossbar",
        note: "Base part number (e.g., 94-0190-26D). Must specify finish code for full part number.",
        finishRequired: true,
    },
    {
        part: "94-2384-FINISH",
        description: "Tenon Pack",
        note: "Tenon hardware pack. Must specify finish code for full part number.",
        finishRequired: true,
    },
    {
        part: "94-2390",
        description: "Top Strike Pack",
        note: "Hardware pack including the top strike and mounting hardware.",
    },
    {
        part: "94-2391",
        description: "Bottom Strike Pack",
        note: "Hardware pack including the bottom strike and mounting hardware.",
    },
    {
        part: "94-2389",
        description: "Latch Mounting Brackets Pack",
        note: "Brackets used to mount the vertical rod latch assemblies.",
    },
    {
        part: "68-2143",
        description: "Screw Pack (Mounting)",
        note: "Package of mounting screws for installation.",
    },
];

const NinetyFourHundredParts = () => {
    return (
        <div className="content-transition">
            <h1 className="Heading">9400 Concealed Vertical Rod (CVR) Parts</h1>
            <p className="note" style={{ textAlign: 'center', color: '#ffcc00', marginBottom: '1.5rem' }}>
                Specific, hard-to-find internal and trim-related components for the 9400 device.
            </p>

            <div className="result-container" style={{ alignItems: 'stretch' }}>
                <h2>Component List</h2>
                <div className="parts-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                    {partsData.map((item) => (
                        <div key={item.part} className="parts-column" style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.25rem', color: item.finishRequired ? '#ffcc00' : '#2ecc71' }}>
                                {item.part}
                            </h3>
                            <div className="part-number" style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>
                                <strong>{item.description}</strong>
                            </div>
                            <p style={{ color: '#aaa', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                                {item.note}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NinetyFourHundredParts;