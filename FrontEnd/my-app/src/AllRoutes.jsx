import React, { Component } from "react";
// import { Router, Switch, Route } from "react-router-dom";

import Test from "./components/Test";
import Login from "./components/Login";
import Register from "./components/Register";
import Forum from "./components/Forum";
import CounsellorPage from "./components/CounsellorPage";
import App from "./App";
import UpcomingAppointments from "./components/UpcomingAppointments";
import PostCard from "./components/PostCard";
import CompletedAppointments from "./components/CompletedAppointments";
import IndivPost from "./components/IndivPost";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default class AllRoutes extends Component {
  render() {
    // const [singleData, setSingleData] = useState();

    // function addData(data) {
    //   setSingleData(data);
    // }

    return (
      <>
        <Routes>
          {/* <Route path="/" exact component={Forum} /> */}
          <Route path="/" exact element={<Forum />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Forum" element={<Forum />} />
          <Route path="/IndivPost" element={<IndivPost />} />

          <Route path="/CounsellorPage" element={<CounsellorPage />} />
          <Route
            path="/UpcomingAppointments"
            element={<UpcomingAppointments />}
          />
          <Route
            path="/CompletedAppointments"
            element={<CompletedAppointments />}
          />
        </Routes>
      </>
    );
  }
}
