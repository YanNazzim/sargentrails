// src/components/AuxControlParts.js
import React from "react";
import "../App.css"; 

const liftLeverAssemblies = [
    { part: "94-2087", functions: "106/113", thickness: '1-3/4" and 2"', note: "Used for standard CVR devices (8400/8600) when converting to 106 (Storeroom) or 113 (Classroom) key functions." },
    { part: "94-2329", functions: "306 only", thickness: '1-3/4"', note: "Used for specific functions where only 306 Storeroom function is required on a 1-3/4\" door." },
    { part: "94-2088", functions: "313 only", thickness: '1-3/4"', note: "Used for specific functions where only 313 Classroom function is required on a 1-3/4\" door." },
    { part: "94-2419", functions: "106/113", thickness: '2-1/4"', note: "Used for standard CVR devices (8400/8600) when converting to 106 (Storeroom) or 113 (Classroom) key functions on a thicker door." },
    { part: "94-2421", functions: "306 only", thickness: '2-1/4"', note: "Used for specific functions where only 306 Storeroom function is required on a 2-1/4\" door." },
    { part: "94-2420", functions: "313 only", thickness: '2-1/4"', note: "Used for specific functions where only 313 Classroom function is required on a 2-1/4\" door." },
];

const screwPacks = [
    { part: "01-3199", thickness: '1-3/4"', note: "Screw pack for 1-3/4\" doors, compatible with 106, 113, 306, and 313 functions." },
    { part: "01-3200", thickness: '2"', note: "Screw pack for 2\" doors, compatible with 106, 113, 306, and 313 functions." },
    { part: "01-9342", thickness: '2-1/4"', note: "Screw pack for 2-1/4\" doors, compatible with 106, 113, 306, and 313 functions." },
];

const AuxControlParts = () => {
    return (
        <div className="content-transition">
            <h1 className="Heading">Auxiliary Control Parts (Lift Lever/Screws)</h1>

            <div className="result-container" style={{ alignItems: 'stretch' }}>
                
                {/* Lift Lever Assemblies */}
                <h2 style={{ color: '#2ecc71', borderBottom: '2px solid #2ecc71', paddingBottom: '1rem', width: '100%' }}>Lift Lever Assemblies</h2>
                <div className="parts-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', width: '100%' }}>
                    {liftLeverAssemblies.map((item) => (
                        <div key={item.part} className="parts-column" style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.25rem' }}>{item.part}</h3>
                            <div className="part-number" style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#ffffff' }}>
                                <strong>Functions:</strong> {item.functions} | <strong>Door:</strong> {item.thickness}
                            </div>
                            <p style={{ color: '#aaa', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                                {item.note}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Screw Packs */}
                <h2 style={{ color: '#2ecc71', borderBottom: '2px solid #2ecc71', paddingBottom: '1rem', marginTop: '2rem', width: '100%' }}>Mounting Screws (comes with QTY 1 per P/N)</h2>
                <div className="parts-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', width: '100%' }}>
                    {screwPacks.map((item) => (
                        <div key={item.part} className="parts-column" style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.25rem' }}>{item.part}</h3>
                            <div className="part-number" style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#ffffff' }}>
                                <strong>For Door:</strong> {item.thickness}
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

export default AuxControlParts;