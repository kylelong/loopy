import React, {useState, useEffect, useCallback} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {validUsername, userExists} from "./functions";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase-config";
import LoopyLogo from "./LoopyLogo";
import globe from "./assets/globe.svg";
import axios from "axios";
import {SERVER_ENDPOINT} from "./constants";
import star from "./assets/star.svg";
import FavoriteSongs from "./FavoriteSongs";
import FavoriteArtist from "./FavoriteArtist";
import Songs from "./Songs";
import {Song} from "./types/types";
import Carousel from "./Carousel";

/* invalid username / 404 styles */
export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 10px;
`;

export const ErrorCode = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 900;
  font-size: 3rem;
  letter-spacing: 2px;
  line-height: 1;
  margin-bottom: 24px;
`;

export const Message = styled.div`
  font-size: 18px;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: light;
  margin-bottom: 24px;
`;
export const HomeButton = styled.button`
  height: 45px;
  display: flex;
  align-items: center;
  padding: 20px;
  max-width: 100px;
  width: 100%;
  border: 0px;
  border-radius: 3px;
  background: rgb(93, 93, 255);
  color: white;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 15px;
  text-align: center;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
export const EditButton = styled.button`
  height: 34px;
  max-width: 124px;
  flex: none;
  box-sizing: border-box;
  width: 100%;
  border: 0px;
  border-radius: 20px;
  background: rgb(93, 93, 255);
  color: white;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 15px;
  text-align: center;
  opacity: 1;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const ProfileContainer = styled.div`
  margin: 24px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileIcon = styled.div`
  margin-bottom: 10px;
  display: flex;
  background: rgb(93, 93, 255);
  // background: #6e79d6;
  color: white;
  font-size: 30px;
  width: 75px;
  height: 75px;
  text-align: center;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: light;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const Username = styled.div`
  margin-bottom: 3px;
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
`;
export const LocationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Svg = styled.img`
  width: 1.2rem;
  margin-bottom: 5px;
  margin-right: 2px;
`;
export const Location = styled.div`
  margin-bottom: 3px;
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
`;
export const GenreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Genre = styled.div`
  margin-bottom: 3px;
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
`;
export const linkStyle = {
  textDecoration: "none",
};

export const ProfileMenu = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
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
  margin-right: 24px;

  &:hover {
    color: rgb(93, 93, 255);
    cursor: pointer;
  }
`;

export const ProfileItem = styled.div`
  height: 56px;
  max-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: rgb(93, 93, 255);
  background-color: #eef2ff;
  border: 0;
  border-radius: 5px;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 15px;
  margin-right: 24px;
  text-align: center;
  opacity: 1;
  @media (min-width: 767px) {
    height: 34px;
  }
`;

export const ProfileItemInactive = styled.div`
  height: 56px;
  max-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: rgb(93, 93, 255);

  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 15px;
  margin-right: 24px;
  text-align: center;
  opacity: 1;
  &:hover {
    cursor: pointer;
    border: 0px;
    border-radius: 5px;
    background-color: #eef2ff;
  }
  @media (min-width: 767px) {
    height: 34px;
  }
`;

export const ProfileItemContainer = styled.div`
  border-radius: 4px;
  max-width: 560px;
  max-height: 355px;
  height: 355px;
  background-color: #eef2ff;
  width: 100%;
  border: 1px solid rgb(102, 112, 133);
  border-radius: 12px;
`;

export const Heart = styled.img`
  width: 1.7rem;
  margin-right: 12px;
  position: relative;
  top: 11px;
`;

// WILL BE ABLE TO GET SONGS FROM UID CAUSE FETCHDATA() SETS USERDATA.UID
interface User {
  current_favorite_song: string;
  location: string;
  favorite_artist: string;
  favorite_genre: string;
  favorite_song: string;
  uid: string;
  username: string;
}

export const Profile = () => {
  const params = useParams();
  const pathname = window.location.pathname;
  let defaultMenuIndex = 0;
  if (pathname.substring(pathname.lastIndexOf("/") + 1) === "likes") {
    defaultMenuIndex = 3;
  }
  const username = params.username || "";
  const [user] = useAuthState(auth);
  const uid = user?.uid; // LOGGED IN USER

  const [pageNotFound, setPageNotFound] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>({
    current_favorite_song: "",
    location: "",
    favorite_artist: "",
    favorite_genre: "",
    favorite_song: "",
    uid: "",
    username: "",
  });
  const [menuIndex, setMenuIndex] = useState<number>(defaultMenuIndex);
  const [songs, setSongs] = useState<[]>([]);
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const menuItems = ["Songs", "Favorite Songs", "Favorite Artist", "Likes"];
  const logout = () => {
    auth.signOut();
    window.location.href = "/";
  };
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${SERVER_ENDPOINT}/user_data/${username}`
      );
      setUserData(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [username]);

  const fetchSongs = useCallback(async () => {
    try {
      const uid = userData.uid;
      if (uid) {
        const response = await axios.get(
          `${SERVER_ENDPOINT}/get_user_songs/${uid}`
        );
        setSongs(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [userData.uid]);

  const fetchLikedSongs = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER_ENDPOINT}/get_user_likes`, {
        params: {
          uid: user?.uid,
        },
      });
      const data = response.data;
      setLikedSongs(data);
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    if (!validUsername(username)) {
      setPageNotFound(true);
    } else {
      userExists(username).then((result) => {
        if (!result) {
          setPageNotFound(true);
        } else {
          fetchUserData();
        }
      });
    }
    fetchSongs();
    fetchLikedSongs();
  }, [username, fetchUserData, fetchSongs, user, fetchLikedSongs]);

  return (
    <div>
      {!pageNotFound ? (
        <div>
          <MenuHeader>
            <LoopyLogo />
            {user && (
              <MenuItems>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuItems>
            )}
          </MenuHeader>
          <ProfileContainer>
            <ProfileIcon>
              {params.username?.charAt(0).toLocaleUpperCase()}
            </ProfileIcon>
            <ProfileInfo>
              <Username>@{params.username}</Username>
              {userData.location && (
                <LocationContainer>
                  <Svg src={globe} />
                  <Location>{userData.location}</Location>
                </LocationContainer>
              )}
              {userData.favorite_genre && (
                <GenreContainer>
                  <Svg src={star} />
                  <Genre>{userData.favorite_genre}</Genre>
                </GenreContainer>
              )}
              {uid === userData.uid && (
                <Link to="/account" style={linkStyle}>
                  <EditButton>Edit Profile</EditButton>
                </Link>
              )}
            </ProfileInfo>
            <ProfileMenu>
              {menuItems.map((el, index) => {
                return menuIndex === index ? (
                  <>
                    <ProfileItem key={index}>{el}</ProfileItem>
                  </>
                ) : (
                  <ProfileItemInactive
                    onClick={() => setMenuIndex(index)}
                    key={index}
                  >
                    {el}
                  </ProfileItemInactive>
                );
              })}
            </ProfileMenu>
            {menuIndex === 0 && (
              <Songs songs={songs} username={userData.username} />
            )}
            {menuIndex === 1 && (
              <FavoriteSongs
                current_favorite_song={userData.current_favorite_song}
                favorite_song={userData.favorite_song}
                username={userData.username}
              />
            )}
            {menuIndex === 2 && (
              <FavoriteArtist
                username={userData.username}
                favorite_artist={userData.favorite_artist}
              />
            )}
            {menuIndex === 3 && (
              <div
                style={{
                  display: "flex",
                }}
              >
                <Carousel songs={likedSongs} inProfile={true} />
              </div>
            )}
          </ProfileContainer>
        </div>
      ) : (
        <div>
          <NotFoundContainer>
            <LoopyLogo />
            <ErrorCode>404</ErrorCode>
            <Message>Page Not Found</Message>
            <Link to="/" style={linkStyle}>
              <HomeButton>Home</HomeButton>
            </Link>
          </NotFoundContainer>
        </div>
      )}
    </div>
  );
};

export default Profile;
