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
const Demo = () => {
  return (
    <div className="curosel">
      <Carousel effect="fade">
          <div  className="carousel-slide" style={contentStyle}>
            <img src={loki}  />
            <div className="overlay-text"></div>
          </div>
          <div  className="carousel-slide" style={contentStyle}>
            <img src={loki}  />
            <div className="overlay-text"></div>
          </div>
          <div  className="carousel-slide" style={contentStyle}>
            <img src={loki}  />
            <div className="overlay-text"></div>
          </div>
        </Carousel>
    </div>
  );
};
export default Demo;
