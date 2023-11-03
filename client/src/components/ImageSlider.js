import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from "../assets/slide1.jpg";
import slider2 from "../assets/slide2.jpg";
import slider3 from "../assets/slide3.jpg";
import slider4 from "../assets/slide4.jpg";
import slider5 from "../assets/slide5.jpg";

function ImageSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <img src={slider1} alt="slider 1" />
      </Wrap>
      <Wrap>
        <img src={slider2} alt="slider 2" />
      </Wrap>
      <Wrap>
        <img src={slider3} alt="slider 3  " />
      </Wrap>
      <Wrap>
        <img src={slider4} alt="slider 4" />
      </Wrap>
      <Wrap>
        <img src={slider5} alt="slider 5" />
      </Wrap>
    </Carousel>
  );
}

export default ImageSlider;

const Carousel = styled(Slider)`
  padding: 24px 0;

  ul li button {
    &:before {
      color: rgb(150, 150, 171);
      font-size: 10px;
    }
  }

  li.slick-active button:before {
    color: white;
  }
  .slick-list {
    overflow: visible;
  }
  button.slick-arrow {
    display: none;
    &:before {
      display: none;
    }
  }
`;

const Wrap = styled.div`
  cursor: pointer;
  padding: 0 12px;
  img {
    border: 2px solid transparent;
    border-radius: 2px;
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    z-index: 1;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;

    &:hover {
      border: 2px solid rgba(249, 249, 249, 0.8);
    }
  }
`;
