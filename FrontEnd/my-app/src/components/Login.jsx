import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mindfullLogo from "../images/mindfull-logo.png";
import "./css/LoginRegister.css";
import useAuth from "../hooks/useAuth";

import axios from "../api/axios";
const LOGIN_URL = "/api/login";

const Login = () => {
  const { setAuth } = useAuth();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //just for this tut, in the future can replace it and navigate with react router to navigate to a page of our choice aft successful login
  const [success, setSuccess] = useState(false);

  //to set focus on first input when the component loads
  //put focus on user input that we'll reference with userRef
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //empty out any error message
  //if user changes user/pwd state (anyth in username/pw field), will make error disappear bc alr error is read and making adjustments
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    // default is to reload the page
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password: pwd,
      });
      //clear inputs
      console.log("json stringify data", JSON.stringify(response?.data));
      const accessToken = JSON.stringify(response?.data);
      console.log(".accesstoken:", accessToken);
      setAuth({ user, pwd, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      //if no response but got error
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Unauthorised");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorised");
      } else {
        setErrMsg("login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="login">
      <section class="login-boxes">
        <div className="left-image">
          <img src={mindfullLogo} className="mindfull-logo" />
        </div>
        {/*error msg display*/}
        {/*aria-live=assertive: screen reader announce msg immediately when focus is set on this para*/}
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="login-wrap">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username" className="field-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              //set focus on this input
              ref={userRef}
              //dont fill username with past entries
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              //to clear input upon submission
              value={user}
              required
            />

            <label htmlFor="password" className="field-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              //dont need set focus on pw directly
              onChange={(e) => setPwd(e.target.value)}
              //to clear input upon submission
              value={pwd}
              required
            />
            {/* dont need onclick bc its the only button in the form */}
            <button className="sign-in">Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/Register">Sign Up</Link>
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
