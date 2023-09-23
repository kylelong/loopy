import React, {useState, useEffect, useCallback, useRef} from "react";
import styled from "styled-components";
import globe from "./assets/globe.svg";
import "./tidal.css";
import * as timeago from "timeago.js";
import {Song} from "./types/types";
import {NOTIFICATION_TYPES, SERVER_ENDPOINT, SITE_URL} from "./constants";
import axios from "axios";
import {Link} from "react-router-dom";
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase-config";
import heart from "./assets/heart.svg";
import heartBlank from "./assets/heartBlank.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 560px;
  height: 353px;
  max-height: 353px;
  margin-top: 24px;
  padding: 0 7px;
  border-radius: 12px;
`;

export const TidalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 560px;
  height: 100px;
  max-height: 100px;
  margin-top: 24px;
  margin-bottom: 32px;
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

export const SongDetails = styled.div<Props>`
  display: flex;
  flex-direction: column;
  color: rgb(93, 93, 255);
  background-color: #eef2ff;
  border: 0;
  border-radius: 5px;
  min-height: 31px;
  width: 96vw;
  max-width: 542px;
  margin: ${(props) =>
    props.inProfile ? "10px 10px 5px 10px" : "10px 10px 20px 10px"};
  padding: 5px 7px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CaptionContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => (props.editCaption ? "0px" : "9px")};
`;

export const Caption = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  margin-top: 3px;
`;

export const EditInput = styled.input`
  max-width: 256px;
  width: 100%;
  height: 20px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;
  border: 1.5px solid #d1d5db;
  border-radius: 3px;
  padding-left: 0.5rem;
  margin-bottom: 5px;
  &:focus {
    outline: none;
    border-color: rgb(93, 93, 255);
  }
`;

export const EditButton = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 6px;
  font-size: 15px;
  color: rgb(93, 93, 255);
  font-family: "Helvetica Neue", sans-serif;
  width: 65px;
  border: 0 !important;
  background: #d1d5db;
  border-radius: 5px;
  font-weight: bold;
  padding: 1px;
  &:hover {
    cursor: pointer;
  }
`;

export const UserRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 7px;
`;

export const LocationRow = styled.div`
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
  right: 5px;
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
  border: 0 !important;
  background: #d1d5db;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

export const CopyContainer = styled.div<Props>`
  display: ${(props) => (props.inProfile ? "flex" : "none")};
  flex-direction: row;
  margin-bottom: 4px;
  margin-top: 4px;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

export const Heart = styled.img<Props>`
  display: ${(props) => (props.showHeart ? "flex" : "none")};
  width: 1.7rem;
  margin-right: 12px;
  position: relative;
  top: 5px;
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  song?: Song;
  inProfile?: boolean;
  showHeart?: boolean;
}

interface StyleProps {
  editCaption: boolean;
}

const SongItem: React.FC<Props> = ({
  song,
  inProfile = false,
  showHeart = true,
}) => {
  const [timestamp, setTimeStamp] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [profileLink, setProfileLink] = useState<string>("");
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const [caption, setCaption] = useState<string | undefined>("");
  const [editCaption, setEditCaption] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);
  const timerRef = useRef(0);
  const [user] = useAuthState(auth);
  const uid = user?.uid;

  const share_url = `${SITE_URL}/song/${song?.hash}`;

  const handleCaption = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: length <= 200
    e.preventDefault();
    let caption = e.target.value;
    setCaption(caption);
  };

  const updateCaption = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (editCaption) {
      // api call

      try {
        await axios.put(`${SERVER_ENDPOINT}/update_caption`, {
          caption: caption,
          hash: song?.hash,
        });
      } catch (err) {
        console.error(err);
      }
    }
    setEditCaption(!editCaption);
  };

  const getUsername = useCallback(async () => {
    try {
      const response = await axios.get(
        `${SERVER_ENDPOINT}/get_username/${song?.user}`
      );
      setUsername(response.data);
      setProfileLink(`/${response.data}`);
    } catch (err) {
      console.error(err);
    }
  }, [song?.user]);

  const handleShareLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.clearTimeout(timerRef.current);
    setShowCopied(true);
    timerRef.current = window.setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  const handleLike = async () => {
    // if already like
    if (!like) {
      // like a song
      await axios.post(`${SERVER_ENDPOINT}/add_like`, {
        uid: user?.uid,
        song_id: song?.id,
        song_hash: song?.hash,
      });

      // if (user && user?.uid !== song?.user) {
      //   await axios.post(`${SERVER_ENDPOINT}/send_notification`, {
      //     sender_uid: user?.uid,
      //     receiver_uid: song?.user,
      //     type: NOTIFICATION_TYPES.LIKE,
      //   });
      // }
    } else {
      // dislike a song
      await axios.delete(`${SERVER_ENDPOINT}/remove_like`, {
        data: {
          uid: user?.uid,
          song_id: song?.id,
          song_hash: song?.hash,
        },
      });

      // if (user?.uid !== song?.user) {
      //   await axios.delete(`${SERVER_ENDPOINT}/unsend_notification`, {
      //     data: {
      //       sender_id: user?.uid,
      //       receiver_id: song?.user,
      //       type: NOTIFICATION_TYPES.LIKE,
      //     },
      //   });
      // }
    }
    setLike(!like);
  };

  useEffect(() => {
    const getLike = async () => {
      const response = await axios.get(`${SERVER_ENDPOINT}/get_like`, {
        params: {
          uid: user?.uid,
          song_hash: song?.hash,
        },
      });
      const data = response.data;
      setLike(data && data.id);
    };
    if (user) {
      getLike();
    }
    getUsername();
    let postedDate = new Date(`${song?.created_at}`);
    setTimeStamp(timeago.format(postedDate));
    setCaption(song?.caption);
  }, [song, username, getUsername, song?.created_at, user, like]);
  return (
    <div>
      {song?.source === "tidal" ? (
        <TidalContainer>
          <div className="tidal-border">
            <iframe
              src={song?.link}
              allowFullScreen
              frameBorder="0"
              title="tidal song"
              className="tidal-embed-iframe"
            ></iframe>
          </div>
        </TidalContainer>
      ) : (
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
            src={song?.link}
          ></SongContainer>
        </Container>
      )}

      <SongDetails inProfile={inProfile}>
        <Row>
          <UserRow>
            <Link to={profileLink} style={linkStyle}>
              <Username>
                {song?.onLandingPage ? song?.user : `@${username}`}
              </Username>
            </Link>
            <Dot></Dot>
            <Genre>{`${song?.genre}`}</Genre>
          </UserRow>

          {user && uid === song?.user && (
            <EditButton onClick={updateCaption}>
              {editCaption ? "save" : "edit"}
            </EditButton>
          )}
        </Row>
        {((caption && caption.length > 0) || editCaption) && (
          <CaptionContainer editCaption={editCaption}>
            {!editCaption && <Caption>{caption}</Caption>}
            {editCaption && (
              <EditInput onChange={handleCaption} value={caption} />
            )}
          </CaptionContainer>
        )}
        <LocationRow>
          {song?.location && (
            <LocationContainer>
              <Globe src={globe} />
              <Location>{`${song?.location}`}</Location>
            </LocationContainer>
          )}
        </LocationRow>
        <Time>{timestamp}</Time>
        <ButtonRow>
          <CopyContainer inProfile={inProfile}>
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
          {like ? (
            <Heart src={heart} onClick={handleLike} showHeart={showHeart} />
          ) : (
            <Heart
              src={heartBlank}
              onClick={handleLike}
              showHeart={showHeart}
            />
          )}
        </ButtonRow>
      </SongDetails>
    </div>
  );
};
export default SongItem;
