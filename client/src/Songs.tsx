// songs a user has uploaded

import React from "react";
import styled from "styled-components";

interface Props {
  songs: [];
  username: string;
}
export const ProfileItemContainer = styled.div`
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

export const SongContainer = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 12px;
  font-weight: bold;
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
      <ProfileItemContainer>
        {songs.length > 0 ? (
          <SongContainer>{JSON.stringify(songs, null, 2)}</SongContainer>
        ) : (
          <NoSong>@{username} has not shared any songs yet</NoSong>
        )}
      </ProfileItemContainer>
    </>
  );
};
export default Songs;
