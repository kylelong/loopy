import React, {useState, useEffect, useCallback, useRef} from "react";
import styled from "styled-components";
import globe from "./assets/globe.svg";
import * as timeago from "timeago.js";
import {Song} from "./types/types";
import {SERVER_ENDPOINT, SITE_URL} from "./constants";
import axios from "axios";
import {Link} from "react-router-dom";
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {CopyToClipboard} from "react-copy-to-clipboard";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 560px;
  height: 353px;
  max-height: 353px;
  margin: auto;
  padding: 0 3px;
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
  flex-direction: column;
  margin-top: 10px;
  color: rgb(93, 93, 255);
  background-color: #eef2ff;
  border: 0;
  border-radius: 5px;
  min-height: 31px;
  height: 100%;
  padding: 6px;
  margin-bottom: 32px;
  width: 100vw;
  max-width: 560px;
  padding: 5px 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
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
  display: flex;
  align-items: center;
  margin-top: 6px;
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
  position: relative;
  top: 6px;
  padding-bottom: 6px;
`;

export const Location = styled.div`
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
  margin-right: 6px;
`;
export const linkStyle = {
  textDecoration: "none",
};
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
  song: Song;
}

const SongItem: React.FC<Props> = ({song}) => {
  const [timestamp, setTimeStamp] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [profileLink, setProfileLink] = useState<string>("");
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const timerRef = useRef(0);

  const share_url = `${SITE_URL}/song/${song.hash}`;

  const getUsername = useCallback(async () => {
    try {
      const response = await axios.get(
        `${SERVER_ENDPOINT}/get_username/${song.user}`
      );
      setUsername(response.data);
      setProfileLink(`/${response.data}`);
    } catch (err) {
      console.error(err);
    }
  }, [song.user]);

  const handleShareLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.clearTimeout(timerRef.current);
    setShowCopied(true);
    timerRef.current = window.setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  useEffect(() => {
    getUsername();
    let postedDate = new Date(`${song?.created_at}`);
    setTimeStamp(timeago.format(postedDate));
  }, [username, getUsername, song?.created_at]);
  return (
    <div>
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
      <Link to={profileLink} style={linkStyle}>
        <SongDetails>
          <Row>
            <Username>{`@${username}`}</Username>
            <Dot></Dot>
            <Genre>{`${song.genre}`}</Genre>
          </Row>

          {song.location && (
            <LocationContainer>
              <Globe src={globe} />
              <Location>{`${song.location}`}</Location>
            </LocationContainer>
          )}
          <Time>{timestamp}</Time>
          <CopyContainer>
            <CopyToClipboard text={share_url}>
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
      </Link>
    </div>
  );
};
export default SongItem;
