import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Home() {
  const [userDetails, setUserdetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    let userDetails = JSON.parse(localStorage.getItem("user_details"));
    setUserdetails(userDetails);
 
    //movie details fetch 
    axios.get("http://127.0.0.1:5000/showmovie?limit=4&page=1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user_details");
    navigate("/login");
  }

  return (
    <div>
      <div>welcome to home  {userDetails.name}</div>
      {/* <div>
        <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
      </div> */}

<nav class="navbar navbar-dark bg-dark">

</nav>

<nav class="navbar navbar-dark bg-primary">

</nav>

<nav class="navbar navbar-light" style="background-color: #e3f2fd;">

</nav>
    </div>
  );
}
