import { useState, useEffect } from "react";
import "./LandingPage.css";

export default function LandingPage({ onEnter }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div className={`landing-container ${loaded ? 'loaded' : ''}`}>
      {/* Animated background */}
      <div className="landing-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Content */}
      <div className="landing-content">
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="logo-hexagon"
              />
              <circle cx="50" cy="50" r="15" fill="currentColor" className="logo-dot"/>
              <line x1="50" y1="35" x2="50" y2="20" stroke="currentColor" strokeWidth="2" className="logo-line"/>
              <line x1="50" y1="65" x2="50" y2="80" stroke="currentColor" strokeWidth="2" className="logo-line"/>
              <line x1="65" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" className="logo-line"/>
              <line x1="35" y1="50" x2="20" y2="50" stroke="currentColor" strokeWidth="2" className="logo-line"/>
            </svg>
          </div>
          <h1 className="landing-title">
            <span className="title-main">Deakin Campus</span>
            <span className="title-sub">Navigation</span>
          </h1>
        </div>

        <p className="landing-description">
          Your intelligent guide to navigating Deakin University's Burwood campus. 
          Find buildings, check facilities, and get real-time directions.
        </p>

        <button className="enter-button" onClick={onEnter}>
          <span className="button-text">Enter Campus</span>
          <span className="button-arrow">→</span>
        </button>

        <div className="landing-features">
          <div className="feature-item">
            <span className="feature-icon">🗺️</span>
            <span className="feature-text">Interactive Maps</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏢</span>
            <span className="feature-text">13 Buildings</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Real-time Status</span>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}