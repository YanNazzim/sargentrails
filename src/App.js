import React, { useState } from "react";
import { partsData } from "./partsData";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    stile: '',
    lexan: 'No',
    prefixes: [],
    size: '',
    finish: '',
  });
  const [partNumber, setPartNumber] = useState('');

  // Options for the form
  const options = {
    stile: ['Wide', 'Narrow'],
    lexan: ['Yes', 'No'],
    prefixes: [
      { code: '12', name: 'Fire Rated (No Dogging)' },
      { code: '55', name: 'Request to Exit' },
      { code: '56', name: 'Elecrtic Latch Retraction' },
      { code: '56-HK', name: 'Elecrtic Latch Retraction W/ Hex-Key Dogging' },
    ],
    sizes: ['E', 'F', 'J', 'G'],
    finishes: ['26D', '30B', '30C'],
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate the key for lookup
    const prefixKey = formData.prefixes.sort().join('-'); // Sort prefixes to ensure consistent keys
    const key = `${formData.stile}-${formData.lexan}-${prefixKey}-${formData.size}-${formData.finish}`;

    // Look up the part number
    const partNumbers = formData.stile === 'Wide' ? partsData.wideRails : partsData.narrowRails;
    const generatedNumber = partNumbers[key] || 'Not Found';

    setPartNumber(generatedNumber);
  };

  // Reset the form
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
      <h1 className="Heading">Sargent Exit Device <br></br>Rail Part Number Lookup</h1>

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
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Lexan Pad */}
        <div className="form-group">
          <label>Lexan Pad:</label>
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
                {prefix.name} ({prefix.code})
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
              <option key={size} value={size}>
                {size}
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
          <div className="part-number">{partNumber}</div>
        </div>
      )}
    </div>
  );
};

export default App;