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

            localStorage.setItem("token",responce.data.data);
            let decode = jwtDecode(responce.data.data);
            localStorage.setItem("user_details",JSON.stringify(decode.sub));
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
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="text"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleInput}
          />
          <small id="emailHelp" className="form-text text-muted">
            {error.email ? error.email : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="text"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={handleInput}
          />
          <small>{error.password ? error.password : ""}</small>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <a href="/">Go to Register</a>
    </div>
  );
};

export default Login;
