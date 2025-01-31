import React, { useState } from "react";
import { partsData } from "../partsData";
import "../App.css";

const RailsForm = () => {
    const [formData, setFormData] = useState({
        stile: '',
        lexan: 'No',
        prefixes: [],
        size: '',
        finish: '',
      });
      const [partNumber, setPartNumber] = useState('');
    
      const options = {
        stile: [
            { code: 'Narrow', display: "Narrow Stile - 8300, 8400, 8500, 8600"},
            { code: 'Wide', display: "Wide Stile - 8600 8700, NB8700, 8800, 8900"},
        ],
        lexan: ['Yes', 'No'],
        prefixes: [
          { code: '12', name: 'Fire Rated (No Dogging)' },
          { code: '53', name: 'Latchbolt Monitoring Switch' },
          { code: '55', name: 'Request to Exit' },
          { code: '56', name: 'Elecrtic Latch Retraction' },
          { code: '56-HK', name: 'Elecrtic Latch Retraction W/ Hex-Key Dogging' },
          { code: '58', name: 'Elecrtic Dogging' },
          { code: '59', name: 'Electroguard® Delayed Egress' },
          { code: 'BC-59', name: 'Electroguard® Boca Code Delayed Egress' },
          { code: 'AL', name: 'Alarm' },
        ],
        sizes: [
          { code: 'E', display: 'E - For openings 24" to 32"' },
          { code: 'F', display: 'F - For openings 33" to 39"' },
          { code: 'J', display: 'J - For openings 40" to 46"' },
          { code: 'G', display: 'G - For openings 47" to 53"' },
        ],
        finishes: ['03', '04', '09', '10', '10B', '10BE', '10BL', '14', '15', '20D', '26', '26D', '32', '32D', 'BSP', 'WSP'],
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const prefixKey = formData.prefixes.sort().join('-');
        const key = `${formData.stile}-${formData.lexan}-${prefixKey}-${formData.size}-${formData.finish}`;
        const partNumbers = formData.stile === 'Wide' ? partsData.wideRails : partsData.narrowRails;
        const generatedNumber = partNumbers[key] || 'Not Found';
        setPartNumber(generatedNumber);
      };
    
      const handleReset = () => {
        setFormData({
          stile: '',
          lexan: 'No',
          prefixes: [],
          size: '',
          finish: '',
        });
        setPartNumber('');
      };
    
      return (
        <div className="app-container">
          <h1 className="Heading">Sargent <br></br>80 Series Exit Device <br></br>Rail Part Number Lookup</h1>
    
          <form onSubmit={handleSubmit} className="part-form">
            {/* Stile Type */}
            <div className="form-group">
              <label>Stile Type:</label>
              <select
                value={formData.stile}
                onChange={(e) => setFormData({ ...formData, stile: e.target.value })}
                required
              >
                <option value="">Select Stile</option>
                {options.stile.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.display}
                  </option>
                ))}
              </select>
            </div>
    
            {/* Lexan Pad */}
            <div className="form-group">
              <label>Remove the Black Lexan Pad? (should the rail have the 19- prefix):</label>
              <select
                value={formData.lexan}
                onChange={(e) => setFormData({ ...formData, lexan: e.target.value })}
                required
              >
                {options.lexan.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
    
            {/* Prefixes */}
            <div className="form-group">
              <label>Prefixes:</label>
              <div className="checkbox-group">
                {options.prefixes.map((prefix) => (
                  <label key={prefix.code}>
                    <input
                      type="checkbox"
                      value={prefix.code}
                      checked={formData.prefixes.includes(prefix.code)}
                      onChange={(e) => {
                        const newPrefixes = e.target.checked
                          ? [...formData.prefixes, e.target.value]
                          : formData.prefixes.filter((p) => p !== e.target.value);
                        setFormData({ ...formData, prefixes: newPrefixes });
                      }}
                    />
                    ({prefix.code}){prefix.name}
                  </label>
                ))}
              </div>
            </div>
    
            {/* Size */}
            <div className="form-group">
              <label>Size:</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                required
              >
                <option value="">Select Size</option>
                {options.sizes.map((size) => (
                  <option key={size.code} value={size.code}>
                    {size.display}
                  </option>
                ))}
              </select>
            </div>
    
            {/* Finish */}
            <div className="form-group">
              <label>Finish:</label>
              <select
                value={formData.finish}
                onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                required
              >
                <option value="">Select Finish</option>
                {options.finishes.map((finish) => (
                  <option key={finish} value={finish}>
                    {finish}
                  </option>
                ))}
              </select>
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
    
          {/* Display Generated Part Number */}
          {partNumber && (
            <div className="result-container">
              <h2>Found Part Number:</h2>
              <div className="part-number">{partNumber}-{formData.finish}</div>
            </div>
          )}
        </div>
      );
    };
    

export default RailsForm;
