import { useState } from "react";
import { searchByFacility } from "../services/api";
import "./FacilitySearch.css";

const FACILITIES = [
  { name: "WiFi", bit: 1, icon: "📶", color: "#4285F4" },
  { name: "Library", bit: 2, icon: "📚", color: "#EA4335" },
  { name: "Cafe", bit: 4, icon: "☕", color: "#FBBC04" },
  { name: "Study Area", bit: 8, icon: "📖", color: "#34A853" },
  { name: "Printer", bit: 16, icon: "🖨️", color: "#9334E6" },
  { name: "Computers", bit: 32, icon: "💻", color: "#FF6D00" },
  { name: "Parking", bit: 64, icon: "🅿️", color: "#00BCD4" },
  { name: "Gym", bit: 128, icon: "💪", color: "#E91E63" },
  { name: "Student Support", bit: 256, icon: "🎓", color: "#3F51B5" },
];

export default function FacilitySearch({ buildings, onFacilitySelect, onViewMap }) {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFacilityClick = async (facility) => {
    setSelectedFacility(facility);
    setIsLoading(true);

    try {
      const result = await searchByFacility(facility.name);
      setSearchResults(result.buildings || []);
      onFacilitySelect(facility.name);
    } catch (error) {
      console.error("Failed to search facilities:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewOnMap = () => {
    if (selectedFacility) {
      onFacilitySelect(selectedFacility.name);
      onViewMap();
    }
  };

  return (
    <div className="facility-search-container">
      <div className="facility-intro">
        <h2 className="facility-heading">Find Buildings by Facility</h2>
        <p className="facility-description">
          Select a facility below to discover all campus buildings that offer it
        </p>
      </div>

      {/* Facility Grid */}
      <div className="facility-grid">
        {FACILITIES.map((facility) => (
          <button
            key={facility.bit}
            className={`facility-card ${selectedFacility?.bit === facility.bit ? 'active' : ''}`}
            onClick={() => handleFacilityClick(facility)}
            style={{ '--facility-color': facility.color }}
          >
            <div className="facility-icon">{facility.icon}</div>
            <div className="facility-name">{facility.name}</div>
            {selectedFacility?.bit === facility.bit && (
              <div className="facility-checkmark">✓</div>
            )}
          </button>
        ))}
      </div>

      {/* Search Results */}
      {isLoading && (
        <div className="loading-results">
          <div className="spinner-large"></div>
          <p>Searching buildings...</p>
        </div>
      )}

      {!isLoading && selectedFacility && (
        <div className="search-results">
          <div className="results-header">
            <h3 className="results-title">
              Buildings with {selectedFacility.name}
              <span className="results-count">({searchResults.length})</span>
            </h3>
            {searchResults.length > 0 && (
              <button onClick={handleViewOnMap} className="view-map-btn-small">
                View on Map →
              </button>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="no-results-card">
              <div className="no-results-icon">😔</div>
              <p className="no-results-text">
                No buildings found with this facility
              </p>
            </div>
          ) : (
            <div className="results-list">
              {searchResults.map((building) => {
                const fullBuilding = buildings.find(b => b.id === building.id);
                const buildingCode = building.name.split(':')[0].trim();
                const buildingDesc = building.name.split(':')[1]?.trim() || '';

                return (
                  <div key={building.id} className="result-card">
                    <div className="result-header">
                      <div className="result-code">{buildingCode}</div>
                      <div 
                        className="facility-indicator" 
                        style={{ backgroundColor: selectedFacility.color }}
                      >
                        {selectedFacility.icon}
                      </div>
                    </div>
                    <div className="result-description">{buildingDesc}</div>
                    {fullBuilding && (
                      <div className="result-coordinates">
                        📍 Lat: {fullBuilding.lat.toFixed(4)}, 
                        Lng: {fullBuilding.lng.toFixed(4)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Info Box */}
      {!selectedFacility && (
        <div className="facility-info-box">
          <div className="info-icon">ℹ️</div>
          <div className="info-content">
            <h4>How to use</h4>
            <p>Click on any facility card above to see which campus buildings offer that facility. 
               You can then view the results on the map for easy navigation.</p>
          </div>
        </div>
      )}
    </div>
  );
}