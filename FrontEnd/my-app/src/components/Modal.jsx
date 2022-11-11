import React from "react";
import "./css/Modal.css";

function Modal(props) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={props.openModal}>X</button>
        </div>
        <div className="title">
          <h1>Are you sure?</h1>
          <h2>
            Do you really want to delete the post? This process cannot be undone
          </h2>
        </div>
        <div className="footer">
          <button id="cancelBtn" onClick={props.openModal}>
            Cancel
          </button>
          <button onClick={props.delePost}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
