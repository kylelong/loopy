import React from "react";
import styled from "styled-components";

interface Props {
  favorite_artist: string;
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

export const Artist = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 42px;
  font-weight: bold;
`;

export const NoArtist = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 20px;
  font-weight: bold;
  padding: 12px;
`;

const FavoriteArist: React.FC<Props> = ({favorite_artist, username}) => {
  return (
    <>
      <ProfileItemContainer>
        {favorite_artist.length > 0 ? (
          <Artist>{favorite_artist}</Artist>
        ) : (
          <NoArtist>
            @{username} has not shared their favorite artist yet
          </NoArtist>
        )}
      </ProfileItemContainer>
    </>
  );
};
export default FavoriteArist;
