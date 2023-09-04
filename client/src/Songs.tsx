// songs a user has uploaded

import React from "react";
import styled from "styled-components";
import Carousel from "./Carousel";

interface Props {
  songs: [];
  username: string;
}
// song is blank: blank background-color: rgb(93, 93, 255);
export const ProfileItemContainer = styled.div`
  max-width: 560px;
  height: 353px;
  max-height: 353px;
  width: 100%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    left: unset;
  }
`;

export const NoSongContainer = styled.div`
  border-radius: 4px;
  max-width: 560px;
  max-height: 355px;
  height: 355px;
  // background-color: #eef2ff;
  background-color: rgb(93, 93, 255);
  color: white;
  width: 100%;
  border: 1px solid rgb(102, 112, 133);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoSong = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 20px;
  font-weight: bold;
  padding: 12px;
`;

const Songs: React.FC<Props> = ({songs, username}) => {
  return (
    <>
      {songs.length > 0 ? (
        <ProfileItemContainer>
          <Carousel songs={songs} inProfile={true} />
        </ProfileItemContainer>
      ) : (
        <NoSongContainer>
          <NoSong>no shared songs yet</NoSong>
        </NoSongContainer>
      )}
    </>
  );
};
export default Songs;
