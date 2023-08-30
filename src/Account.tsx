import React from "react";
import {doc, updateDoc, getFirestore} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, app} from "./firebase-config";
import LoopyLogo from "./LoopyLogo";
import styled from "styled-components";

export const MenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 350px) {
    display: flex;
    flex-direction: column;
  }
`;

export const MenuItems = styled.div`
  display: flex;
  flex-direction: row;
  margin: 24px;
  position: relative;
  top: 5px;
  @media (max-width: 350px) {
    margin: 10px;
    position: relative;
    bottom: 5px;
    top: unset;
  }
`;

export const MenuItem = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  color: #9ca3af;
  font-weight: bold;
  font-size: 18px;
  margin-right: 24px;

  &:hover {
    color: rgb(93, 93, 255);
    cursor: pointer;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  max-width: 256px;
  width: 100%;
`;

export const Label = styled.label`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 14px;
  margin-bottom: 6px;
`;

export const InputBox = styled.input`
  max-width: 256px;
  width: 100%;
  height: 40px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;
  border: 1.5px solid #d1d5db;
  border-radius: 3px;
  padding-left: 1rem;
  &:focus {
    outline: none;
    border-color: rgb(93, 93, 255);
  }
`;

export const linkStyle = {
  textDecoration: "none",
};

const Account = () => {
  const [user] = useAuthState(auth);
  const db = getFirestore(app);

  const logout = () => {
    auth.signOut();
  };

  const updateLocation = async (location: string) => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      try {
        await updateDoc(userRef, {
          location: location,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  /**
   * TODO: check if it does not exists
   * must be at least 2 characters
   */
  const updateUsername = async (username: string) => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      try {
        await updateDoc(userRef, {
          username: username,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateGenre = async (genre: string) => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      try {
        await updateDoc(userRef, {
          favoriteGenre: genre,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateArtist = async (artist: string) => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      try {
        await updateDoc(userRef, {
          favoriteArtist: artist,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateSong = async (song: string) => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      try {
        await updateDoc(userRef, {
          favoriteSong: song,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateCurrentFavoriteSong = async (song: string) => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      try {
        await updateDoc(userRef, {
          currentFavoriteSong: song,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <MenuHeader>
        <LoopyLogo />
        <MenuItems>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuItems>
      </MenuHeader>
      <div>Edit Profile</div>

      <InputContainer>
        <Label>Username</Label>
        <InputBox type="text" />
      </InputContainer>

      <InputContainer>
        <Label>Location</Label>
        <InputBox type="text" />
      </InputContainer>

      <InputContainer>
        <Label>Favorite Genre</Label>
        <InputBox type="text" />
      </InputContainer>

      <InputContainer>
        <Label>Favorite Artist</Label>
        <InputBox type="text" />
      </InputContainer>

      <InputContainer>
        <Label>Favorite Song</Label>
        <InputBox type="text" />
      </InputContainer>

      <InputContainer>
        <Label>Favorite Current Song</Label>
        <InputBox type="text" />
      </InputContainer>
    </div>
  );
};
export default Account;
