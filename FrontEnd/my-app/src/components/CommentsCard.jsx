import "./css/CommentsCard.css";

import React from "react";
import "./css/PostCard.css";
import { useEffect, useState } from "react";

import tempDP from "../images/A.png";

export default function CommentsCard(props) {
  console.log("PROPS = ");
  console.log(props);
  // console.log("JX IS HERE HAHAHAHAHA");
  // console.log(props.pid);

  return (
    <div className="comment-card">
      <div className="container-1">
        <img src={tempDP} alt="Profile Logo" className="dp" />
        <h1 className="name">{props.commenter}</h1>
      </div>
      <div className="container-2">
        <h1 className="description">{props.content}</h1>
      </div>
    </div>
  );
}
