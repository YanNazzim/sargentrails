// src/components/GlobalSearch.js
import React, { useState } from "react";
import "../App.css";

const GlobalSearch = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <div
      className={`global-search-container ${isSearchVisible ? "expanded" : ""}`}
    >
      <div className="search-icon-wrapper">
        <button
          type="button"
          className="search-toggle-button"
          onClick={() => setIsSearchVisible((prev) => !prev)}
          aria-expanded={isSearchVisible}
          aria-label="Toggle Global Search Bar"
        >
          {isSearchVisible ? "❌" : "🔍"}
        </button>
        <span className="beta-tag">BETA</span>
      </div>

      {isSearchVisible && (
        <div className="search-field-wrapper">
          {/* Gen AI Search Widget */}

          <gen-search-widget
            configId="14d04b0e-51c2-4a44-a33a-b53c5053fbea"
            triggerId="searchWidgetTrigger"
          ></gen-search-widget>

          <input placeholder="Search here" id="searchWidgetTrigger" />
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
