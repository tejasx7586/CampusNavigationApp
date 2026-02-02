import { useState, useEffect } from "react";
import { fetchBuildings } from "./services/api";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
  const [isLanding, setIsLanding] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().getHours());

  // Fetch buildings and user location on mount
  useEffect(() => {
    fetchBuildings()
      .then(setBuildings)
      .catch(err => console.error("Failed to fetch buildings:", err));

    if (!navigator.geolocation) {
      setUserLocation({ lat: -37.8475, lng: 145.1152 }); // Default campus location
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn(`Location error: ${err.message}`);
        setUserLocation({ lat: -37.8475, lng: 145.1152 });
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const enterApp = () => {
    setIsLanding(false);
  };

  if (isLanding) {
    return <LandingPage onEnter={enterApp} />;
  }

  return (
    <Dashboard 
      userLocation={userLocation}
      buildings={buildings}
      currentTime={currentTime}
    />
  );
}