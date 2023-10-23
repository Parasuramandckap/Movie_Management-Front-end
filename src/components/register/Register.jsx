import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../../assets/CSS/Register_Login.css";

// import loginImage from "../../assets/images/login.png";
// import logo from "../../assets/images/logo.png";
import logo from "../../assets/images/Frame 607.png";
import banner from "../../assets/images/Group 7764.png";

import "../../assets/CSS/style.css";

import axios from "axios";
import {
  isEmailValid,
  isPasswordValid,
  isFullNameValid,
  calculateStrength,
} from "../../utitls/validate";
import { notification } from "antd";
function Register() {
  const [userData, setUserdata] = useState({
    fullName: "",
    emailId: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [strength, setStrength] = useState(0);
  const [showList, setShowlist] = useState(false);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
    if (error[name]) delete error[name];
    if (name === "password") {
      let progress = calculateStrength(e.target.value);
      setStrength(progress);
      setShowlist(true);
    }
  };

  const validation = (userData) => {
    let errorList = {};
    let isVaild = true;

    if (isFullNameValid(userData.fullName)) {
      errorList.fullName = isFullNameValid(userData.fullName);
      isVaild = false;
    }
    if (isEmailValid(userData.emailId)) {
      errorList.emailId = isEmailValid(userData.emailId);
      isVaild = false;
    }
    if (isPasswordValid(userData.password)) {
      errorList.password = isPasswordValid(userData.password);
      isVaild = false;
    }

    setError(errorList);
    return isVaild;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validation(userData)) {
      axios
        .post("http://127.0.0.1:5000/register", {
          name: userData.fullName,
          email: userData.emailId,
          password: userData.password,
        })
        .then(function (register) {
          if (register.data.success) {
            // setError({...error,message:"Registeration successfully"});

            notification.success({
              message: "Success",
              description: register.data.message,
            });

            navigate("/login");
          } else {
            // setError({...error,message:register.data.message});
            notification.error({
              message: "Error",
              description: register.data.message,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleFocus = () => setShowlist(true);
  const handleBlur = () => setShowlist(false);

  return (
    <div className="container">
      <div className="left">
        <img src={banner} alt="banner-image" />
      </div>
      <div className="right">
        <div className="logo">
          <img src={logo} alt="logo-image" />
        </div>
        <h2>Welcome to DCKAP Cinema 360</h2>
        <form onSubmit={handleSubmit}>
          <div className="group-1">
            <label htmlFor="username">
              Full Name <span className="required-symbole">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputs}
              placeholder="Type here"
            />
            <div className="error">
              {error.fullName ? error.fullName : ""}
            </div>
          </div>
          <div className="group-2">
            <label htmlFor="username">
              Email id <span className="required-symbole">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="emailId"
              value={userData.emailId}
              onChange={handleInputs}
              placeholder="Type here"
            />
            <div className="error">{error.emailId ? error.emailId : ""}</div>
          </div>
          <div className="group-3">
            <label htmlFor="password">
              Password <span className="required-symbole">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleInputs}
              placeholder="Type here"
            />
            <div className="error">{error.password ? error.password : ""}</div>
            <div className="requirements">
              <ul
                className={`check-list mt-3 `}
                style={{ display: showList ? "block" : "none" }}
              >
                <li>
                  {userData.password.length >= 8
                    ? "✅ Minimum 8 characters"
                    : "❌ Minimum 8 characters"}
                </li>
                <li>
                  {/[A-Z]/.test(userData.password)
                    ? "✅ Contains uppercase letters"
                    : "❌ Contains uppercase letters"}
                </li>
                <li>
                  {/[a-z]/.test(userData.password)
                    ? "✅ Contains lowercase letters"
                    : "❌ Contains lowercase letters"}
                </li>
                <li>
                  {/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(userData.password)
                    ? "✅ At least one special letter"
                    : "❌ At least one special letter"}
                </li>
                <li>
                  {/\d/.test(userData.password)
                    ? "✅ Contains numbers"
                    : "❌ Contains numbers"}
                </li>
              </ul>
            </div>
            {/* <div
              className={`mt-2 progress progress-bar bg-${
                strength >= 5 ? "success" : strength >= 3 ? "warning" : "danger"
              } ${showList ? "visible" : "invisible"}`}
              role="progressbar"
              style={{ width: `${(strength / 5) * 100}%` }}
            ></div> */}
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="or">
          <p>-or-</p>
        </div>
        <div className="exits-user">
          <a href="/login">
            Already user login <span className="arrow">&#8594;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
