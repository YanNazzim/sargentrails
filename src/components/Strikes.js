// src/components/Strikes.js

import React, { useState } from 'react';
import { strikesData, devicePlatforms, modelsByPlatform } from './strikesData';
import '../App.css';

const Strikes = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [strikes, setStrikes] = useState([]);

  const handlePlatformChange = (e) => {
    const platform = e.target.value;
    setSelectedPlatform(platform);
    setSelectedModel('');
    setStrikes([]);
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    const platformData = strikesData[selectedPlatform];
    if (platformData && platformData[model]) {
        const modelStrikes = platformData[model];
        // Check if the strikes are categorized (like in the 8600 series)
        if (Array.isArray(modelStrikes)) {
            setStrikes(modelStrikes);
        } else {
            // If categorized, show all strikes from all categories
            const allStrikes = Object.values(modelStrikes).flat();
            setStrikes(allStrikes);
        }
    } else {
        setStrikes([]);
    }
  };

  const renderStrikes = () => {
    if (strikes.length === 0) {
      return null;
    }

    return (
      <div className="strikes-container">
        {strikes.map((strike, index) => (
          <div key={index} className="strike-card">
            <img
                src={strike.imageName}
                alt={strike.partNumber}
                className="strike-image"
            />
            <div className="strike-info">
                <strong>{strike.partNumber}</strong> - {strike.description}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="content-transition">
      <h1 className="Heading">Strikes</h1>
      <form className="part-form">
        <div className="form-group">
          <label>Device Platform:</label>
          <select value={selectedPlatform} onChange={handlePlatformChange} required>
            <option value="">Select Platform</option>
            {devicePlatforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        {selectedPlatform && (
          <div className="form-group">
            <label>Device Model:</label>
            <select value={selectedModel} onChange={handleModelChange} required>
              <option value="">Select Model</option>
              {modelsByPlatform[selectedPlatform].map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        )}

        {strikes.length > 0 && (
          <div className="result-container">
            <h2>Available Strikes:</h2>
            {renderStrikes()}
          </div>
        )}
      </form>
    </div>
  );
};

export default Strikes;