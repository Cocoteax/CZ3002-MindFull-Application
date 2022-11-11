import "./css/Forum.css";
import PostCard from "./PostCard";
import ForumHeader from "./ForumHeader";
import { useEffect, useState } from "react";
import Axios from "axios";
import IndivPost from "./IndivPost";
import PostDetail from "./PostDetail";

export default function Forum() {
  const [data, setData] = useState([]);
  const [isSingle, setIsSingle] = useState(false);
  const [singleData, setSingleData] = useState([]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/forum/posts")
      .then((res) => {
        console.log("Getting from ::::", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function select(id) {
    setData((prevData) => {
      const newData = [];
      for (let i = 0; i < prevData.length; i++) {
        const card = prevData[i];
        if (card.pid == id) {
          newData.push(card);
          setSingleData(newData);
          //
          // [{"pid":18,"title":"fixed it","content":"kkkk","poster":"admin","poster_id":1,"createdAt":"2022-11-01T19:07:32.233738Z","likes":0,"comments":{},"commentCount":0}]
          // console.log(JSON.stringify(newData));

          // {"pid":18,"title":"fixed it","content":"kkkk","poster":"admin","poster_id":1,"createdAt":"2022-11-01T19:07:32.233738Z","likes":0,"comments":{},"commentCount":0}
          // console.log(JSON.stringify(newData[0]));
          setIsSingle(true);
        }
      }
      return prevData;
    });
  }

  const oneD = singleData.map((prevSingleData) => {
    return (
      <IndivPost
        key={prevSingleData.pid}
        id={prevSingleData.pid}
        {...prevSingleData}
      />
    );
  });

  const cards = data.map((data) => {
    return <PostCard key={data.pid} id={data.pid} {...data} select={select} />;
  });

  const jxtest = data.map((data) => {
    return (
      <PostDetail key={data.pid} id={data.pid} {...data} select={select} />
    );
  });

  const jxtest2 = singleData.map((prevSingleData) => {
    return (
      <PostDetail
        key={prevSingleData.pid}
        id={prevSingleData.pid}
        {...prevSingleData}
      />
    );
  });

  if (isSingle) {
    return (
      <div className="forum-section">
        <ForumHeader />
        <section>{oneD}</section>
      </div>
    );
  } else {
    return (
      <div className="forum-section">
        <ForumHeader />
        <section className="card">{cards}</section>
      </div>
    );
  }
  // return (
  //   <div className="forum-section">
  //     <ForumHeader />
  //     <section>{oneD}</section>
  //   </div>
  // );
}
