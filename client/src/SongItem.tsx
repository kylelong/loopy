import React, {useState, useEffect, useCallback} from "react";
import styled from "styled-components";
import globe from "./assets/globe.svg";
import * as timeago from "timeago.js";
import {Song} from "./types/types";
import {SERVER_ENDPOINT} from "./constants";
import axios from "axios";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 560px;
  height: 353px;
  max-height: 353px;
  width: 100%;
  border-radius: 12px;
`;

export const SongContainer = styled.iframe`
  max-width: 560px;
  width: 100%;
  height: 355px;
  max-height: 353px;
`;

export const Globe = styled.img`
  width: 1.2rem;
  margin-right: 2px;
`;

export const SongDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  margin-top: 10px;
  color: rgb(93, 93, 255);
  background-color: #eef2ff;
  border: 0;
  border-radius: 5px;
  height: 31px;
  padding: 6px;
  margin-bottom: 32px;
`;

export const Username = styled.div`
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
  margin-right: 6px;
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
  font-size: 12px;
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

export const LocationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Location = styled.div`
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
  margin-right: 6px;
`;

interface Props {
  song: Song;
}

const SongItem: React.FC<Props> = ({song}) => {
  const [timestamp, setTimeStamp] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const getUsername = useCallback(async () => {
    try {
      const response = await axios.get(
        `${SERVER_ENDPOINT}/get_username/${song.user}`
      );
      setUsername(`@${response.data}`);
    } catch (err) {
      console.error(err);
    }
  }, [song.user]);

  useEffect(() => {
    let postedDate = new Date(`${song?.created_at}`);
    setTimeStamp(timeago.format(postedDate));
    getUsername();
  }, [getUsername, song?.created_at, username]);
  return (
    <>
      <Container>
        <SongContainer
          title=""
          width="560"
          height="355"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{borderRadius: "12px"}}
          src={song.link}
        ></SongContainer>
      </Container>
      <SongDetails>
        <Username>{`${username}`}</Username>
        <Dot></Dot>
        <Genre>{`${song.genre}`}</Genre>

        {song.location && (
          <LocationContainer>
            <Dot></Dot>
            <Globe src={globe} />
            <Location>{`${song.location}`}</Location>
          </LocationContainer>
        )}
        <Time>{timestamp}</Time>
      </SongDetails>
    </>
  );
};
export default SongItem;
