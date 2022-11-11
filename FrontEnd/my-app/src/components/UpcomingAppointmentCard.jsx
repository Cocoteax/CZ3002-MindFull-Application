import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import "./css/AppointmentCard.css";
import {
  faLocationDot,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CancelAppointment from "./CancelAppointment";

import useAuth from "../hooks/useAuth";

const UpcomingAppointmentCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
    // setConfirmDelete(false);
  };
  const token = "22a1b17dec7ca0abc6f70cf47566f412a9ef4a10";

  function handleDelete(event) {
    // setConfirmDelete(true);
    // console.log("confirm delete: " + confirmDelete);
    console.log("in handle delete", token);
    Axios.delete(
      `http://127.0.0.1:8000/api/appointment/upcoming/${props.appointmentID}`,
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
      .then((res) => {
        console.log("done deleting");
        setIsOpen(false);
      })
      .catch((err) => console.log(err));

    window.location.reload();
  }

  return (
    <div className="card-wrapper">
      <div className="counsellor">
        <img
          src={`./images/${props.counsellorID}.jpg`}
          className="counsellor-pic"
          alt="image"
        />
        <p className="counsellor-name">{props.counsellorName}</p>
      </div>
      <div className="counsellor-address">
        <FontAwesomeIcon icon={faLocationDot} />
        {props.counsellorAddress}
      </div>
      <div className="date-time">
        <div className="date">
          <FontAwesomeIcon icon={faCalendar} />
          <p>{props.date}</p>
        </div>
        <div className="time">
          <FontAwesomeIcon icon={faClock} />
          <p>{props.time}</p>
        </div>
      </div>
      <button className="cancel-button" onClick={togglePopup}>
        Cancel
      </button>

      {isOpen && (
        <CancelAppointment
          className="createPost"
          handleClose={togglePopup}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UpcomingAppointmentCard;
