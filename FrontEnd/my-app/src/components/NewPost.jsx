import React from "react";
import "./css/NewPost.css";

const NewPost = (props) => {
  return (
    <div className="background">
      <div className="popup-box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <div className="info">
          <p className="input Title">
            title:
            <input
              type="text"
              id="title"
              name="title"
              value={props.info.title}
              onChange={props.handleChange}
            />
          </p>
          <p className="input Content">
            content:
            <textarea
              id="content"
              name="content"
              value={props.info.content}
              onChange={props.handleChange}
            ></textarea>
          </p>
          <button className="submitbtn" onClick={props.handleUpdate}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
