// src/components/TechSupportHubBanner.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// --- Animations ---
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 9999;
  width: 280px;
  
  /* Glassmorphism Style to match App.css */
  background: rgba(30, 41, 59, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  padding: 24px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  animation: ${slideUp} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;

  /* Accent Top Border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #38bdf8);
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
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  transition: all 0.2s;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h3`
  color: #f8fafc;
  margin: 4px 0 0 0;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const Subtitle = styled.p`
  color: #cbd5e1;
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
`;

const HubLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: #ffffff !important;
  text-decoration: none !important;
  padding: 10px 0;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  width: 100%;
  margin-top: 4px;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
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
      
      <Title>More Tech Tools</Title>
      <Subtitle>
        Access templates and cylinder pinouts at the Tech Support Hub.
      </Subtitle>
      
      <HubLink 
        href="https://sargent-techsupport-hub.netlify.app/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Open Hub
      </HubLink>
    </WidgetContainer>
  );
};

export default TechSupportHubBanner;