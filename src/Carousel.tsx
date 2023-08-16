import React from "react";
import styled from "styled-components";
import arrowLeft from "./assets/arrowLeft.svg";
import arrowRight from "./assets/arrowRight.svg";

export const Circle = styled.div`
  width: 16px;
  height: 16px;
  background-color: rgb(93, 93, 255); /* You can change this color */
  border-radius: 50%; /* Makes the div a circle */
  margin-left: 5px;
`;

export const InactiveCircle = styled.div`
  width: 16px;
  height: 16px;
  background-color: rgb(102, 102, 102);
  border-radius: 50%;
  margin-left: 5px;
`;

export const CarouselContainer = styled.div`
  max-width: 560px;
  height: 357px;
  max-height: 359px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgb(102, 102, 102);

  margin: 24px;
  position: relative;
  left: 14px;
  @media (max-width: 600px) {
    left: unset;
  }
`;

export const SongContainer = styled.iframe`
  max-width: 560px;
  width: 100%;
  height: 355px;
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
`;

const Carousel = () => {
  return (
    <>
      <CarouselContainer>
        <SongContainer
          title=""
          width="560"
          height="355"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{borderRadius: "12px"}}
          src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F16959100&show_artwork=true"
        ></SongContainer>
      </CarouselContainer>
      <ArrowContainer>
        <img src={arrowLeft} style={{width: "1.7rem", marginRight: "24px"}} />
        <img src={arrowRight} style={{width: "1.7rem"}} />
      </ArrowContainer>
      {/* <Circle></Circle>
      <InactiveCircle></InactiveCircle> */}
    </>
  );
};
export default Carousel;
