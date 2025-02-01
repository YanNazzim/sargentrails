import React from 'react';

const ToggleButton = ({ isRails, onToggle }) => {
    return (
        <div className="toggle-container">
            <div className="toggle-switch" role="switch" aria-checked={isRails}>
                <input
                    type="checkbox"
                    id="rails-trims-toggle"
                    checked={isRails}
                    onChange={onToggle}
                    aria-label="Switch between Rails and Trims"
                />
                <label htmlFor="rails-trims-toggle" className="slider">
                    <span className="slider-text">{isRails ? "Rails" : "Trims"}</span>
                </label>
            </div>
        </div>
    );
};

export default ToggleButton;
