// src/App.js
import React, { useState } from "react";
import Rails from "./components/RailsForm";
import Trims from "./components/TrimsForm";
import ToggleSwitch from "./components/ToggleButton";
import "./App.css";

const App = () => {
  const [isRails, setIsRails] = useState(true);

  const handleToggle = () => {
    setIsRails(!isRails);
  };

  return (
    <div className="app">
      <div className="toggle-container" aria-live="polite">
        <h2 className="sr-only">Switch between Rails and Trims</h2>
        <h2 className="Tooltip">Switch between Rails and Trims Here <br></br>↓</h2>
        <ToggleSwitch isRails={isRails} onToggle={handleToggle} />
      </div>
      {isRails ? <Rails /> : <Trims />}
    </div>
  );
};

export default App;