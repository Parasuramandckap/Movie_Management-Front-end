import React, { useState } from "react";
import leo from "../../assets/images/leo.png";
import "../../assets/CSS/Home.css";
import axios from "axios";

const FeatureMovie = ({ movieList, handleFavorate }) => {

  
  return (
    <div className="fearure-movie">
      <h2 className="feature-title">Featured today</h2>
      <div className="all-movie-list">
        {movieList.map((movie, index) => {
          return (
            <div
              className="movie-list"
              key={index}
            >
              <div className="image">
                <img src={leo} alt="" />
              </div>
              <div className="favorate" onClick={() => handleFavorate(movie)}>
                <i
                  className={`${
                    movie.is_favourite
                      ? "fa-solid fa-heart"
                      : "fa-regular fa-heart"
                  }`}
                  style={{ color: "#ff0000" }}
                ></i>
              </div>
              <div className="description">
                <div className="movie-details">
                  <h4 className="movie-name">{movie.name}</h4>
                  <p className="movie-year">{movie.release_year.slice(0, 4)}</p>
                  <p className="rating">
                    <i
                      className="fa-solid fa-star star"
                      style={{ color: "#ffdd00" }}
                    ></i>
                    {movie.star_rating}
                  </p>
                </div>
                {/* <div className="reactions">
                <span >
                  <i className={`fa-regular fa-thumbs-up`}></i>
                </span>
                <span >
                  <i className={`fa-regular fa-thumbs-down`}></i>
                </span>
              </div> */}
              </div>
            </div>
          );
        })}
      </div>
      {/* <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {singleMovielist.map((movie,index)=>{
          console.log( movie.upvote);
          return(
            <div className="image-container" key={index}>
            <div className="image-left-side">
              <img src={logo} alt="" />
            </div>
            <div className="image-right-side">
              <h2>{movie.name}</h2>
              <p>{movie.duration}</p>
              <p>{movie.genre}</p>
              <p>{movie.director_name}</p>
              <p>{movie.duration}</p>
                      
          </div>
          </div>
          )
        })}
      </Modal> */}
    </div>
  );
};

export default FeatureMovie;
