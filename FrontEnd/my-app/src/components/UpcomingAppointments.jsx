import React from "react";
import UpcomingAppointmentCard from "./UpcomingAppointmentCard";
import "./css/Appointment.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function UpcomingAppointments() {
  const [data, setData] = useState([]);
  const token = "22a1b17dec7ca0abc6f70cf47566f412a9ef4a10";

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/appointment/upcoming", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        console.log("Getting from ::::", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err.res.data));
  }, []);

  const cards = data.map((data) => {
    return <UpcomingAppointmentCard key={data.appointmentID} {...data} />;
  });

  return (
    <div className="upcoming appointment-page">
      <div className="toggle-buttons">
        <Link to="/UpcomingAppointments" className="upcoming-button">
          Upcoming
        </Link>
        <Link to="/CompletedAppointments" className="completed-button">
          Completed
        </Link>
      </div>

      <section className="appointment-card">{cards}</section>
    </div>
  );
}

export default UpcomingAppointments;
