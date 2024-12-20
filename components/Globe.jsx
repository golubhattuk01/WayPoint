import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { UserContext } from "../src/App";
import Chat from "./Chat";

const Globe = () => {
  const {
    clients,
    setClients,
    user,
    socket,
    isMap,
  } = useContext(UserContext);

  const [userLocation, setUserLocation] = useState([23, 79]);


  const userIcon = new L.Icon({
    iconUrl: user?.picture || "fallback-image-url",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const getClientIcon = (profileUrl) => {
    return new L.Icon({
      iconUrl: profileUrl || "fallback-image-url",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) loc_share();
    }, 5000);

    socket.on("allLocations", (data) => {
      setClients(data);
    });

    socket.on("new-user", (soc) => { });

    return () => {
      clearInterval(interval);
      socket.off("allLocations");
      socket.off("new-user");
    };
  }, [user]);

  const loc_share = () => {
    if (navigator.geolocation && user) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        socket.emit("loc-res", {
          l1: latitude,
          l2: longitude,
          username: user.name || "name not found",
          profileUrl: user.picture || "fallback-image-url",
        });

        setUserLocation([latitude, longitude]);
      });
    } else {
      console.error(
        "Geolocation is not supported by this browser or user data is not ready."
      );
    }
  };

  return (
    <div className="pl-2 md:pl-10 pt-5 lg:pt-0 h-[85%] lg:h-[85%] w-full flex flex-col lg:flex-row gap-5 justify-center lg:p-5 items-center overflow-hidden">
      <MapContainer
        center={userLocation}
        zoom={6}
        scrollWheelZoom={false}
        style={{
          height: window.innerWidth < 1024 ? '50%' : '85%',
          width: window.innerWidth < 1024 ? '85%' : '50%',
        }}
        // className={`shadow-lg rounded-lg border-gray-300 ${isMap ? 'block' : 'hidden'}`}
        // className={`${isMap ? 'block' : 'hidden'} shadow-lg rounded-lg border-gray-300`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={userLocation} icon={userIcon}>
          <Popup>{user.name}</Popup>
        </Marker>

        {clients.map(({ id, l1, l2, username, profileUrl }) => (
          <Marker key={id} position={[l1, l2]} icon={getClientIcon(profileUrl)}>
            <Popup>{username} is here on the map</Popup>
          </Marker>
        ))}
      </MapContainer>

      <Chat />
    </div>

  );
};

export default Globe;
