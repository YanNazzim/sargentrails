// src/components/SpindleKits.js
import React from "react";
import "../App.css"; 
import images from "../images"; // <-- Already existed, but emphasizing import

// Flattened data structure for static display, incorporating descriptions.
const spindleKitsDisplayData = [
    { 
        part: "730-1", 
        series: "700 Series", 
        thickness: '1-3/4"', 
        description: 'Replaces existing spindles for **700 Series** trims (used on 8300 Mortise, 8700 SVR, 8900 Mortise Exits) on **1-3/4" Doors**.' ,
        imageKey: "Spindle700", // NEW
    },
    { 
        part: "730-2", 
        series: "700 Series", 
        thickness: '2"', 
        description: 'Replaces existing spindles for **700 Series** trims (used on 8300 Mortise, 8700 SVR, 8900 Mortise Exits) on **2" Doors**.',
        imageKey: "Spindle700", // NEW
    },
    { 
        part: "730-3", 
        series: "700 Series", 
        thickness: '2-1/4"', 
        description: 'Replaces existing spindles for **700 Series** trims (used on 8300 Mortise, 8700 SVR, 8900 Mortise Exits) on **2-1/4" Doors**.',
        imageKey: "Spindle700", // NEW
    },
    
    { 
        part: "730-4", 
        series: "700-4 Series", 
        thickness: '1-3/4"', 
        description: 'Replaces existing spindles for **700-4 Series** trims (used on 8400 & 8600 CVR Exits) on **1-3/4" Doors**.',
        imageKey: "Spindle700_4", // NEW
    },
    { 
        part: "730-5", 
        series: "700-4 Series", 
        thickness: '2"', 
        description: 'Replaces existing spindles for **700-4 Series** trims (used on 8400 & 8600 CVR Exits) on **2" Doors**.',
        imageKey: "Spindle700_4", // NEW
    },
    { 
        part: "730-6", 
        series: "700-4 Series", 
        thickness: '2-1/4"', 
        description: 'Replaces existing spindles for **700-4 Series** trims (used on 8400 & 8600 CVR Exits) on **2-1/4" Doors**.',
        imageKey: "Spindle700_4", // NEW
    },
    
    { 
        part: "730-7", 
        series: "700-8 Series", 
        thickness: '1-3/4"', 
        description: 'Replaces existing spindles for **700-8 Series** trims (used on 8500 & 8800 Rim Exits) on **1-3/4" Doors**.',
        imageKey: "Spindle700_8", // NEW
    },
    { 
        part: "730-8", 
        series: "700-8 Series", 
        thickness: '2"', 
        description: 'Replaces existing spindles for **700-8 Series** trims (used on 8500 & 8800 Rim Exits) on **2" Doors**.',
        imageKey: "Spindle700_8", // NEW
    },
    { 
        part: "730-9", 
        series: "700-8 Series", 
        thickness: '2-1/4"', 
        description: 'Replaces existing spindles for **700-8 Series** trims (used on 8500 & 8800 Rim Exits) on **2-1/4" Doors**.',
        imageKey: "Spindle700_8", // NEW
    },
];

const SpindleKits = () => {
    // Helper function for rendering bold text using dangerouslySetInnerHTML
    const renderMarkdown = (text) => {
        const html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return { __html: html };
    };
    
    // Group kits by imageKey to render the image once per group
    const groupedKits = spindleKitsDisplayData.reduce((acc, kit) => {
        if (!acc[kit.imageKey]) {
            acc[kit.imageKey] = {
                title: kit.series,
                kits: [],
                imageKey: kit.imageKey
            };
        }
        acc[kit.imageKey].kits.push(kit);
        return acc;
    }, {});


    return (
        <div className="content-transition">
            <h1 className="Heading">730 Spindle Retrofit Kits</h1>
            <p className="note" style={{ textAlign: 'center', color: '#ffcc00', marginBottom: '1.5rem' }}>
                Used to replace existing spindles for **06, 13, 15, 16, 73, 74, 75 & 76 function ET Trims**.
                Kits include: Spindle, Retainer Plates, Mounting Screws & Return Springs.
            </p>

            <div className="result-container" style={{ alignItems: 'stretch' }}>
                <h2>Spindle Retrofit Kits by Trim Series and Door Thickness</h2>
                <div className="parts-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {Object.values(groupedKits).map(group => (
                        <div key={group.imageKey} className="parts-column" style={{ padding: '2rem' }}>
                            <h3 style={{ borderBottom: '2px solid #2ecc71', paddingBottom: '1rem', marginBottom: '1.5rem' }}>{group.title}</h3>
                            {/* Render the image at the top of the group */}
                            <img 
                                src={images[group.imageKey]} 
                                alt={`${group.title} Spindle Kit`} 
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    borderRadius: '8px',
                                    marginBottom: '1.5rem',
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #2ecc71'
                                }}
                            />
                            
                            {group.kits.map((kit) => (
                                <div key={kit.part} style={{ marginBottom: '1rem', borderBottom: '1px solid #172a45', paddingBottom: '1rem' }}>
                                    <h4 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0', color: '#2ecc71' }}>{kit.part}</h4>
                                    <div className="part-number" style={{ fontSize: '1.0rem', margin: '0.5rem 0 0.5rem 0' }}>
                                        <strong>Door Thickness:</strong> {kit.thickness}
                                    </div>
                                    <p 
                                        style={{ color: '#ffffff', margin: '0' }}
                                        dangerouslySetInnerHTML={renderMarkdown(kit.description)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpindleKits;