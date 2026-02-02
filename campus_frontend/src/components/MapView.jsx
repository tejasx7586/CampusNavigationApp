import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LIBRARIES = ["places", "geometry"];

export default function MapView({ userLocation, buildings, facility, directions }) {
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  if (loadError) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#f5f5f5'
      }}>
        <p>Error loading maps: {loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#f5f5f5'
      }}>
        Loading Map...
      </div>
    );
  }

  // Filter buildings by facility if selected
  const displayBuildings = facility 
    ? buildings.filter(b => {
        // You'd need to fetch facility data from backend
        // For now, show all buildings
        return true;
      })
    : buildings;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation || { lat: -37.8475, lng: 145.1152 }}
      zoom={17}
      onLoad={(mapInstance) => {
        console.log("✅ Map loaded");
        setMap(mapInstance);
        // Trigger resize to ensure map displays properly
        setTimeout(() => {
          window.google.maps.event.trigger(mapInstance, 'resize');
        }, 100);
      }}
      options={{
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
        fullscreenControl: true,
        mapTypeId: 'roadmap',
      }}
    >
      {/* User location marker */}
      {userLocation && (
        <Marker
          position={userLocation}
          title="Your Location"
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }}
        />
      )}

      {/* Building markers */}
      {displayBuildings.map((building) => (
        <Marker
          key={building.id}
          position={{ lat: building.lat, lng: building.lng }}
          title={building.name}
          label={{
            text: building.name.split(':')[0].trim(), // Show "Building_X"
            fontSize: "12px",
            fontWeight: "bold",
          }}
        />
      ))}

      {/* Directions renderer */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#4285F4",
              strokeWeight: 5,
              strokeOpacity: 0.8,
            },
            suppressMarkers: false,
          }}
        />
      )}
    </GoogleMap>
  );
}