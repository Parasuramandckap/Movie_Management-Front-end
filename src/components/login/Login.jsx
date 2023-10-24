import React, { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { isEmailValid,validateLoginPassword } from "../../utitls/validate";
import axios from "axios";
import jwtDecode from "jwt-decode";
import logo from "../../assets/images/Frame 607.png";
import banner from "../../assets/images/Group 7764.png";
import "../../assets/CSS/Register_Login.css";



// import { Icon } from 'react-icons-kit';
// import { eyeOff } from 'react-icons-kit/feather/eyeOff';
// import { eye } from 'react-icons-kit/feather/eye';

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUsetdata] = useState({
    emailId: "",
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

    if (isEmailValid(userData.emailId)) {
      error.emailId = isEmailValid(userData.emailId);
      isValid = false;
    }
    if(validateLoginPassword(userData.password)){
      error.password = validateLoginPassword(userData.password);
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
          email: userData.emailId,
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
  // const [showPassword, setShowPassword] = useState(false);
  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };


  return (
    <div className="main-container">
       <div className="container">
      <div className="left">
        <img src={banner} alt="banner-image" />
      </div>
      <div className="right">
        <div className="logo">
          <img src={logo} alt="logo-image" />
        </div>
        <h2>Welcome to DCKAP Cinema 360</h2>
        <form onSubmit={handleLogin}>
          <div className="group-1">
            <label htmlFor="emailId">
              Email id <span className="required-symbole">*</span>
            </label>
            <input
              type="text"
              id="emailId"
              name="emailId"
              value={userData.emailId}
              onChange={handleInput}
              placeholder="Type here"
            />
            <div className="error">{error.emailId ? error.emailId : ""}</div>
          </div>
          <div className="group-2">
            <label htmlFor="password">
              Password <span className="required-symbole">*</span>
            </label>
            <div className="password-icon">
            <input
               type='password'
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInput}
              placeholder="Type here"
            />
                {/* <span
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <Icon icon={eyeOff} size={20} />
          ) : (
            <Icon icon={eye} size={20} />
          )}
        </span> */}
        </div>
            <div className="error">{error.password ? error.password : ""}</div>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="or">
          <p>-or-</p>
        </div>
        <div className="exits-user">
          <a href="/">
            Create a new Account <span className="arrow">&#8594;</span>
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
