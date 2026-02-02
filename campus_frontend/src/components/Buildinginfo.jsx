import { useState, useEffect } from "react";
import { fetchBuildingDetails, fetchBuildingFacilities } from "../services/api";
import "./BuildingInfo.css";

export default function BuildingInfo({ building, currentTime, onClose }) {
  const [details, setDetails] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBuildingData = async () => {
      setIsLoading(true);
      try {
        const [detailsData, facilitiesData] = await Promise.all([
          fetchBuildingDetails(building.id),
          fetchBuildingFacilities(building.id)
        ]);
        setDetails(detailsData);
        setFacilities(facilitiesData.facilities || []);
      } catch (error) {
        console.error("Failed to load building data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBuildingData();
  }, [building.id]);

  const isOpen = details && currentTime >= details.opening && currentTime < details.closing;
  const buildingCode = building.name.split(':')[0].trim();
  const buildingDesc = building.name.split(':')[1]?.trim() || '';

  const facilityIcons = {
    "WiFi": "📶",
    "Library": "📚",
    "Cafe": "☕",
    "Study Area": "📖",
    "Printer": "🖨️",
    "Computers": "💻",
    "Parking": "🅿️",
    "Gym": "💪",
    "Student Support": "🎓"
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {isLoading ? (
          <div className="modal-loading">
            <div className="spinner-large"></div>
            <p>Loading building information...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="modal-header">
              <div className="modal-title-section">
                <h2 className="modal-building-code">{buildingCode}</h2>
                <div className={`modal-status-badge ${isOpen ? 'open' : 'closed'}`}>
                  <span className="status-dot"></span>
                  {isOpen ? 'Open Now' : 'Closed'}
                </div>
              </div>
              <p className="modal-building-desc">{buildingDesc}</p>
            </div>

            {/* Info Grid */}
            <div className="modal-info-grid">
              <div className="info-card">
                <div className="info-card-icon">🕐</div>
                <div className="info-card-content">
                  <div className="info-card-label">Opening Hours</div>
                  <div className="info-card-value">
                    {details?.opening}:00 - {details?.closing}:00
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">📍</div>
                <div className="info-card-content">
                  <div className="info-card-label">Coordinates</div>
                  <div className="info-card-value coordinates">
                    {details?.lat?.toFixed(4)}, {details?.lng?.toFixed(4)}
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">🗺️</div>
                <div className="info-card-content">
                  <div className="info-card-label">Grid Position</div>
                  <div className="info-card-value">
                    X: {details?.x}, Y: {details?.y}
                  </div>
                </div>
              </div>
            </div>

            {/* Facilities Section */}
            <div className="modal-facilities">
              <h3 className="facilities-title">
                <span className="title-icon">✨</span>
                Available Facilities
              </h3>
              
              {facilities.length > 0 ? (
                <div className="facilities-grid">
                  {facilities.map((facility, index) => (
                    <div key={index} className="facility-tag">
                      <span className="facility-tag-icon">
                        {facilityIcons[facility] || "•"}
                      </span>
                      <span className="facility-tag-text">{facility}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-facilities">
                  <p>No facilities information available</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="modal-actions">
              <button className="action-btn primary">
                <span>Get Directions</span>
                <span className="btn-arrow">→</span>
              </button>
              <button className="action-btn secondary" onClick={onClose}>
                Close
              </button>
            </div>

            {/* Additional Info */}
            <div className="modal-footer">
              <div className="footer-note">
                <span className="note-icon">ℹ️</span>
                <span className="note-text">
                  Hours may vary during holidays and special events
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}