import React, { Component } from "react";
import { Button } from "antd";
import logo from "../../assets/images/Home_page_logo.png"

const Navbar = () => {
  return (
    <div class="navbar">
        <div class="left-side">
            <div class="logo">
                <img src={logo} alt="Logo"/>
            </div>
        </div>
        <div class="middle">
            <ul class="categories">
                <li><i class="fa-solid fa-house"></i><a href="#">Home</a></li>
                <li><i class="fa-solid fa-film"></i><a href="#">Movies</a></li>
                {/* <li><i class="fa-solid fa-tv"></i><a href="#">TV Showes</a></li> */}
            </ul>
        </div>
        <div class="right-side">
            <div className="add-movie">
              <button>Add Movie</button>
            </div>
            <div class="search">
                <div><i class="fa-solid fa-magnifying-glass"></i></div>
                {/* <input type="text" placeholder="Search" /> */}
                {/* <button>Search</button> */}
            </div>
            <div class="profile">
            <i class="fa-solid fa-user"></i>
            </div>
        </div>
    </div>
  );
};

export default Navbar;
