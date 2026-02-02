import { useState } from "react";
import Sidebar from "./Sidebar";
import MapView from "./MapView";
import BuildingList from "./BuildingList";
import DirectionsPanel from "./DirectionsPanel";
import FacilitySearch from "./FacilitySearch";
import BuildingInfo from "./BuildingInfo";
import "./Dashboard.css";

export default function Dashboard({ userLocation, buildings, currentTime }) {
  const [activeView, setActiveView] = useState("map");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [directions, setDirections] = useState(null);
  const [facilityFilter, setFacilityFilter] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch(activeView) {
      case "map":
        return (
          <MapView
            userLocation={userLocation}
            buildings={buildings}
            directions={directions}
            facilityFilter={facilityFilter}
            onBuildingClick={setSelectedBuilding}
          />
        );
      case "buildings":
        return (
          <BuildingList
            buildings={buildings}
            currentTime={currentTime}
            onBuildingSelect={setSelectedBuilding}
          />
        );
      case "directions":
        return (
          <DirectionsPanel
            buildings={buildings}
            onDirectionsUpdate={setDirections}
            onNavigate={() => setActiveView("map")}
          />
        );
      case "facilities":
        return (
          <FacilitySearch
            buildings={buildings}
            onFacilitySelect={setFacilityFilter}
            onViewMap={() => setActiveView("map")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`dashboard-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="dashboard-header">
          <div className="header-left">
            <h2 className="dashboard-title">
              {activeView === "map" && "Campus Map"}
              {activeView === "buildings" && "All Buildings"}
              {activeView === "directions" && "Get Directions"}
              {activeView === "facilities" && "Search Facilities"}
            </h2>
            <p className="current-time">Current Time: {currentTime}:00</p>
          </div>
          
          {facilityFilter && activeView === "map" && (
            <div className="active-filter">
              <span>Filtering: {facilityFilter}</span>
              <button onClick={() => setFacilityFilter(null)} className="clear-filter">
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>

      {/* Building Info Modal */}
      {selectedBuilding && (
        <BuildingInfo
          building={selectedBuilding}
          currentTime={currentTime}
          onClose={() => setSelectedBuilding(null)}
        />
      )}
    </div>
  );
}