import React, {useState, useEffect} from "react";
import styled from "styled-components";
import arrowLeft from "./assets/arrowLeft.svg";
import arrowRight from "./assets/arrowRight.svg";

export const ActiveCircle = styled.div`
  width: 12px;
  height: 12px;
  background-color: rgb(93, 93, 255); /* You can change this color */
  border-radius: 50%; /* Makes the div a circle */
  margin-left: 5px;
`;

export const InactiveCircle = styled.div`
  width: 12px;
  height: 12px;
  background-color: #d1d5db;
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

export const Arrow = styled.img`
  width: 1.7rem;
  &:hover {
    cursor: pointer;
  }
`;

export const CarouselDots = styled.div`
  display: flex;
  flex-direction: row;
`;

const Carousel = () => {
  /**
   * happy house
   * i choose you
   * z4L
   */
  const songs = [
    {
      link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F16959100&show_artwork=true",
      genre: "House",
      user: "Kyle",
      location: "New York, NY, USA",
    },
    {
      link: "https://www.youtube.com/embed/myEv3Qr3Efo",
      genre: "Afrobeat",
      user: "",
      location: "",
    },
    {
      link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F675062333&show_artwork=true",
      genre: "R&B",
      user: "Kyle",
      location: "New York, NY, USA",
    },
    {
      link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F526329195&show_artwork=true",
      genre: "Hip Hop",
      user: "Kyle",
      location: "New York, NY, USA",
    },
    {
      link: "https://www.youtube.com/embed/BlzeUi9rv2w",
      genre: "Classical",
      user: "Kyle",
      location: "",
    },
    {
      link: "https://www.youtube.com/embed/0ero1Xexyhs",
      genre: "Rap",
      user: "Benny",
      location: "Buffalo, NY, USA",
    },
    {
      link: "https://open.spotify.com/embed/track/56xZjKy9eGabvEOh5WOM1v?si=dc30a0b74aeb48c0&utm_source=oembed",
      genre: "Rock",
      user: "",
      location: "",
    },
    {
      link: "https://open.spotify.com/embed/track/0vFOzaXqZHahrZp6enQwQb?si=1a3d3f0ae1e84b80&utm_source=oembed",
      genre: "Rock",
      user: "",
      location: "",
    },
    {
      link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1033771624&show_artwork=true",
      genre: "Rap",
      user: "",
      location: "",
    },
    {
      link: "https://open.spotify.com/embed/track/6FjKAch1aGFI9LxJziA2Xe?si=d30d348c6dd14ed7&utm_source=oembed",
      genre: "Indie",
      user: "",
      location: "",
    },
  ];
  const [dotIndex, setDotIndex] = useState<number>(0);

  const handleLeftClick = () => {
    if (dotIndex === 0) {
      setDotIndex(songs.length - 1);
    } else {
      setDotIndex(dotIndex - 1);
    }
  };
  const handleRightClick = () => {
    if (dotIndex === songs.length - 1) {
      setDotIndex(0);
    } else {
      setDotIndex(dotIndex + 1);
    }
  };
  // happy house
  // https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F16959100&show_artwork=true

  useEffect(() => {}, []);
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
          src={songs[dotIndex].link}
        ></SongContainer>
      </CarouselContainer>
      <CarouselDots>
        {songs.map((song, index) => {
          return (
            <>{dotIndex === index ? <ActiveCircle /> : <InactiveCircle />}</>
          );
        })}
      </CarouselDots>

      <ArrowContainer>
        <Arrow
          src={arrowLeft}
          style={{marginRight: "24px"}}
          alt="leftArrow"
          onClick={handleLeftClick}
        />
        <Arrow
          src={arrowRight}
          onClick={handleRightClick}
          style={{width: "1.7rem"}}
          alt="rightArrow"
        />
      </ArrowContainer>
    </>
  );
};
export default Carousel;
