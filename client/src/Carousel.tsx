import React, {useState, useEffect} from "react";
import styled from "styled-components";
import arrowLeft from "./assets/arrowLeft.svg";
import arrowRight from "./assets/arrowRight.svg";
import globe from "./assets/globe.svg";

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
  max-width: 560px;
  height: 353px;
  max-height: 353px;
  width: 100%;
  border-radius: 12px;
  margin: ${(props) => (props.inProfile ? "0px" : "24px")};
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

export const Globe = styled.img`
  width: 1.2rem;
  margin-bottom: 5px;
  margin-right: 2px;
`;

export const CarouselDots = styled.div<Props>`
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => (props.inProfile ? "16px" : "0px")};
`;

export const Details = styled.div<Props>`
  display: ${(props) => (props.inProfile ? "none" : "flex")};
  flex-direction: row;
  align-content: center;
  justify-content: center;
  font-family: "Helvetica Neue", sans-serif;
  max-width: 560px;
  width: 100%;
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

export const Genre = styled.div`
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
export interface Song {
  link: string;
  genre: string;
  user: string;
  location: string;
}
interface Props {
  songs?: Song[];
  inProfile: boolean;
}
const defaultSongs: Song[] = [
  {
    link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F16959100&show_artwork=true",
    genre: "House",
    user: "Kyle",
    location: "New York, NY, USA",
  },
  {
    link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F526329195&show_artwork=true",
    genre: "Hip Hop",
    user: "Carter",
    location: "Blacksburg, VA, USA",
  },
  {
    link: "https://www.youtube.com/embed/BlzeUi9rv2w",
    genre: "Classical",
    user: "Chloe",
    location: "Toronto, Canada",
  },
  {
    link: "https://open.spotify.com/embed/track/6FjKAch1aGFI9LxJziA2Xe?si=d30d348c6dd14ed7&utm_source=oembed",
    genre: "Indie",
    user: "Ava",
    location: "San Francisco, CA, USA",
  },
  {
    link: "https://www.youtube.com/embed/myEv3Qr3Efo",
    genre: "Afrobeat",
    user: "Tobe",
    location: "Nigeria, Africa",
  },
  {
    link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F675062333&show_artwork=true",
    genre: "R&B",
    user: "Gabrielle",
    location: "Houston, TX, USA",
  },
  {
    link: "https://open.spotify.com/embed/track/56xZjKy9eGabvEOh5WOM1v?si=dc30a0b74aeb48c0&utm_source=oembed",
    genre: "Rock",
    user: "Sebastian",
    location: "Sydney, Australia",
  },
  {
    link: "https://www.youtube.com/embed/0ero1Xexyhs",
    genre: "Rap",
    user: "Michael",
    location: "Buffalo, NY, USA",
  },
  {
    link: "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1033771624&show_artwork=true",
    genre: "Rap",
    user: "Julia",
    location: "Atlanta, GA, USA",
  },
  {
    link: "https://open.spotify.com/embed/track/0vFOzaXqZHahrZp6enQwQb?si=1a3d3f0ae1e84b80&utm_source=oembed",
    genre: "Rock",
    user: "Mateo",
    location: "Berlin, Germany",
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

  useEffect(() => {}, [dotIndex]);
  return (
    <>
      <CarouselContainer inProfile={inProfile}>
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
      <Details inProfile={inProfile}>
        <DetailText>
          <div>{`${songs[dotIndex].user} shared a song`}</div>
          <Circle />
          <Globe src={globe} />
          <div>{`${songs[dotIndex].location}`}</div>
        </DetailText>
        <Genre>{`${songs[dotIndex].genre}`}</Genre>
      </Details>
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
    </>
  );
};
export default Carousel;
