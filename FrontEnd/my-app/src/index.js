import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import SideBar from "./components/Sidebar";
import SideBarData from "./SideBarData";

import AllRoutes from "./AllRoutes";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";

// ReactDOM.render(<App />, document.getElementById("root"));
const sideBarData = SideBarData.map((item) => {
  return <SideBar key={item.id} {...item} />;
});

ReactDOM.render(
  <Router>
    <div className="App">
      <AuthProvider>
        <sidebar className="sidebar">{sideBarData}</sidebar>
        <AllRoutes />
      </AuthProvider>
    </div>
  </Router>,
  document.getElementById("root")
);
