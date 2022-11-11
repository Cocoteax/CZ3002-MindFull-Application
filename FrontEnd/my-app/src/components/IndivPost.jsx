import React from "react";
import "./css/IndivPost.css";
import { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import CommentsCard from "./CommentsCard";
import tempDP from "../images/A.png";
import Axios from "axios";

const IndivPost = (props) => {
  const [comment, setComment] = useState(props.comments);
  const [commentString, setCommentString] = useState("");
  const [data, setData] = useState([]);
  const url = `http://127.0.0.1:8000/api/forum/posts/${props.pid}/comments`;
  const token = "22a1b17dec7ca0abc6f70cf47566f412a9ef4a10";

  useEffect(() => {
    Axios.get(url, { headers: { Authorization: `Token ${token}` } })
      .then((res) => {
        console.log("Getting from ::::", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleGatherString(event) {
    const { value } = event.target;
    setCommentString(value);
  }

  function handleNewComment(event) {
    setComment((prevComment) => {
      let newArray = prevComment[event.target.name];
      newArray.push(commentString);
      return {
        ...prevComment,
        [event.target.name]: newArray,
      };
    });
    updateDatabase();
    setCommentString("");
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function updateDatabase() {
    const postUrl = `http://127.0.0.1:8000/api/forum/posts/${props.pid}/comments`;
    const temp = commentString;
    const token = "22a1b17dec7ca0abc6f70cf47566f412a9ef4a10";

    const text = {
      content: temp,
    };
    //const headers = { Authorization: `Token ${token}` };

    Axios.post(postUrl, text, { headers: { Authorization: `Token ${token}` } })
      .then((res) => {
        console.log("done posting");
        Axios.get(url, { headers: { Authorization: `Token ${token}` } })
          .then((res) => {
            console.log("Getting from ::::", res.data);
            setData(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  console.log("@@@@@@@@@@@@@@");
  console.log(comment);

  const cCards = data.map((data) => {
    return <CommentsCard key={data.cid} {...data} />;
  });

  return (
    <div>
      <PostDetail key={props.pid} id={props.pid} {...props} />

      <div>{cCards}</div>

      <form className="post-comment" onSubmit={handleSubmit}>
        <img src={tempDP} alt="tempDP" className="profile-pic image" />
        <input
          id="comment-input"
          onChange={handleGatherString}
          value={commentString}
        />
        <button
          className="send-comment"
          // NAME VALUE SHOULD BE = USER THAT IS CURRENTLY LOGGED IN
          // admin is used temporarily here first
          name="nick"
          onClick={handleNewComment}
        >
          comment
        </button>
      </form>
    </div>
  );
};

export default IndivPost;
