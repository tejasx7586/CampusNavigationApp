import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import ControlPanel from "./components/ControlPanel";
import { fetchBuildings, fetchDirections } from "./services/api";
import "./styles/App.css";

export default function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    fetchBuildings().then(setBuildings);

    navigator.geolocation.watchPosition(
      pos => setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }),
      err => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  const navigate = async () => {
    const data = await fetchDirections(from, to);

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: {
          lat: data.from.lat,
          lng: data.from.lng,
        },
        destination: {
          lat: data.to.lat,
          lng: data.to.lng,
        },
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (res, status) => {
        if (status === "OK") setDirections(res);
      }
    );
  };

  if (!userLocation) return <p>Locating you…</p>;

  return (
    <>
      <MapView userLocation={userLocation} directions={directions} />
      <ControlPanel
        buildings={buildings}
        from={from}
        to={to}
        setFrom={setFrom}
        setTo={setTo}
        onNavigate={navigate}
      />
    </>
  );
}
