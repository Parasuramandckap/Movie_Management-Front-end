import React, { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/Register_Login.css";
import loginImage from "../../assets/images/login.png";
import logo from "../../assets/images/logo.png";
import { isEmailValid } from "../../utitls/validate";
import axios from "axios";
import jwtDecode from "jwt-decode";
const Login = () => {
  const navigate = useNavigate();
  const [userData, setUsetdata] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUsetdata({ ...userData, [name]: value });

    if (error[name]) delete error[name];
  };

  const validate = (userData) => {
    let error = {};
    let isValid = true;

    if (isEmailValid(userData.email)) {
      error.email = isEmailValid(userData.email);
      isValid = false;
    }
    if (!userData.password.trim()) {
      error.password = "password is required";
      isValid = false;
    }

    setError(error);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validate(userData)) {
      axios
        .post("http://127.0.0.1:5000/login", {
          email: userData.email,
          password: userData.password,
        })
        .then((responce) => {
          if (responce.data.success) {
            notification.success({
              message: "success",
              description: responce.data.message,
            });

            console.log(responce);
            localStorage.setItem("token", responce.data.data);
            let loginUser = jwtDecode(responce.data.data);
            localStorage.setItem("user_details", JSON.stringify(loginUser.sub));
            navigate("/home");
          } else {
            notification.error({
              message: "Error",
              description: responce.data.message,
            });
          }
        });
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="img">
          <img src={loginImage} alt="Img" />
        </div>
        <form onSubmit={handleLogin} className="details">
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
        <label >Email address</label><br />
        <input type="text" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
          onChange={handleInput}
        />
        <small >
          {error.email ? error.email : ""}
        </small>
      </div>


      <div className="text-input">
        <label>Password</label><br />
        <input type="text" name="password" id="exampleInputPassword1" placeholder="Password"
          onChange={handleInput}
        />
        <small>{error.password ? error.password : ""}</small>
      </div>

      <button type="submit" className="register">
        Submit
      </button>
      <div className="login">
        <a href="/">Go to Register</a>
      </div>
    </form>
  </div>
</div>
  );
};

export default Login;


