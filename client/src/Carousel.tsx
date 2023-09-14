import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import arrowLeft from "./assets/arrowLeft.svg";
import arrowRight from "./assets/arrowRight.svg";
import globe from "./assets/globe.svg";
import * as timeago from "timeago.js";
import {Song} from "./types/types";
import {SITE_URL} from "./constants";
import CopyToClipboard from "react-copy-to-clipboard";
import {CheckCircledIcon} from "@radix-ui/react-icons";

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
  margin-bottom: 12px;
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
  align-self: flex-start;
  margin-top: 10px;
  color: rgb(93, 93, 255);
  background-color: #eef2ff;
  border: 0;
  border-radius: 5px;
  height: 100%;
  padding: 12px;
  @media (min-width: 560px) {
    width: 560px;
  }
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
  top: 6px;
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
  const [timestamp, setTimeStamp] = useState<string>("");
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const timerRef = useRef(0);
  const [shareUrl, setShareUrl] = useState<string>("");

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
  const handleShareLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.clearTimeout(timerRef.current);
    setShowCopied(true);
    timerRef.current = window.setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };
  // happy house
  // https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F16959100&show_artwork=true

  useEffect(() => {
    let postedDate = new Date(`${songs[dotIndex].created_at}`);
    setTimeStamp(timeago.format(postedDate));
    if (songs) {
      setShareUrl(`${SITE_URL}/song/${songs[dotIndex].hash}`);
    }
  }, [dotIndex, songs]);
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
        <GenreBox>{`${songs[dotIndex].genre}`}</GenreBox>
      </Details>
      <SongDetails inProfile={inProfile}>
        <div style={{display: "flex", flexDirection: "row"}}>
          <Genre>{`${songs[dotIndex].genre}`}</Genre>
          <Dot></Dot>
          <Time>{timestamp}</Time>
        </div>
        <CopyContainer>
          <CopyToClipboard text={shareUrl}>
            <Share onClick={handleShareLink}>share</Share>
          </CopyToClipboard>
          {showCopied && (
            <ShowCopyContainer>
              <CheckCircledIcon
                style={{marginLeft: "3px", marginTop: "3px", color: "green"}}
              />
              <CopiedMessage>copied to clipboard</CopiedMessage>
            </ShowCopyContainer>
          )}
        </CopyContainer>
      </SongDetails>

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
