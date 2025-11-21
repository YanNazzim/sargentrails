// src/components/LockingSlideKits.js
import React from "react";
import "../App.css"; 

const kitsData = [
    {
        part: "607-1",
        conversion: "706 (Storeroom) \u2192 713 (Classroom)",
        description: "Converts a **Storeroom** trim (key temporarily unlocks lever) to a **Classroom** trim (key locks and unlocks lever).",
        note: "Applicable to 700, 700-4, and 700-8 Series trims.",
    },
    {
        part: "607-2",
        conversion: "713 (Classroom) \u2192 706 (Storeroom)",
        description: "Converts a **Classroom** trim (key locks and unlocks lever) back to a **Storeroom** trim (key temporarily unlocks lever).",
        note: "Applicable to 700, 700-4, and 700-8 Series trims.",
    },
    {
        part: "607-3",
        conversion: "746 (Freewheeling Storeroom) \u2192 743 (Freewheeling Classroom)",
        description: "Converts a **Freewheeling Storeroom** trim to a **Freewheeling Classroom** trim (key locks and unlocks lever). Both maintain a freewheeling feature when locked.",
        note: "Applicable to 740, 740-4, and 740-8 Series trims.",
    },
    {
        part: "607-4",
        conversion: "743 (Freewheeling Classroom) \u2192 746 (Freewheeling Storeroom)",
        description: "Converts a **Freewheeling Classroom** trim back to a **Freewheeling Storeroom** trim.",
        note: "Applicable to 740, 740-4, and 740-8 Series trims.",
    },
    {
        part: "607-5",
        conversion: "743-6 \u2192 746-6 (Mortise Function Change)",
        description: "Converts the trim mechanism between the Freewheeling Classroom (-6) and Freewheeling Storeroom (-6) functions specifically for **Mortise Exit Devices** (e.g., 8900/PE8900).",
        note: "Used for specific trim types (e.g., Pull/Escutcheon) on Mortise Exit Devices.",
    },
];

const LockingSlideKits = () => {
    return (
        <div className="content-transition">
            <h1 className="Heading">Locking Slide Conversion Kits</h1>
            <p className="note" style={{ textAlign: 'center', color: '#ffcc00', marginBottom: '1.5rem' }}>
                These kits convert an existing trim's locking function slide mechanism.
            </p>

            <div className="result-container" style={{ alignItems: 'stretch' }}>
                <h2>Conversion Kit List</h2>
                <div className="parts-grid" style={{ gridTemplateColumns: '1fr' }}>
                    {kitsData.map((kit) => (
                        <div key={kit.part} className="parts-column" style={{ padding: '2rem' }}>
                            <h3>{kit.part}</h3>
                            <div className="part-number" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                                <strong>Conversion:</strong> {kit.conversion}
                            </div>
                            <p style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                                {kit.description}
                            </p>
                            <p style={{ color: '#aaa', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                {kit.note}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LockingSlideKits;