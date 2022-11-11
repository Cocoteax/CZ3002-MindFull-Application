import React from "react";
import { useState, useEffect } from "react";

import CounsellorList from "./CounsellorList";
import Maps from "./Map";
import "./css/CounsellorPage.css";
import Axios from "axios";
// import { useNavigate } from "react-router-dom";

function App() {
  // const navigate = useNavigate();

  // const [searchLocation, setSearchLocation] = useState([]);
  const [searchLocation, setSearchLocation] = useState([]);
  const [searchpostal, setSearchPostal] = useState();
  const [locations, setLocations] = useState([]);

  // to update search location
  function handleLocation(event) {
    const { name, value } = event.target;
    // var coords = geocode(name);
    setSearchLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  // to find coords & pass postal to backend
  const [updatedData, setUpdatedData] = useState([]);
  function handleSearch(event) {
    // update coordinates
    geocode(searchLocation.address);
    // send postal to backend
    console.log(searchpostal);
    Axios.get(
      `http://127.0.0.1:8000/api/appointment/counsellor/${searchpostal}/`
    )
      .then((res) => {
        console.log("Sorted data ::::", res.data);
        // console.log(Object.values(res.data));
        setUpdatedData(Object.values(res.data));
      })
      .catch((err) => console.log(err));
  }

  function geocode(addr) {
    Axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: addr,
        // API KEY !!! TO BE COMMENTED OUT
        key: "AIzaSyAgUyxkZaBToNh8lpmhkrrxM-J3K5eNe-g",
      },
    })
      .then(function (response) {
        console.log(response.data.results[0]);
        let arraysize = response.data.results[0].address_components.length;
        setSearchPostal(
          response.data.results[0].address_components[arraysize - 1].long_name
        );
        setSearchLocation({
          address: addr,
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function returnList(L) {
    setLocations(L);
    console.log("here");
    console.log(L);
    console.log(locations);
  }
  return (
    <div className="cApp">
      <div className="right">
        <div className="header">
          <input
            type="text"
            placeholder="search location"
            className="searchbar"
            name="address"
            value={searchLocation.place}
            onChange={handleLocation}
          ></input>
          <button className="searchbtn" onClick={handleSearch}></button>
        </div>
        {/* <h1 className="cn-text">counsellors nearby</h1> */}
        <div className="display">
          <CounsellorList returnList={returnList} updatedData={updatedData} />
          <Maps location={locations} zoomLevel={11} />
        </div>
      </div>
    </div>
  );
}

export default App;
