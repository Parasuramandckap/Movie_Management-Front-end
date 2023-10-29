import React from "react";
import "../../assets/CSS/Home.css";

const FeatureMovie = ({ movieList, handleFavorate }) => {
  
  return (
    <div className="fearure-movie">
      <h2 className="feature-title">Featured today</h2>
      <div className="all-movie-list">
        {movieList.length === 0 ? (
          <p>Movie is Empty</p>
        ) : (
          movieList.map((movie, index) => {
            return (
              <div className="movie-list" key={index}>
                <div className="image">
                  <img
                    src={`http://127.0.0.1:5000/${movie.image_path}`}
                    alt=""
                  />
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
                    <h4 className="movie-name">
                      {movie.name
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </h4>
                    <p className="movie-year">{movie.release_year}</p>
                    <p className="rating">
                      <i
                        className="fa-solid fa-star star"
                        style={{ color: "#ffdd00" }}
                      ></i>
                      {movie.star_rating}
                    </p>
                  </div>

                  <div className="reactions">
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <br />
    </div>
  );
};

export default FeatureMovie;
