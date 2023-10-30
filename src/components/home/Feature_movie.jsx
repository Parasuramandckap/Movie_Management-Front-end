import React from "react";
import "../../assets/CSS/Home.css";
import noDataImage from "../../assets/images/no-data-found.png";
// import noDataImage from "../../assets/images/no-data-found1.png.gif"
const FeatureMovie = ({ movieList, handleFavorate }) => {
  return (
    <div className="fearure-movie">
      <h2 className="feature-title">Featured today</h2>
      <div className="all-movie-list">

        
        {movieList.length === 0 ? (
          <div className="nodata">
            <img src={noDataImage} />
          </div>
        ) : (
          movieList.map((movie, index) => {
            return (
              <div className="movie-list" key={index}>
                <div className="image">

                  {movie.image_path ?   <img
                    src={`http://127.0.0.1:5000/${movie.image_path}`}
                    alt=""
                  /> : <img src={"data:image/png;base64,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"}/>}
                
                </div>
                <div className="favorate" onClick={() => handleFavorate(movie)}>
                  <i
                    className={`${
                      movie.is_favourite === 0
                        ? "fa-regular fa-heart" 
                        : "fa-solid fa-heart"
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

                  <div className="reactions"></div>
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
