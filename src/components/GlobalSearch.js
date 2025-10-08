// src/components/GlobalSearch.js
import React from "react";
import "../App.css";

// Renamed HeaderSearch for conceptual clarity in the header
const HeaderSearch = ({ onSearchExecuted }) => { 
  // State for search visibility and toggle logic removed.

  return (
    // Use a new class for layout management within the header's flex row
    <div className="header-search-container">
      <div className="search-field-wrapper">
        <gen-search-widget
        className="gen-search-widget"
          configId="14d04b0e-51c2-4a44-a33a-b53c5053fbea"
          triggerId="searchWidgetTrigger"
          // ⬇️ TRY THESE CSS VARIABLES ⬇️
          style={{
            "--input-text-color": "black",
            "--search-input-color": "black",
          }}
        ></gen-search-widget>

        {/* Use a placeholder appropriate for a persistent search bar */}
        <input placeholder="Search knowledge base" id="searchWidgetTrigger" />
      </div>
      <span className="beta-tag">BETA</span> {/* Keep the beta tag next to the search bar */}
    </div>
  );
};

export default HeaderSearch;