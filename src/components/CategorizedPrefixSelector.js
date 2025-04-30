// components/CategorizedPrefixSelector.js
import React, { useState, useMemo } from 'react';

const CategorizedPrefixSelector = ({ allPrefixes, selectedPrefixes, onPrefixChange, isPrefixDisabled }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  // Group prefixes by category
  const categories = useMemo(() => {
    return allPrefixes.reduce((acc, prefix) => {
      const category = prefix.category || 'Other'; // Default category if none provided
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(prefix);
      return acc;
    }, {});
  }, [allPrefixes]);

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  return (
    <div className="categorized-prefix-selector">
      {Object.entries(categories).map(([categoryName, prefixesInCategory]) => {
        const isExpanded = !!expandedCategories[categoryName]; // Check if current category is expanded
        return (
          <div key={categoryName} className="prefix-category-card">
            <button
              type="button"
              className="category-header"
              onClick={() => toggleCategory(categoryName)}
              aria-expanded={isExpanded}
            >
              {categoryName}
              <span className={`category-arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
            </button>
            {/* Wrapper Div for Animation */}
            <div className={`category-content-wrapper ${isExpanded ? 'expanded' : ''}`}>
              <div className="category-content checkbox-group"> {/* Original content div */}
                {prefixesInCategory.map((prefix) => (
                  <label key={prefix.code} className={`prefix-label ${isPrefixDisabled(prefix.code) ? 'disabled' : ''}`}>
                    <input
                      type="checkbox"
                      value={prefix.code}
                      checked={selectedPrefixes.includes(prefix.code)}
                      onChange={onPrefixChange}
                      disabled={isPrefixDisabled(prefix.code)}
                    />
                    {/* Assuming you have a custom checkbox span like before */}
                    <span className="custom-checkbox"></span>
                    <span className="prefix-name">
                      <strong>({prefix.code})</strong> — {prefix.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
             {/* End Wrapper Div */}
          </div>
        );
      })}
    </div>
  );
};

export default CategorizedPrefixSelector;