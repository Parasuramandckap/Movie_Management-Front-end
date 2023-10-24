import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import Navbar from "./Navbar";
import Curosel from "./Curosel";
import FeatureMovie from "./Feature_movie";
export default function Home() {
  const [userDetails,setUserdetails] = useState({});
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
    <div className="home-page">
      <Navbar />
      <Curosel/>
      <FeatureMovie />
    </div>
    
 
  );
}
  






















   // <div className="home-container">
    //   <div>welcome to home  {userDetails.name}</div>

    //   <div className="navbar-home">
    //     <div>
    //       <img src={logo} alt="" />
    //     </div>
    //     <div className="movies-catogery">

    //     <div className="home">
    //       <div className="home-icon"><i class="fa-solid fa-house"></i></div>
    //       <div className="home-text">Home</div>
    //     </div>
    //     <div className="film">
    //       <div className="film-logi"><i class="fa-solid fa-film"></i></div>
    //       <div className="film-text">Movies</div>
    //     </div>
    //     <div className="tv"><i class="fa-solid fa-tv"></i>TV Showes</div>
    //     </div>
    //   </div>
     
    //   <div>
       
    //     <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
    //   </div>
    // </div>