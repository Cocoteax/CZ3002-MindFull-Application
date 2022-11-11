import React from "react";
import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

export default function Map(props) {
  const centre = {
    lat: 1.3521,
    lng: 103.8198,
  };

  const LocationPin = () => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
    </div>
  );

  console.log(props.location);

  const MyPins = props.location.map((pin) => (
    <LocationPin lat={pin.lat} lng={pin.lng} />
  ));

  return (
    <div className="map">
      <GoogleMapReact
        // API KEY !!! TO BE COMMENTED OUT
        bootstrapURLKeys={{ key: "AIzaSyAgUyxkZaBToNh8lpmhkrrxM-J3K5eNe-g" }}
        defaultCenter={centre}
        defaultZoom={props.zoomLevel}
        options={{
          fullscreenControl: false,
          zoomControl: false,
        }}
      >
        {MyPins}
      </GoogleMapReact>
    </div>
  );
}
