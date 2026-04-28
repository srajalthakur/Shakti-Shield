import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Navigation, MapPin, Layers, Shield, ArrowLeft, Crosshair } from "lucide-react";
import { Link } from "react-router-dom";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom purple marker
const purpleIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapController = ({ position, shouldCenter }) => {
  const map = useMap();
  useEffect(() => {
    if (shouldCenter && position) {
      map.setView(position, 17, { animate: true });
    }
  }, [position, shouldCenter, map]);
  return null;
};

const MAP_TILES = {
  dark: {
    label: "Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
  },
  satellite: {
    label: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; Esri"
  },
  street: {
    label: "Street",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
  }
};

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState([26.8467, 80.9462]);
  const [isTracking, setIsTracking] = useState(false);
  const [shouldCenter, setShouldCenter] = useState(false);
  const [tileStyle, setTileStyle] = useState("dark");
  const [accuracy, setAccuracy] = useState(null);
  const [showTileMenu, setShowTileMenu] = useState(false);
  const [locationLabel, setLocationLabel] = useState("Tap to track your location");

  useEffect(() => {
    let watchId;
    if (isTracking) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          setCurrentPosition([latitude, longitude]);
          setAccuracy(Math.round(accuracy));
          setLocationLabel(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
    return () => { if (watchId) navigator.geolocation.clearWatch(watchId); };
  }, [isTracking]);

  const handleTrack = () => {
    setIsTracking(true);
    setShouldCenter(true);
    setTimeout(() => setShouldCenter(false), 1000);
  };

  const handleRecenter = () => {
    setShouldCenter(true);
    setTimeout(() => setShouldCenter(false), 1000);
  };

  return (
    <div style={{
      height: "100vh", width: "100vw",
      background: "#080810",
      fontFamily: "'DM Sans', sans-serif",
      position: "relative", overflow: "hidden"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* MAP - full screen */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <MapContainer
          center={currentPosition}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            key={tileStyle}
            url={MAP_TILES[tileStyle].url}
            attribution={MAP_TILES[tileStyle].attribution}
          />
          <MapController position={currentPosition} shouldCenter={shouldCenter} />
          <Marker position={currentPosition} icon={purpleIcon}>
            <Popup>
              <div style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "center", padding: "4px" }}>
                <strong style={{ color: "#7c3aed" }}>You are here</strong>
                {accuracy && <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#666" }}>±{accuracy}m accuracy</p>}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* TOP BAR */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
        padding: "20px 20px 0",
        background: "linear-gradient(to bottom, rgba(8,8,16,0.9) 0%, transparent 100%)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "480px", margin: "0 auto" }}>
          <Link to="/home" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "40px", height: "40px", borderRadius: "12px",
            background: "rgba(8,8,16,0.8)", border: "1px solid rgba(124,58,237,0.3)",
            color: "#a78bfa", textDecoration: "none", backdropFilter: "blur(12px)"
          }}>
            <ArrowLeft size={18} />
          </Link>

          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "rgba(8,8,16,0.8)", border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: "14px", padding: "8px 14px", backdropFilter: "blur(12px)"
          }}>
            <Shield size={15} color="#f59e0b" />
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", color: "#f1f5f9" }}>
              Live Map
            </span>
            {isTracking && (
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#34d399", animation: "pulse 1.5s infinite"
              }} />
            )}
          </div>

          {/* Tile switcher */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowTileMenu(p => !p)}
              style={{
                width: "40px", height: "40px", borderRadius: "12px",
                background: "rgba(8,8,16,0.8)", border: "1px solid rgba(124,58,237,0.3)",
                color: "#a78bfa", cursor: "pointer", backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              <Layers size={18} />
            </button>
            {showTileMenu && (
              <div style={{
                position: "absolute", top: "48px", right: 0,
                background: "rgba(12,12,20,0.95)", border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "14px", overflow: "hidden", backdropFilter: "blur(20px)",
                minWidth: "120px", boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
              }}>
                {Object.entries(MAP_TILES).map(([key, val]) => (
                  <button key={key} onClick={() => { setTileStyle(key); setShowTileMenu(false); }} style={{
                    display: "block", width: "100%", padding: "10px 16px",
                    background: tileStyle === key ? "rgba(124,58,237,0.2)" : "transparent",
                    border: "none", color: tileStyle === key ? "#a78bfa" : "#94a3b8",
                    fontSize: "13px", fontWeight: 500, cursor: "pointer",
                    textAlign: "left", fontFamily: "'DM Sans', sans-serif",
                    borderBottom: key !== "street" ? "1px solid rgba(255,255,255,0.04)" : "none"
                  }}>
                    {val.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM PANEL */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
        background: "linear-gradient(to top, rgba(8,8,16,0.97) 0%, rgba(8,8,16,0.8) 70%, transparent 100%)",
        padding: "60px 20px 36px"
      }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>

          {/* Location info pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "rgba(20,20,35,0.9)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px", padding: "10px 16px", marginBottom: "14px",
            backdropFilter: "blur(20px)"
          }}>
            <MapPin size={14} color={isTracking ? "#34d399" : "#475569"} />
            <span style={{ fontSize: "13px", color: isTracking ? "#94a3b8" : "#475569", flex: 1 }}>
              {locationLabel}
            </span>
            {accuracy && (
              <span style={{
                fontSize: "11px", color: "#34d399",
                background: "rgba(52,211,153,0.1)", padding: "2px 8px",
                borderRadius: "99px", fontWeight: 600
              }}>
                ±{accuracy}m
              </span>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {!isTracking ? (
              <button onClick={handleTrack} style={{
                flex: 1, padding: "16px",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                border: "none", borderRadius: "16px",
                color: "white", fontSize: "15px", fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                boxShadow: "0 4px 24px rgba(124,58,237,0.4)"
              }}>
                <Navigation size={18} />
                Track My Location
              </button>
            ) : (
              <>
                <button onClick={handleRecenter} style={{
                  flex: 1, padding: "16px",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  border: "none", borderRadius: "16px",
                  color: "white", fontSize: "15px", fontWeight: 600,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  boxShadow: "0 4px 24px rgba(124,58,237,0.4)"
                }}>
                  <Crosshair size={18} />
                  Re-center
                </button>
                <button onClick={() => { setIsTracking(false); setAccuracy(null); setLocationLabel("Tap to track your location"); }} style={{
                  padding: "16px 20px",
                  background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)",
                  borderRadius: "16px", color: "#f87171", fontSize: "14px",
                  fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
                }}>
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .leaflet-control-attribution { display: none !important; }
        .leaflet-control-zoom { display: none !important; }
      `}</style>
    </div>
  );
};

export default Map;