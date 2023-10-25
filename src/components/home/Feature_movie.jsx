import React, { Component, useEffect } from "react";
import leo from "../../assets/images/leo.png";
const FeatureMovie = ({ movieList }) => {
  // useEffect(()=>{
  //     let userId = JSON.parse(localStorage.getItem("user_details")).user_id;
  //     console.log(userId);
  // },[])
  return (
    <div className="fearure-movie">
      <h2 className="feature-title">Featured today</h2>
      <div className="all-movie-list">
        <div className="movie-list">
          {movieList.map((movie,index) => {
            return (
              <div key={index}>
                <div className="image">
                  <img src={leo} alt="" />
                </div>
                <div className="favorate">
                  <i
                    class="fa-regular fa-heart"
                    style={{ color: "#ff0000" }}
                  ></i>
                </div>
                <div className="description">
                  <div className="movie-details">
                    <h4 className="movie-name">{movie.name}</h4>
                    <p className="movie-year">{movie.release_year}</p>
                    <p className="rating">
                      <i
                        class="fa-solid fa-star star"
                        style={{ color: "#ffdd00" }}
                      ></i>
                      {movie.star_rating}
                    </p>
                  </div>
                  <div className="reactions">
                    <span>
                      <i class="fa-regular fa-thumbs-up"></i>
                    </span>
                    <span>
                      <i class="fa-regular fa-thumbs-down"></i>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureMovie;
