// src/components/TechSupportHubBanner.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// --- Animations ---
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px; /* MOVED TO BOTTOM LEFT */
  z-index: 9999;
  width: 300px;
  background-color: #002d72; /* Sargent Blue background */
  border: 1px solid #0046b3;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  padding: 20px;
  box-sizing: border-box;
  font-family: "Segoe UI", sans-serif;
  animation: ${slideIn} 0.5s ease-out forwards;
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* Gold top border accent */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ffd700 0%, #ffaa00 100%);
    border-radius: 12px 12px 0 0;
  }

  @media (max-width: 480px) {
    bottom: 10px;
    left: 10px;
    right: 10px;
    width: auto;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #a0c4ff;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  padding: 4px;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

const Title = styled.h3`
  color: #ffffff;
  margin: 8px 0 0 0;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.3;
`;

const Subtitle = styled.p`
  color: #e6f1ff;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  opacity: 0.9;
`;

const HubLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffd700; /* Gold Button */
  color: #002d72 !important; /* Blue Text */
  text-decoration: none !important;
  padding: 10px 0;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin-top: 8px;
  text-transform: uppercase;

  &:hover {
    background: #ffe033;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TechSupportHubBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <WidgetContainer>
      <CloseButton 
        onClick={() => setIsVisible(false)} 
        aria-label="Close helper"
      >
        &times;
      </CloseButton>
      
      <Title>Need more Tools?</Title>
      <Subtitle>
        Access Templates, Cylinders, and more at the Tech Support Hub.
      </Subtitle>
      
      <HubLink 
        href="https://sargent-techsupport-hub.netlify.app/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Open Hub ↗
      </HubLink>
    </WidgetContainer>
  );
};

export default TechSupportHubBanner;