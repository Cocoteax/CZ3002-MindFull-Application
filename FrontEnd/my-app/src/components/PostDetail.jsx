import "./css/PostDetail.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import viewCountIcon from "../images/view-icon.png";
import likeCountIcon from "../images/like-icon.png";
import commentCounterIcon from "../images/comment-icon.png";
import deleIcon from "../images/delete.png";
import Modal from "./Modal";

export default function PostDetail(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes);
  const [pressOnce, setPressOnce] = useState(0);
  const [commentCounter, setCommentCounter] = useState(props.commentCount);
  const token = "22a1b17dec7ca0abc6f70cf47566f412a9ef4a10";

  const styles = {
    backgroundColor: pressOnce ? "#24a0ed" : "none",
  };

  function delePost() {
    const url = `http://127.0.0.1:8000/api/forum/posts/${props.id}`;
    const headers = { Authorization: `Token ${token}` };

    Axios.delete(url, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        console.log("done deleting");
      })
      .catch((err) => console.log(err));
    window.location.reload();
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  function handleLikeCount(event) {
    if (pressOnce == 0) {
      setLikeCount((prevLikeCount) => prevLikeCount + 1);

      const postUrl = `http://127.0.0.1:8000/api/forum/posts/${props.id}/likes`;
      const temp = likeCount;
      const newLikeCount = {
        likes: temp,
      };
      //      const headers = { Authorization: `Token ${token}` };

      Axios.post(postUrl, newLikeCount, {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => {
          console.log("done posting");
        })
        .catch((err) => console.log(err));
      setPressOnce(1);
    }
  }

  const [data, setData] = useState([]);
  const url = `http://127.0.0.1:8000/api/forum/posts/${props.pid}`;

  useEffect(() => {
    Axios.get(url, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        console.log("Getting from ::::", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const comCounter = data["commentCount"];

  return (
    <div className="post-detail">
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
            onClick={handleLikeCount}
            style={styles}
          />
          <h1 className="like-count-h1">{likeCount}</h1>
        </div>
        <div className="box-2">
          <img
            src={commentCounterIcon}
            alt="comment-counter"
            className="comment-counter-icon"
          />
          <h1 className="comment-counter-h1">{comCounter}</h1>
        </div>
        <div className="box-3" onClick={openModal}>
          <img src={deleIcon} alt="deleteIcon" className="delete-icon" />
        </div>
      </div>
      {isOpen && <Modal delePost={delePost} openModal={openModal} />}
    </div>
  );
}
