import React from "react";
import { Carousel } from "antd";
import { useState } from "react";
import loki from "../../assets/images/loki.png";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#000000",
};

const Curosel = ({ movieList }) => {
  const [isReadMore, setReadMore] = useState(false);
  const [maxLength, setMaxlength] = useState(200);

  const toggleReadMore = () => {
    setReadMore(!isReadMore);
  };
  return (
    <div className="curosel">
      <Carousel effect="fade">
        {movieList.map((movie, index) => {
          const textToShow = isReadMore
            ? movie.description
            : movie.description.slice(0, maxLength);

          return (
            <div className="carousel-slide" style={contentStyle} key={index}>
              <img src={loki} />
              <div className="overlay-text">
                <h2 className="movie-name">
                  {movie.name
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                </h2>
                {/* <h3 className="add">Watch Trailer Now </h3> <i class="fa-regular fa-circle-play"></i>*/}
                <p className="hour">{movie.duration} </p>
                <p className="genre">
                  {movie.genre}{" "}
                  <i
                    className="fa-solid fa-star star"
                    style={{ color: "#ffdd00" }}
                  ></i>
                  {movie.star_rating}
                </p>
                <div className="like-unlike">
                  {/* <p className="like"><i class="fa-solid fa-thumbs-up"></i>500k likes</p>
                    <p className="unlike"><i class="fa-regular fa-thumbs-down"></i>500k unlikes</p> */}
                </div>
                <p className="curosel-description">{textToShow}</p>
                {movie.description.length > maxLength && (
                  <a onClick={toggleReadMore}>
                    {isReadMore ? "Read Less" : "Read More"}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Curosel;
