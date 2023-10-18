import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  isEmailValid,
  isPasswordValid,
  isFullNameValid,
} from "../../utitls/validate";
import {  notification } from 'antd';

function Register() {
  const [userData, setUserdata] = useState({
    fullName: "",
    emailId: "",
    password: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();


  //
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
    if (error[name]) delete error[name];
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
      axios.post("http://127.0.0.1:5000/register",{
        name:userData.fullName,
        email:userData.emailId,
        password:userData.password
      }).then(function (register) {
        
        
        if(register.data.success){
          // setError({...error,message:"Registeration successfully"});

          notification.success({
            message: 'Success',
            description: register.data.message,
          });

          navigate("/login");


          
        }else{
          // setError({...error,message:register.data.message});
          notification.error({
            message: 'Error',
            description: register.data.message,
          });
    
        }
       
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="fullName"
         
            placeholder="Enter FullName"
            onChange={handleChanges}
          />
          <small
            id=""
            className={`${
              error.fullName
                ? "form-text text-muted"
                : "form-text text-muted invisible"
            }`}
          >
            {error.fullName ? error.fullName : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="emailId"
        
            onChange={handleChanges}
          />
          <small id="" className={``}>
            {error.emailId ? error.emailId : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
           
            onChange={handleChanges}
          />
          <small
            id=""
            className={`${
              error.password
                ? "form-text text-muted"
                : "form-text text-muted invisible"
            }`}
          >
            {error.password ? error.password : ""}
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <a href="/login">go to login</a>
    </div>
  );
}

export default Register;
