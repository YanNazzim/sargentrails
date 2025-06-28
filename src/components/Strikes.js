import React, { useState } from 'react';
import { strikesData, devicePlatforms, modelsByPlatform } from './strikesData';
import '../App.css';

const Strikes = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
    setSelectedModel('');
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

const renderStrikes = () => {
    if (!selectedPlatform || !selectedModel) {
      return null;
    }

    const strikesForModel = strikesData[selectedPlatform]?.[selectedModel];

    if (!strikesForModel) {
      return <p>No strike information available for this model.</p>;
    }

    // Case 1: Simple array of strikes
    if (Array.isArray(strikesForModel)) {
      return (
        <div className="strikes-container">
          {strikesForModel.map((strike, index) => (
            <div key={index} className="strike-card">
              <img src={strike.imageName || strike.imageUrl} alt={strike.partNumber} className="strike-image" />
              <div className="strike-info">
                <strong>{strike.partNumber}</strong> - {strike.description}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Case 2: Object containing categories of strikes
    return (
      <div className="strike-category-row"> {/* Add this wrapper */}
        {Object.entries(strikesForModel).map(([category, data]) => {
          // Sub-case A: Grouped strikes with a single image
          if (data.image && Array.isArray(data.parts)) {
            return (
              <div key={category} className="strike-category">
                <h3>{category}</h3>
                <div className="strike-card-grouped">
                  <img src={data.image} alt={category} className="strike-image-grouped" />
                  <div className="strike-details-list">
                    {data.parts.map((part, index) => (
                      <div key={index} className="strike-part-item">
                        <p><strong>Part Number:</strong> {part.partNumber}</p>
                        <p>{part.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
          // Sub-case B: Categories containing arrays of strikes
          if (Array.isArray(data)) {
            return (
              <div key={category} className="strike-category">
                <h3>{category}</h3>
                <div className="strikes-container">
                  {data.map((strike, index) => (
                    <div key={index} className="strike-card">
                      <img src={strike.imageName || strike.imageUrl} alt={strike.partNumber} className="strike-image" />
                      <div className="strike-info">
                        <strong>{strike.partNumber}</strong> - {strike.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
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

        {selectedModel && (
          <div className="result-container">
            <h2>Available Strikes for {selectedModel}:</h2>
            {renderStrikes()}
          </div>
        )}
      </form>
    </div>
  );
};

export default Strikes;