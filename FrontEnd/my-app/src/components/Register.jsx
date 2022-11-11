import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./css/LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import mindfullLogo from "../images/mindfull-logo.png";

// backend
import axios from "../api/axios";
const REGISTER_URL = "/api/signup";

// [a-zA-Z]: start with lower/uppercase letter
// followed by 3-23 chars that is [a-zA-Z0-9-_] (letters, numbers, -, _)
// total: 4-24 char
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

// pw require at least 1 lowercase, 1 uppercase, 1 number, 1 special case
// total: 8-24 char
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

const Register = () => {
  //set focus on user input when component loads
  const userRef = useRef();
  //if get error, need put focus on that so it can be announced by screen reader for accessibility
  const errRef = useRef();

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  //whether we have focus on that input field or not
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  //if successfully submit registration form
  const [success, setSuccess] = useState(false);

  //first time apply: set focus when component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //validate username
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);
  // [] is dependency array

  // if any of the state in [user, pwd, matchPwd] changes, clear out error msg bc user has read err messages and is now making changes
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with js hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      // dont submit anyth
      return;
    }
    //use axios here
    // console.log(user, pwd);
    // setSuccess(true);
    // navigate("/Login");

    try {
      const response = await axios.post(
        REGISTER_URL,
        //  JSON.stringify({user: wtv backend expect, pwd: password})
        {
          username: user,
          password: pwd,
        }
      );
      //response from server
      console.log(response.data);
      //full response
      console.log(JSON.stringify(response));
      navigate("/Login");
      //clear input fields
    } catch (err) {
      // ?. is optional chaining
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className="register">
        {success ? (
          <div className="register-page">
            <div className="left-image">
              <img src={mindfullLogo} className="mindfull-logo" />
            </div>
            <section class="signed-in">
              <h1>Success!</h1>
              <p>
                <a href="/Login">Sign in</a>
              </p>
            </section>
          </div>
        ) : (
          <section class="register-boxes">
            {/* if errMsg exist, class="errmsg", if not offscren, meaning the msg is offscreen, cant see, but still thr */}
            <div className="left-image">
              <img src={mindfullLogo} className="mindfull-logo" />
            </div>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {" "}
              {errMsg}{" "}
            </p>
            <div className="register-wrap">
              <h1>Register your account</h1>
              <form onSubmit={handleSubmit} className="register-form">
                <label htmlFor="username" className="field-label">
                  Username:
                  <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  id="username"
                  // allow to set focus on input when the page loads
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  //indicate whether value entered is accepted format
                  //lets screenreader announce whether input field needs adjustment before form is submitted
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="password" className="field-label">
                  Password:
                  <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  //match label
                  id="password"
                  // allow to set focus on input
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  //indicate whether value entered is accepted format
                  //lets screenreader announce whether input field needs adjustment before form is submitted
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {/* 8 to 24 characters.
                      <br />
                      Must include uppercase and lowercase letters, a number and a special
                      character.
                      <br />
                      Allowed special characters:{" "}
                      <span aria-label="exclamation mark">!</span>
                      <span aria-label="at symbol">@</span>
                      <span aria-label="hashtag">#</span>
                      <span aria-label="dollar sign">$</span>
                      <span aria-label="percent">%</span> */}
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="confirm_pwd" className="field-label">
                  Confirm Password:
                  {/* matchPwd to exist so that it cant be empty fields matching */}
                  <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  //match label
                  id="confirm_pwd"
                  // allow to set focus on input
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  //indicate whether value entered is accepted format
                  //lets screenreader announce whether input field needs adjustment before form is submitted
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>

                <button
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                  className="sign-up"
                >
                  Sign up
                </button>
              </form>
              <p>
                Already Registered?
                <br />
                <span className="line">
                  <Link to="/Login">Sign In</Link>
                </span>
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Register;
