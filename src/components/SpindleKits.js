// src/components/SpindleKits.js
import React from "react";
import "../App.css"; 
import images from "../images";

const spindleKitsDisplayData = [
    { 
        part: "730-1", 
        series: "700 Series", 
        thickness: '1-3/4"', 
        description: 'Replaces existing spindles for **700 Series** trims (used on 8300 Mortise, 8700 SVR, 8900 Mortise Exits) on **1-3/4" Doors**.' ,
        imageKey: "Spindle700",
    },
    { 
        part: "730-2", 
        series: "700 Series", 
        thickness: '2"', 
        description: 'Replaces existing spindles for **700 Series** trims (used on 8300 Mortise, 8700 SVR, 8900 Mortise Exits) on **2" Doors**.',
        imageKey: "Spindle700",
    },
    { 
        part: "730-3", 
        series: "700 Series", 
        thickness: '2-1/4"', 
        description: 'Replaces existing spindles for **700 Series** trims (used on 8300 Mortise, 8700 SVR, 8900 Mortise Exits) on **2-1/4" Doors**.',
        imageKey: "Spindle700",
    },
    { 
        part: "730-4", 
        series: "700-4 Series", 
        thickness: '1-3/4"', 
        description: 'Replaces existing spindles for **700-4 Series** trims (used on 8400 & 8600 CVR Exits) on **1-3/4" Doors**.',
        imageKey: "Spindle700_4",
    },
    { 
        part: "730-5", 
        series: "700-4 Series", 
        thickness: '2"', 
        description: 'Replaces existing spindles for **700-4 Series** trims (used on 8400 & 8600 CVR Exits) on **2" Doors**.',
        imageKey: "Spindle700_4",
    },
    { 
        part: "730-6", 
        series: "700-4 Series", 
        thickness: '2-1/4"', 
        description: 'Replaces existing spindles for **700-4 Series** trims (used on 8400 & 8600 CVR Exits) on **2-1/4" Doors**.',
        imageKey: "Spindle700_4",
    },
    { 
        part: "730-7", 
        series: "700-8 Series", 
        thickness: '1-3/4"', 
        description: 'Replaces existing spindles for **700-8 Series** trims (used on 8500 & 8800 Rim Exits) on **1-3/4" Doors**.',
        imageKey: "Spindle700_8",
    },
    { 
        part: "730-8", 
        series: "700-8 Series", 
        thickness: '2"', 
        description: 'Replaces existing spindles for **700-8 Series** trims (used on 8500 & 8800 Rim Exits) on **2" Doors**.',
        imageKey: "Spindle700_8",
    },
    { 
        part: "730-9", 
        series: "700-8 Series", 
        thickness: '2-1/4"', 
        description: 'Replaces existing spindles for **700-8 Series** trims (used on 8500 & 8800 Rim Exits) on **2-1/4" Doors**.',
        imageKey: "Spindle700_8",
    },
];

const SpindleKits = () => {
    const renderMarkdown = (text) => {
        const html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return { __html: html };
    };
    
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
            <p className="note" style={{ textAlign: 'center', color: 'var(--accent-purple)', marginBottom: '1.5rem' }}>
                Used to replace existing spindles for <strong>06, 13, 15, 16, 73, 74, 75 & 76 function ET Trims</strong>.
                <br />Kits include: Spindle, Retainer Plates, Mounting Screws & Return Springs.
            </p>

            <div className="result-container" style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {Object.values(groupedKits).map(group => (
                        <div key={group.imageKey} className="parts-column" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                            {/* Smaller, fixed-size image container */}
                            <div style={{ flex: '0 0 200px', textAlign: 'center' }}>
                                <img 
                                    src={images[group.imageKey]} 
                                    alt={`${group.title} Spindle Kit`} 
                                    style={{ 
                                        width: '180px', 
                                        height: 'auto', 
                                        borderRadius: '8px',
                                        backgroundColor: '#ffffff',
                                        border: '2px solid var(--accent-purple-dim)',
                                        padding: '5px'
                                    }}
                                />
                                <h3 style={{ marginTop: '1rem', color: 'var(--accent-purple)' }}>{group.title}</h3>
                            </div>

                            {/* Info List container (side by side with image) */}
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                {group.kits.map((kit) => (
                                    <div key={kit.part} style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontSize: '1.3rem', margin: '0', color: 'var(--accent-purple)' }}>Kit {kit.part}</h4>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'var(--bg-input)', padding: '4px 10px', borderRadius: '20px' }}>
                                                {kit.thickness} Door
                                            </span>
                                        </div>
                                        <p 
                                            style={{ color: 'var(--text-primary)', margin: '0', fontSize: '0.95rem' }}
                                            dangerouslySetInnerHTML={renderMarkdown(kit.description)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpindleKits;