import React from "react";
import styled from "styled-components";
import {Song} from "./types/types";
import Carousel from "./Carousel";

interface Props {
  songs: Song[];
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

export const NoSongs = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 22px;
  font-weight: bold;
  padding: 12px;
`;

const LikedSongs: React.FC<Props> = ({songs}) => {
  return (
    <>
      {songs && songs.length > 0 ? (
        <Carousel songs={songs} inProfile={true} />
      ) : (
        <ProfileItemContainer>
          <NoSongs>no liked songs yet</NoSongs>
        </ProfileItemContainer>
      )}
    </>
  );
};
export default LikedSongs;
