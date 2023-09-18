import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {Song} from "./types/types";
import {SERVER_ENDPOINT} from "./constants";
import axios from "axios";
import SongItem from "./SongItem";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase-config";
import LoopyLogo from "./LoopyLogo";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px;
`;

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

  &:hover {
    color: rgb(93, 93, 255);
    cursor: pointer;
  }
`;

export const MenuRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const linkStyle = {
  textDecoration: "none",
};

const SongViewer = () => {
  const params = useParams();
  const hash = params.hash || "";
  const [user] = useAuthState(auth);
  const [song, setSong] = useState<Song>({
    link: "",
    genre: "",
    user: "",
    location: "",
    created_at: "",
    hash: hash,
  });

  useEffect(() => {
    const fetchSong = async () => {
      const response = await axios.get(`${SERVER_ENDPOINT}/get_song/${hash}`);
      const data = response.data;
      setSong(data[0]);
    };
    fetchSong();
  }, [hash]);
  return (
    <div>
      <MenuHeader>
        <LoopyLogo />
        {user ? (
          <MenuRow>
            <MenuItems>
              <Link to="/" style={linkStyle}>
                <MenuItem>Home</MenuItem>
              </Link>
            </MenuItems>
          </MenuRow>
        ) : (
          <MenuRow>
            <MenuItems>
              <Link to="/signup" style={linkStyle}>
                <MenuItem>Sign up</MenuItem>
              </Link>
            </MenuItems>
            <MenuItems>
              <Link to="/login" style={linkStyle}>
                <MenuItem>Login</MenuItem>
              </Link>
            </MenuItems>
          </MenuRow>
        )}
      </MenuHeader>
      <Container>{song && <SongItem song={song} inProfile={true} />}</Container>
      ;
    </div>
  );
};
export default SongViewer;
