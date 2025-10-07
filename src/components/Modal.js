// src/components/Modal.js
import React from 'react';
import '../App.css';

const Modal = ({ show, onClose, data }) => {
  if (!show) {
    return null;
  }
  
  const isFullOutput = data?.category === "Exit Trims (Full Output)";

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">X</button>
        <h2>Search Result Details</h2>
        {data && (
          <div>
            <p><strong>Category:</strong> {data.category}</p>
            <p><strong>Subcategory:</strong> {data.subcategory}</p>
            <p><strong>Description:</strong> {data.description}</p>
            {isFullOutput ? (
                <>
                    <h3>Full Part Breakdown:</h3>
                    {/* Render the full part_info string with HTML for line breaks/formatting */}
                    <div className="part-number" dangerouslySetInnerHTML={{ __html: data.part_info }}></div>
                </>
            ) : (
                <p><strong>Part Info:</strong> {data.part_info}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;