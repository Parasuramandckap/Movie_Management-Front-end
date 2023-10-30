import React, { useState } from "react";
import { Carousel } from "antd";
import loki from "../../assets/images/loki.png";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#000000",
};
const Curosel = ({ movieList }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="curosel">
      <Carousel effect="fade" autoplay>
        {movieList.map((movie, index) => {
          const textShow = isExpanded ? movie.description : movie.description.slice(0,200)
          return (
            <div className="carousel-slide" style={contentStyle} key={index}>
              <img src={loki} />
              <div className="overlay-text">
                <h2 className="movie-name">{movie.name} </h2>
                {/* <h3 className="add">Watch Trailer Now </h3> <i class="fa-regular fa-circle-play"></i>*/}
                <p className="hour">{movie.duration} </p>
                <div className="like-unlike">
                  <p className="genre">
                    {movie.genre}{" "}
                    <i
                      className="fa-solid fa-star star"
                      style={{ color: "#ffdd00" }}
                    ></i>
                    {movie.star_rating}
                  </p>
                  {/* <p className="like"><i class="fa-solid fa-thumbs-up"></i>500k likes</p>
                    <p className="unlike"><i class="fa-regular fa-thumbs-down"></i>500k unlikes</p> */}
                </div>
                <p className="curosel-description">{textShow}</p>
                {movie.description.length > 200 && (
                  <a onClick={toggleReadMore}>
                    {isExpanded ? "Read Less" : "Read More"}
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
