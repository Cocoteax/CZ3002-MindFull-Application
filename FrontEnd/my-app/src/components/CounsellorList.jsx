import { useEffect, useState } from "react";
// import data2 from "../data";
import Counsellor from "./Counsellor";
import BookAppt from "./BookAppt";
import Axios from "axios";

export default function CounsellorList(props) {
  // const [data, setData] = useState(data2);
  // const [locationdata, setLocationData] = useState(
  //   data.map((each) => ({ lat: each.lat, lng: each.lng }))
  // );
  // props.returnList(locationdata);
  // console.log(locationdata);

  // for getting from django db
  //
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLocations([]);
    Axios.get("http://127.0.0.1:8000/api/appointment/counsellor")
      .then((res) => {
        console.log("Getting from ::::", res.data);
        setData(res.data);
        res.data.map((each) => {
          let latlng = { lat: each.lat, lng: each.lng };
          setLocations((old) => [...old, latlng]);
        });
      })
      .catch((err) => console.log(err));
  }, []);
  props.returnList(locations);

  // useEffect(() => {
  //   data.map(function (each) {
  //     setLocations((old) => [...old, { lat: each.lat, lng: each.lng }]);
  //   });
  //   props.returnList(locations);
  // }, [data]);

  useEffect(() => {
    setData(props.updatedData);
  }, [props.updatedData]);

  // google maps api (ditch)
  //
  // useEffect(() => {
  //   getCoords(data);
  //   props.returnList(locationdata);
  // }, []);
  //
  // function getCoords(data) {
  //   setLocationData([]);
  //   data.map(function (d) {
  //     Axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
  //       params: {
  //         address: d.address,
  //         // API KEY !!! TO BE COMMENTED OUT
  //         key: "AIzaSyAgUyxkZaBToNh8lpmhkrrxM-J3K5eNe-g",
  //       },
  //     })
  //       .then(function (response) {
  //         let item = {
  //           id: d.id,
  //           lat: response.data.results[0].geometry.location.lat,
  //           lng: response.data.results[0].geometry.location.lng,
  //         };
  //         setLocationData((old) => [...old, item]);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   });
  // }

  const [isOpen, setIsOpen] = useState(false);
  const [newPost, setNewPost] = useState([]);
  const [display, setDisplay] = useState([]);

  function togglePopup(
    name,
    address,
    languages,
    description,
    image,
    counsellorID
  ) {
    setIsOpen(!isOpen);
    setNewPost([]);
    setDisplay({
      name: name,
      address: address,
      languages: languages,
      description: description,
      image: image,
      counsellorID: counsellorID,
    });
  }
  // const togglePopup = () => {
  //   setIsOpen(!isOpen);
  //   setNewPost([]);
  // };

  const dataElements = data.map((data) => (
    <Counsellor {...data} handleClick={togglePopup} />
  ));
  return (
    <div className="counsellor-list">
      {dataElements}
      {isOpen && <BookAppt handleClose={togglePopup} display={display} />}
    </div>
  );
}
