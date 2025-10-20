// src/components/SpindleKits.js
import React from "react";
import "../App.css"; 

// Flattened data structure for static display, incorporating descriptions.
const spindleKitsDisplayData = [
    { 
        part: "730-1", 
        series: "700 Series", 
        thickness: '1-3/4"', 
        description: 'Replaces existing spindles for **700 Series** trims (used on 8300 Mortise, 8700 SVR, 8900 Mortise Exits) on **1-3/4" Doors**.' 
    },
    { 
        part: "730-2", 
        series: "700 Series", 
        thickness: '2"', 
        description: 'Replaces existing spindles for **700 Series** trims (used on 8300 Mortise, 8700 SVR, 8900 Mortise Exits) on **2" Doors**.' 
    },
    { 
        part: "730-3", 
        series: "700 Series", 
        thickness: '2-1/4"', 
        description: 'Replaces existing spindles for **700 Series** trims (used on 8300 Mortise, 8700 SVR, 8900 Mortise Exits) on **2-1/4" Doors**.' 
    },
    
    { 
        part: "730-4", 
        series: "700-4 Series", 
        thickness: '1-3/4"', 
        description: 'Replaces existing spindles for **700-4 Series** trims (used on 8400 & 8600 CVR Exits) on **1-3/4" Doors**.' 
    },
    { 
        part: "730-5", 
        series: "700-4 Series", 
        thickness: '2"', 
        description: 'Replaces existing spindles for **700-4 Series** trims (used on 8400 & 8600 CVR Exits) on **2" Doors**.' 
    },
    { 
        part: "730-6", 
        series: "700-4 Series", 
        thickness: '2-1/4"', 
        description: 'Replaces existing spindles for **700-4 Series** trims (used on 8400 & 8600 CVR Exits) on **2-1/4" Doors**.' 
    },
    
    { 
        part: "730-7", 
        series: "700-8 Series", 
        thickness: '1-3/4"', 
        description: 'Replaces existing spindles for **700-8 Series** trims (used on 8500 & 8800 Rim Exits) on **1-3/4" Doors**.' 
    },
    { 
        part: "730-8", 
        series: "700-8 Series", 
        thickness: '2"', 
        description: 'Replaces existing spindles for **700-8 Series** trims (used on 8500 & 8800 Rim Exits) on **2" Doors**.' 
    },
    { 
        part: "730-9", 
        series: "700-8 Series", 
        thickness: '2-1/4"', 
        description: 'Replaces existing spindles for **700-8 Series** trims (used on 8500 & 8800 Rim Exits) on **2-1/4" Doors**.' 
    },
];

const SpindleKits = () => {
    // Helper function for rendering bold text using dangerouslySetInnerHTML
    const renderMarkdown = (text) => {
        const html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return { __html: html };
    };

    return (
        <div className="content-transition">
            <h1 className="Heading">730 Spindle Retrofit Kits</h1>
            <p className="note" style={{ textAlign: 'center', color: '#ffcc00', marginBottom: '1.5rem' }}>
                Used to replace existing spindles for **06, 13, 15, 16, 73, 74, 75 & 76 function ET Trims**.
                Kits include: Spindle, Retainer Plates, Mounting Screws & Return Springs.
            </p>

            <div className="result-container" style={{ alignItems: 'stretch' }}>
                <h2>Spindle Retrofit Kits by Trim Series and Door Thickness</h2>
                <div className="parts-grid" style={{ gridTemplateColumns: '1fr' }}>
                    {spindleKitsDisplayData.map((kit) => (
                        <div key={kit.part} className="parts-column" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '0' }}>{kit.part}</h3>
                            <div className="part-number" style={{ fontSize: '1.2rem', margin: '0.5rem 0 1rem 0' }}>
                                <strong>{kit.series}</strong> - {kit.thickness}
                            </div>
                            <p 
                                style={{ color: '#ffffff', marginBottom: '0' }}
                                dangerouslySetInnerHTML={renderMarkdown(kit.description)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpindleKits;