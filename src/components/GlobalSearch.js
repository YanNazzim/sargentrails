// src/components/GlobalSearch.js
import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { getSearchableData } from '../searchableData';
import Fuse from 'fuse.js'; // <-- Import Fuse.js
import "../App.css";

const GlobalSearch = ({ onSearchExecuted }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [results, setResults] = useState([]);
    const [isSearchVisible, setIsSearchVisible] = useState(false); // <-- NEW STATE

    // 1. Load data once on component mount
    useEffect(() => {
        setSearchData(getSearchableData());
    }, []);

    // 2. Create the Fuse.js index
    const fuse = useMemo(() => {
        const options = {
            keys: [
                { name: 'description', weight: 0.5 },
                { name: 'subcategory', weight: 0.3 },
                { name: 'keywords', weight: 0.1 },
                { name: 'part_info', weight: 0.1 },
            ],
            includeScore: true,
            threshold: 0.4, // Adjust this value to make the search more or less strict
            ignoreLocation: true,
        };
        return new Fuse(searchData, options);
    }, [searchData]);

    // 3. Perform search when searchTerm changes
    useEffect(() => {
        if (!searchTerm || searchTerm.length < 2) {
            setResults([]);
            return;
        }

        const searchResults = fuse.search(searchTerm).map(result => result.item);
        setResults(searchResults.slice(0, 20));

    }, [searchTerm, fuse]);

    const handleSearchChange = (selectedOption) => {
        if (selectedOption) {
             onSearchExecuted(selectedOption.value);
             setIsSearchVisible(false); // Hide after selection
        }
    };
    
    // Custom format for results display
    const formatOptionLabel = ({ value }) => (
        <div className="search-option-label">
            <div className="category-header-result">
                {value.category} / {value.subcategory}
            </div>
            <div className="description-result">{value.description}</div>
            {value.category === "Exit Trims (Full Output)" ? (
                 <div 
                     className="part-info-result" 
                     dangerouslySetInnerHTML={{ 
                         __html: value.part_info.split('<br />')[0].replace('<strong>Part Number:</strong>', 'PN:') + ' ... (Click to Pre-fill)'
                     }}
                 />
             ) : (
                <div className="part-info-result">Part Info: {value.part_info}</div>
             )}
        </div>
    );
    
     // Custom styles for react-select components
    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: "50px",
            fontSize: "1.2rem",
            color: "black",
            borderRadius: "10px",
            borderColor: "#2ecc71",
            boxShadow: "0 0 5px rgba(46, 204, 113, 0.5)",
            backgroundColor: 'white !important',
        }),
        menu: (provided) => ({
             ...provided,
             zIndex: 9999,
             backgroundColor: '#172a45',
             padding: '10px',
             borderRadius: '10px',
        }),
        option: (provided, state) => ({
            ...provided,
            color: 'white',
            backgroundColor: state.isFocused ? '#263e63' : '#172a45',
            padding: '15px',
            borderBottom: '1px solid #001f3f',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
            marginBottom: '5px',
        }),
        input: (provided) => ({
            ...provided,
            color: 'black',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
    };

    const options = results.map(item => ({
        value: item,
        label: `${item.category} - ${item.description}`,
    }));


    return (
        <div className={`global-search-container ${isSearchVisible ? 'expanded' : ''}`}>
            {/* NEW: Toggle button and Beta tag */}
            <div className="search-icon-wrapper">
                <button
                    type="button"
                    className="search-toggle-button"
                    onClick={() => setIsSearchVisible(prev => !prev)}
                    aria-expanded={isSearchVisible}
                    aria-label="Toggle Global Search Bar"
                >
                    {isSearchVisible ? '❌' : '🔍'}
                </button>
                <span className="beta-tag">BETA</span>
            </div>

            {/* NEW: Conditionally rendered Select component */}
            {isSearchVisible && (
                <div className="search-field-wrapper">
                    <Select
                        menuPlacement="top" // <-- FORCES DROPDOWN TO OPEN UPWARDS
                        options={options}
                        onInputChange={(inputValue) => setSearchTerm(inputValue)}
                        onChange={handleSearchChange}
                        placeholder="Search for Part (e.g., 2-3/8 latch for 7 line, 8204, spindle 1-3/4)"
                        noOptionsMessage={() => (searchTerm.length < 2 ? "Keep typing to search..." : "No results found.")}
                        formatOptionLabel={formatOptionLabel}
                        styles={customSelectStyles}
                        value={null}
                        isClearable
                        classNamePrefix="search-select"
                        autoFocus
                    />
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;