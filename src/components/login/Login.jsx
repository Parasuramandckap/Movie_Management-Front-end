import React, { useState } from "react";
import {  notification } from 'antd';
import { useNavigate } from "react-router-dom";

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
            localStorage.setItem("token",responce.data.data);
            let loginUser = jwtDecode(responce.data.data);
            localStorage.setItem("user_details",JSON.stringify(loginUser.sub));
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
    <div className="container mt-4">
    <form onSubmit={handleLogin} >
      <div className="form-group">
        <label htmlFor="password">Email Id:</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInput}
        />
        <small>{error.emailId ? error.emailId : ""}</small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          className="form-control"
          name="password"
          id="password"
          value={userData.password}
          onChange={handleInput}
        />
        <small>{error.password ? error.password : ""}</small>
      </div>
      <button className="mt-2 btn btn-primary">Register</button>
    </form>
  </div>
  );
};

export default Login;
