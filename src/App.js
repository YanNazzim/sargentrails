// src/App.js
import React, { useState } from "react";
import Rails from "./components/RailsForm";
import Trims from "./components/TrimsForm";
import ToggleButton from "./components/ToggleButton";
import "./App.css";

const App = () => {
  const [isRails, setIsRails] = useState(true);

  const handleToggle = () => {
    setIsRails(!isRails);
  };

  return (
    <div className="app">
      <div className="toggle-container" aria-live="polite">
        {/* Remove the sr-only class to display the text */}
        <h2>Switch between Rails and Trims</h2>
        <ToggleButton isRails={isRails} onToggle={handleToggle} />
      </div>
      {isRails ? <Rails /> : <Trims />}
    </div>
  );
};

export default App;
