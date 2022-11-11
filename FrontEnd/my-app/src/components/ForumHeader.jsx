import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import "./css/ForumHeader.css";
import NewPost from "./NewPost";

// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

export default function ForumHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [newPost, setNewPost] = useState([]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setNewPost([]);
  };

  // to update title
  function handleNewPost(event) {
    const { name, value } = event.target;
    // var coords = geocode(name);
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(newPost);
  }

  function updateDatabase() {
    const token = "22a1b17dec7ca0abc6f70cf47566f412a9ef4a10";
    const article = {
      title: newPost.title,
      content: newPost.content,
    };
    Axios.post("http://127.0.0.1:8000/api/forum/posts", article, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        console.log("done posting");
      })
      .catch((err) => console.log(err));
    window.location.reload();
  }

  return (
    <div className="forumheader">
      <input
        type="text"
        placeholder="search post..."
        className="search-input"
      ></input>
      <button className="newpostbtn" onClick={togglePopup}>
        new post
      </button>
      {isOpen && (
        <NewPost
          className="createPost"
          info={newPost}
          handleClose={togglePopup}
          handleChange={handleNewPost}
          handleUpdate={updateDatabase}
        />
      )}
    </div>
  );
}
