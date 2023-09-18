import React, {useState} from "react";
import styled from "styled-components";
import arrowLeft from "./assets/arrowLeft.svg";
import arrowRight from "./assets/arrowRight.svg";
import {Song} from "./types/types";
import SongItem from "./SongItem";

export const Circle = styled.div`
  width: 8px;
  height: 8px;
  background-color: rgb(93, 93, 255); /* You can change this color */
  border-radius: 50%; /* Makes the div a circle */
  margin-left: 5px;
  position: relative;
  top: 6px;
  margin-right: 5px;
`;

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

export const CarouselContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 560px;
  height: 353px;
  max-height: 353px;
  border-radius: 12px;
  padding: 0 3px;
  margin: ${(props) => (props.inProfile ? "auto" : "24px")};
  position: relative;
  left: ${(props) => (props.inProfile ? "0px" : "14px")};
  @media (max-width: 600px) {
    left: unset;
  }
`;

export const SongContainer = styled.iframe`
  max-width: 560px;
  width: 100%;
  height: 355px;
  max-height: 353px;
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  margin-bottom: 12px;
  padding-bottom: 24px;
  justify-content: center;
`;

export const Arrow = styled.img`
  width: 1.7rem;
  &:hover {
    cursor: pointer;
  }
`;

export const Globe = styled.img`
  width: 1.2rem;
  margin-bottom: 5px;
  margin-right: 2px;
`;

export const CarouselDots = styled.div<Props>`
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => (props.inProfile ? "16px" : "0px")};
  justify-content: center;
`;

export const Details = styled.div<Props>`
  display: ${(props) => (props.inProfile ? "none" : "flex")};
  flex-direction: row;
  align-content: center;
  justify-content: center;
  font-family: "Helvetica Neue", sans-serif;
  max-width: 560px;
  width: 100vw;
  border: 1px solid black;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 12px;
  position: relative;
  left: 14px;
  bottom: 12px;
  background-color: #faf5ff;
  @media (max-width: 600px) {
    left: unset;
    flex-direction: column-reverse;
  }
`;

export const DetailText = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  @media (max-width: 600px) {
    align-self: flex-start;
  }
`;

export const GenreBox = styled.div`
  position: absolute;
  top: 5px;
  left: 469px;
  width: 81px;
  max-width: 100%;
  text-align: center;
  border: 1px solid black;
  padding: 2px;
  border-radius: 4px;
  background-color: #f8fafc;
   @media (max-width: 600px) {
     position: relative;
     top: unset;
     left: unset;
     bottom: 6px;
     align-self: flex-end;
  }
}
`;
export const SongDetails = styled.div<Props>`
  display: ${(props) => (props.inProfile ? "flex" : "none")};
  flex-direction: ${(props) => (props.inProfile ? "column" : "row")};
  justify-content: space-around;
  color: rgb(93, 93, 255);
  background-color: #eef2ff;
  border: 0;
  border-radius: 5px;
  min-height: 31px;
  width: 96vw;
  max-width: 556px;
  margin: ${(props) =>
    props.inProfile ? "10px 10px 5px 10px" : "10px 10px 20px 10px"};
  padding: 5px 7px;
`;

export const Genre = styled.div`
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
  margin-right: 6px;
`;

export const Time = styled.div`
  color: #9ca3af;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: rgb(93, 93, 255); /* You can change this color */
  border-radius: 50%; /* Makes the div a circle */
  position: relative;
  top: 6px;
  margin-right: 6px;
`;

export const Share = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 6px;
  font-size: 15px;
  color: rgb(93, 93, 255);
  font-family: "Helvetica Neue", sans-serif;
  width: 65px;
  border: 0 !important;
  background: #d1d5db;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

export const CopyContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
  margin-top: 4px;
`;

export const ShowCopyContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  top: 9px;
  left: 5px;
`;
export const CopiedMessage = styled.div`
  margin-left: 5px;
  color: #525f7f;
  font-size: 14px;
  font-weight: 700;
  font-family: sans-serif;
  top: 2px;
  position: relative;
`;

interface Props {
  songs?: Song[];
  inProfile: boolean;
}
const defaultSongs: Song[] = [
  {
    link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F16959100&show_artwork=true",
    genre: "House",
    user: "@kyle",
    location: "New York, NY, USA",
    onLandingPage: true,
  },
  {
    link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F526329195&show_artwork=true",
    genre: "Hip Hop",
    user: "@carter",
    location: "Blacksburg, VA, USA",
    onLandingPage: true,
  },
  {
    link: "https://www.youtube.com/embed/BlzeUi9rv2w",
    genre: "Classical",
    user: "@chloe",
    location: "Toronto, Canada",
    onLandingPage: true,
  },
  {
    link: "https://open.spotify.com/embed/track/6FjKAch1aGFI9LxJziA2Xe?si=d30d348c6dd14ed7&utm_source=oembed",
    genre: "Indie",
    user: "@ava38",
    location: "San Francisco, CA, USA",
    onLandingPage: true,
  },
  {
    link: "https://www.youtube.com/embed/myEv3Qr3Efo",
    genre: "Afrobeat",
    user: "@king_tobe",
    location: "Nigeria, Africa",
    onLandingPage: true,
  },
  {
    link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F675062333&show_artwork=true",
    genre: "R&B",
    user: "@gabybaby",
    location: "Houston, TX, USA",
    onLandingPage: true,
  },
  {
    link: "https://open.spotify.com/embed/track/56xZjKy9eGabvEOh5WOM1v?si=dc30a0b74aeb48c0&utm_source=oembed",
    genre: "Rock",
    user: "@seb.91",
    location: "Sydney, Australia",
    onLandingPage: true,
  },
  {
    link: "https://www.youtube.com/embed/0ero1Xexyhs",
    genre: "Rap",
    user: "@mikey",
    location: "Buffalo, NY, USA",
    onLandingPage: true,
  },
  {
    link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1033771624&show_artwork=true",
    genre: "Rap",
    user: "@julia.foolia",
    location: "Atlanta, GA, USA",
    onLandingPage: true,
  },
  {
    link: "https://open.spotify.com/embed/track/0vFOzaXqZHahrZp6enQwQb?si=1a3d3f0ae1e84b80&utm_source=oembed",
    genre: "Rock",
    user: "@mateo",
    location: "Berlin, Germany",
    onLandingPage: true,
  },
];
const Carousel: React.FC<Props> = ({
  songs = defaultSongs,
  inProfile = false,
}) => {
  /**
   * happy house
   * i choose you
   * z4L
   */

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

  return (
    <div
      style={{display: "flex", flexDirection: "column", alignItems: "center"}}
    >
      <SongItem song={songs[dotIndex]} inProfile={inProfile} />

      <CarouselDots inProfile={inProfile}>
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
    </div>
  );
};
export default Carousel;
