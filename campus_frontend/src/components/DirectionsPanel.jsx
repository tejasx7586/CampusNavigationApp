import { useState } from "react";
import { fetchDirections } from "../services/api";
import "./DirectionsPanel.css";

export default function DirectionsPanel({ buildings, onDirectionsUpdate, onNavigate }) {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  const handleGetDirections = async () => {
    if (!from && from !== 0 || !to && to !== 0) {
      setError("Please select both starting point and destination");
      return;
    }

    if (from === to) {
      setError("Starting point and destination cannot be the same");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchDirections(from, to);
      
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: { lat: data.from.lat, lng: data.from.lng },
          destination: { lat: data.to.lat, lng: data.to.lng },
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          setIsLoading(false);
          if (status === window.google.maps.DirectionsStatus.OK) {
            onDirectionsUpdate(result);
            
            // Extract route information
            const route = result.routes[0];
            const leg = route.legs[0];
            setRouteInfo({
              distance: leg.distance.text,
              duration: leg.duration.text,
              steps: leg.steps.length
            });
            
            setError(null);
          } else {
            setError(`Failed to get directions: ${status}`);
          }
        }
      );
    } catch (err) {
      setIsLoading(false);
      setError(`Error: ${err.message}`);
    }
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setRouteInfo(null);
  };

  const handleReset = () => {
    setFrom(null);
    setTo(null);
    setRouteInfo(null);
    setError(null);
    onDirectionsUpdate(null);
  };

  return (
    <div className="directions-panel">
      <div className="directions-form">
        <div className="form-section">
          <label className="form-label">
            <span className="label-icon">📍</span>
            Starting Point
          </label>
          <select
            value={from ?? ""}
            onChange={(e) => setFrom(e.target.value === "" ? null : Number(e.target.value))}
            className="form-select"
          >
            <option value="">Select starting building</option>
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="swap-container">
          <button 
            className="swap-btn" 
            onClick={handleSwap}
            disabled={!from && !to}
          >
            ⇅
          </button>
        </div>

        <div className="form-section">
          <label className="form-label">
            <span className="label-icon">🎯</span>
            Destination
          </label>
          <select
            value={to ?? ""}
            onChange={(e) => setTo(e.target.value === "" ? null : Number(e.target.value))}
            className="form-select"
          >
            <option value="">Select destination</option>
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="action-buttons">
          <button
            onClick={handleGetDirections}
            disabled={!from && from !== 0 || !to && to !== 0 || isLoading}
            className="primary-btn"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Calculating...
              </>
            ) : (
              <>
                <span>Get Directions</span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>

          {routeInfo && (
            <button onClick={handleReset} className="secondary-btn">
              Reset
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}
      </div>

      {routeInfo && (
        <div className="route-info">
          <h3 className="route-title">Route Information</h3>
          
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">📏</div>
              <div className="info-content">
                <div className="info-label">Distance</div>
                <div className="info-value">{routeInfo.distance}</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">⏱️</div>
              <div className="info-content">
                <div className="info-label">Duration</div>
                <div className="info-value">{routeInfo.duration}</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">👣</div>
              <div className="info-content">
                <div className="info-label">Steps</div>
                <div className="info-value">{routeInfo.steps}</div>
              </div>
            </div>
          </div>

          <button onClick={() => onNavigate()} className="view-map-btn">
            <span>View on Map</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>
      )}

      <div className="directions-tips">
        <h4 className="tips-title">💡 Quick Tips</h4>
        <ul className="tips-list">
          <li>Walking time is estimated for average walking speed</li>
          <li>Routes follow accessible pathways</li>
          <li>Check building opening hours before visiting</li>
          <li>Use the swap button to reverse your route</li>
        </ul>
      </div>
    </div>
  );
}