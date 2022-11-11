import React, { useState } from "react";
import Axios from "axios";

import "./css/AppointmentCard.css";
import {
  faLocationDot,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpcomingAppointmentCard = (props) => {
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
    </div>
  );
};

export default UpcomingAppointmentCard;
