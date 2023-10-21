import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  isEmailValid,
  isPasswordValid,
  isFullNameValid,
  calculateStrength
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

  const handleChanges = (e) => {
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
    <div>
      <div className="container mt-4">
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label htmlFor="password">Full Name:</label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullName"
              value={userData.fullName}
              onChange={handleChanges}
            />
            <small>{error.fullName ? error.fullName : ""}</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Email Id:</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="emailId"
              value={userData.emailId}
              onChange={handleChanges}
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChanges}
            />
            <small>{error.password ? error.password : ""}</small>
          </div>
            <div
              className={`mt-2 progress progress-bar bg-${strength >= 5 ? 'success' : strength >= 3 ? 'warning' : 'danger'} ${showList ? "visible":"invisible"}`}
              role="progressbar"
              style={{ width: `${(strength / 5) * 100}%` }}
            >
              {strength >= 5 ? 'Strong' : strength >= 3 ? 'Moderate' : 'Weak'}
            </div>
 
          <ul className={`mt-3 ${showList ? "d-block" : "d-none"}`}>
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
              {/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(userData.password)
                ? "✅ At least one uppercase letter"
                : "❌ At least one uppercase letter"}
            </li>
            <li>
              {/\d/.test(userData.password)
                ? "✅ Contains numbers"
                : "❌ Contains numbers"}
            </li>
          </ul>

          <button className="mt-2 btn btn-primary">Register</button>
        </form>

        <a href="/login">go to login</a>
      </div>
    </div>
  );
}

export default Register;

