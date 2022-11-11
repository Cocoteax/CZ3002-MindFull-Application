import React from "react";
import "./css/CancelAppointment.css";

const CancelAppointment = (props) => {
  return (
    <div className="bg">
      <div className="cancel-appt-popup">
        <span className="cancellation-msg">
          Are you sure you want to cancel this appointment?
        </span>
        <div className="buttons">
          <button
            className="button confirm-delete"
            onClick={props.handleDelete}
          >
            Confirm
          </button>
          <button className="button dont-delete" onClick={props.handleClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointment;
