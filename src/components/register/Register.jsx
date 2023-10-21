import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/Register_Login.css";
import loginImage from "../../assets/images/login.png";
import logo from "../../assets/images/logo.png";
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
    <div className="register-container">
      <div className="container">
        <div className="img">
          <img src={loginImage} alt="Img" />
        </div>
        <form onSubmit={handleSubmit} className="details">
          <div className="logo-title">
            <div className="logo-session">
              <img src={logo} alt="logo" />
              <h4>
                DCKAP <br />
                Cinemas 360
              </h4>
            </div>
            <div className="title">
              <h2>Welcome to DCKAP Cinema 360</h2>
            </div>
          </div>
          <div className="text-input">
            <label>Full Name</label>
            <br />
            <input
              type="text"
              id="userName"
              name="fullName"
              value={userData.fullName}
              placeholder="Enter FullName"
              onChange={handleInputs}
            />
            <small id="">{error.fullName ? error.fullName : ""}</small>
          </div>
          <div className="text-input">
            <label>Email address</label>
            <br />
            <input
              type="text"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="emailId"
              value={userData.emailId}
              onChange={handleInputs}
            />
            <small id="" className={``}>
              {error.emailId ? error.emailId : ""}
            </small>
          </div>

          <div className="text-input">
            <label>Password</label>
            <br />
            <input
              type="text"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleInputs}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <small id="">{error.password ? error.password : ""}</small>
            <ul
              className={` check-list mt-3 ${
                showList ? "visiblie" : "invisible"
              }`}
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
                {/\d/.test(userData.password)? "✅ Contains numbers": "❌ Contains numbers"}
              </li>
            </ul>
            <div
              className={`mt-2 progress progress-bar bg-${
                strength >= 5 ? "success" : strength >= 3 ? "warning" : "danger"
              } ${showList ? "visible" : "invisible"}`}
              role="progressbar"
              style={{ width: `${(strength / 5) * 100}%` }}
            >
              {strength >= 5 ? "Strong" : strength >= 3 ? "Moderate" : "Weak"}
            </div>
          </div>
          <button type="submit" className="register">
            Register
          </button>
          <div className="login">
            <a href="/login">Already user login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
