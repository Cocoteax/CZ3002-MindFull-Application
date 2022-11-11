import React from "react";
import homelogo from "../images/house-solid.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/PostCard.css";
import viewCountIcon from "../images/view-icon.png";
import likeCountIcon from "../images/like-icon.png";
import commentCounter from "../images/comment-icon.png";

export default function PostCard(props) {
  return (
    <div className="post-card" onClick={() => props.select(props.id)}>
      <div className="container-1">
        <div className="box-1">
          <h1 className="post-title"> {props.title}</h1>
          <h1 className="post-time">
            <span>{props.createdAt.split("T")[1].split(".")[0]}</span>
            <span>{props.createdAt.split("T")[0]}</span>
          </h1>
        </div>
        <img src={props.displayPictureUrl} className="user-dp"></img>
      </div>
      <div className="container-2">
        <h1 className="post-description">{props.content}</h1>
      </div>
      <div className="container-3">
        <div className="box-1">
          <img
            src={likeCountIcon}
            alt="like-count-icon"
            className="like-count-icon"
          />
          <h1 className="like-count-h1">{props.likes}</h1>
        </div>
        <div className="box-2">
          <img
            src={commentCounter}
            alt="comment-counter"
            className="comment-counter-icon"
          />
          <h1 className="comment-counter-h1">{props.commentCount}</h1>
        </div>
      </div>
    </div>
  );
}
