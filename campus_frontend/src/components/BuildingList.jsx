import { useState, useEffect } from "react";
import { fetchBuildingDetails, fetchBuildingStatus } from "../services/api";
import "./BuildingList.css";

export default function BuildingList({ buildings, currentTime, onBuildingSelect }) {
  const [buildingStatuses, setBuildingStatuses] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); // name, status

  // Fetch building statuses
  useEffect(() => {
    buildings.forEach(async (building) => {
      try {
        const status = await fetchBuildingStatus(building.id, currentTime);
        setBuildingStatuses(prev => ({
          ...prev,
          [building.id]: status.status === "OPEN"
        }));
      } catch (error) {
        console.error(`Failed to fetch status for building ${building.id}`);
      }
    });
  }, [buildings, currentTime]);

  // Filter and sort buildings
  const filteredBuildings = buildings
    .filter(b => 
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "status") {
        const aStatus = buildingStatuses[a.id] ? 1 : 0;
        const bStatus = buildingStatuses[b.id] ? 1 : 0;
        return bStatus - aStatus;
      }
      return 0;
    });

  const openCount = Object.values(buildingStatuses).filter(Boolean).length;
  const closedCount = buildings.length - openCount;

  return (
    <div className="building-list-container">
      {/* Header Stats */}
      <div className="building-stats">
        <div className="stat-card open">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-number">{openCount}</div>
            <div className="stat-label">Open Now</div>
          </div>
        </div>
        <div className="stat-card closed">
          <div className="stat-icon">✕</div>
          <div className="stat-content">
            <div className="stat-number">{closedCount}</div>
            <div className="stat-label">Closed</div>
          </div>
        </div>
        <div className="stat-card total">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <div className="stat-number">{buildings.length}</div>
            <div className="stat-label">Total Buildings</div>
          </div>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="list-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search buildings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Building Cards */}
      <div className="building-grid">
        {filteredBuildings.map((building) => {
          const isOpen = buildingStatuses[building.id];
          const buildingCode = building.name.split(':')[0].trim();
          const buildingDesc = building.name.split(':')[1]?.trim() || '';

          return (
            <div
              key={building.id}
              className={`building-card ${isOpen ? 'open' : 'closed'}`}
              onClick={() => onBuildingSelect(building)}
            >
              <div className="building-card-header">
                <div className="building-code">{buildingCode}</div>
                <div className={`status-badge ${isOpen ? 'open' : 'closed'}`}>
                  {isOpen ? 'OPEN' : 'CLOSED'}
                </div>
              </div>
              
              <div className="building-description">
                {buildingDesc}
              </div>

              <div className="building-card-footer">
                <button 
                  className="info-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBuildingSelect(building);
                  }}
                >
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBuildings.length === 0 && (
        <div className="no-results">
          <p>No buildings found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}