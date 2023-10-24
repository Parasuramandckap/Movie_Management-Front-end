import React from "react";
import { Carousel } from "antd";
import loki from "../../assets/images/loki.png";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#000000",
};
const Curosel = () => {
  return (
    <div className="curosel">
      <Carousel effect="fade">
        <div className="carousel-slide" style={contentStyle}>
          <img src={loki} />
          <div className="overlay-text">
            <h2 className="movie-name">Loki </h2>
            <h3 className="add">Watch Trailer Now </h3>
            <p className="hour">2 hr 55 min <i class="fa-regular fa-circle-play"></i></p>
              <div className="like-unlike">
              <p className="like"><i class="fa-solid fa-thumbs-up"></i>500k likes</p>
              <p className="unlike"><i class="fa-regular fa-thumbs-down"></i>500k unlikes</p>
              </div>
            <p className="curosel-description">
              After the devastating events of the Infinity War, the universe is
              in ruins. With the help of remining allies, the Avengers assemble
              once more in order to reverse Thanos, action and restore balance
              to the universe.
            </p>
          </div>
        </div>
        <div className="carousel-slide" style={contentStyle}>
          <img src={loki} />
          <div className="overlay-text"></div>
        </div>
        <div className="carousel-slide" style={contentStyle}>
          <img src={loki} />
          <div className="overlay-text"></div>
        </div>
      </Carousel>
    </div>
  );
};
export default Curosel;
