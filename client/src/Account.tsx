import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import ReactSearchBox from "react-search-box";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase-config";
import {SERVER_ENDPOINT} from "./constants";
import LoopyLogo from "./LoopyLogo";
import genres from "./genres";
import styled from "styled-components";
import {
  validSoundCloudLink,
  validSpotifyLink,
  validYoutubeLink,
  validUsername,
  userExists,
} from "./functions";

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

export const Header = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-weight: bold;
  margin-bottom: 24px;
  font-size: 22px;
`;

export const Label = styled.label`
  font-family: "Helvetica Neue", sans-serif;
  margin-bottom: 6px;
  color: #9ca3af;
  font-weight: bold;
  font-size: 16px;
`;

export const InputBox = styled.input`
  max-width: 256px;
  //   width: 100%;
  //   height: 40px;
  //   font-family: sans-serif;
  //   font-size: 14px;
  //   font-weight: 400;
  //   border: 1.5px solid #d1d5db;
  //   border-radius: 3px;
  padding-left: 1rem;
  &:focus {
    outline: none;
    border-color: rgb(93, 93, 255);
  }

  font-size: 14px;
  padding: 10px 20px;
  height: 40px;
  border: 1px solid #cacaca96;
  border-radius: 5px;
  color: #000;
  background-color: #fff;
  width: 100%;
`;

export const StyledAutoComplete = styled(Autocomplete)`
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

export const StyledSearchBox = styled(ReactSearchBox)`
  max-width: 256px;
  width: 100%;
  height: 40px;
  font-family: "Helvetica Neue", sans-serif;
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
export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  height: 42px;
  max-width: 120px;
  width: 100%;
  border: 0px;
  border-radius: 4px;
  background-color: rgb(93, 93, 255);
  font-weight: bold;
  color: white;
  font-family: sans-serif;
  font-size: 16px;
  text-align: center;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  margin-top: 22px;
`;

export const linkStyle = {
  textDecoration: "none",
};

export const disabledButton = {
  opacity: 0.3,
};

export const enabledButton = {
  opacity: 1,
};

export const ErrorList = styled.ul`
  text-align: left;
  font-family: "Helvetica Neue", sans-serif;
  margin-top: 12px;
  margin-bottom: 12px;
`;

interface User {
  current_favorite_song: string;
  email: string;
  favorite_artist: string;
  favorite_genre: string;
  favorite_song: string;
  uid: string;
  username: string;
}

const Account = () => {
  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const validGenres = genres.map((d) => d.value);
  const [hasTyped, setHasTyped] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [hasNullUsername, setHasNullUsername] = useState<boolean>(false);
  const [profileLink, setProfileLink] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [userData, setUserData] = useState<User>({
    current_favorite_song: "",
    email: "",
    favorite_artist: "",
    favorite_genre: "",
    favorite_song: "",
    uid: "",
    username: "",
  });

  const logout = () => {
    auth.signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const response = await axios.get(
          `${SERVER_ENDPOINT}/user_data_from_uid/${uid}`
        );
        const {location, username} = response.data;
        setLocation(location);
        setCurrentUsername(username);
        setProfileLink(`/${username}`);
        setUserData(response.data);
      }
    };

    const isUsernameNull = async () => {
      if (user) {
        const response = await axios.get(
          `${SERVER_ENDPOINT}/is_username_null/${uid}`
        );
        setHasNullUsername(response.data);
      }
    };
    fetchUserData();
    isUsernameNull();
  }, [uid, user]);

  /**
   * REGEX
   */

  const updateUsername = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTyped(true);
    setUserData({...userData, username: event.target.value.toLowerCase()});
  };

  const updateLocation = async (location: any) => {
    setHasTyped(true);
    let place = location as string;
    setLocation(place);
  };

  const updateArtist = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTyped(true);
    setUserData({...userData, favorite_artist: event.target.value});
  };

  const updateSong = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTyped(true);
    setUserData({...userData, favorite_song: event.target.value});
  };

  const updateCurrentFavoriteSong = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasTyped(true);
    setUserData({...userData, current_favorite_song: event.target.value});
  };

  const handleGenreChange = (value: string) => {
    setHasTyped(true);
    setUserData({...userData, favorite_genre: value});
  };

  const handleSearch = (selected: any) => {
    const {item} = selected;

    setUserData({...userData, favorite_genre: item.value});
  };

  const updateProfile = async () => {
    setErrors([]);
    let hasErrors = false;
    // username
    const {
      username,
      current_favorite_song,
      favorite_genre,
      favorite_song,
      favorite_artist,
    } = userData;

    // username

    /**
     *
     * USERNAME:
     * if username in db is null then it can stay blank
     * but once a user has a username or tries to set one initially it must be >= len(2) (error)
     */
    if (username) {
      userExists(username)
        .then((exists) => {
          if (username !== currentUsername && exists) {
            hasErrors = true;
            setErrors((errors) => [
              ...errors,
              "This username is already taken.",
            ]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (
        (username.length > 0 && validUsername(username) === false) ||
        (!hasNullUsername && username.length === 0)
      ) {
        hasErrors = true;
        setErrors((errors) => [
          ...errors,
          "Username must be between 2 and 30 lowercase letters long.",
        ]);
      } else {
        if (hasErrors === false) {
        }
        try {
          await axios.put(`${SERVER_ENDPOINT}/update_username`, {
            username: username,
            uid: uid,
          });
          setCurrentUsername(username);
          setProfileLink(`/${username}`);
        } catch (err) {
          console.error(err);
        }
      }
    }

    // location
    if (location) {
      try {
        await axios.put(`${SERVER_ENDPOINT}/update_location`, {
          location: location,
          uid: uid,
        });
      } catch (err) {
        console.error(err);
      }
    }

    // genre
    if (favorite_genre) {
      if (favorite_genre.length > 0 && !validGenres.includes(favorite_genre)) {
        hasErrors = true;
        setErrors((errors) => [
          ...errors,
          "Pleae select a genre from the dropdown list.",
        ]);
      } else {
        try {
          await axios.put(`${SERVER_ENDPOINT}/update_favorite_genre`, {
            favorite_genre: favorite_genre,
            uid: uid,
          });
        } catch (err) {
          console.error(err);
        }
      }
    }

    // artist
    if (favorite_artist) {
      try {
        await axios.put(`${SERVER_ENDPOINT}/update_favorite_artist`, {
          favorite_artist: favorite_artist,
          uid: uid,
        });
      } catch (err) {
        console.error(err);
      }
    }

    //songs
    const validCurrentFavoriteSong =
      validSoundCloudLink(current_favorite_song) ||
      validSpotifyLink(current_favorite_song) ||
      validYoutubeLink(current_favorite_song);

    const validFavoriteSong =
      validSoundCloudLink(favorite_song) ||
      validSpotifyLink(favorite_song) ||
      validYoutubeLink(favorite_song);

    if (current_favorite_song) {
      if (current_favorite_song.length > 0 && !validCurrentFavoriteSong) {
        hasErrors = true;
        setErrors((errors) => [
          ...errors,
          "Current favorite song must be a valid link from youtube,soundcloud, or spotify.",
        ]);
      } else {
        try {
          await axios.put(`${SERVER_ENDPOINT}/update_current_favorite_song`, {
            current_favorite_song: current_favorite_song,
            uid: uid,
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
    if (favorite_song) {
      if (favorite_song.length > 0 && !validFavoriteSong) {
        hasErrors = true;
        setErrors((errors) => [
          ...errors,
          "Favorite song must be a valid link from youtube,soundcloud, or spotify.",
        ]);
      } else {
        try {
          await axios.put(`${SERVER_ENDPOINT}/update_favorite_song`, {
            favorite_song: favorite_song,
            uid: uid,
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  return (
    <div>
      <MenuHeader>
        <LoopyLogo />

        <MenuItems>
          <Link to={profileLink} style={linkStyle}>
            <MenuItem>Profile</MenuItem>
          </Link>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuItems>
      </MenuHeader>
      <AccountContainer>
        <Header>Edit Profile</Header>

        <InputContainer>
          <Label>Username</Label>
          <InputBox
            type="text"
            value={userData.username === null ? "" : userData.username}
            onChange={updateUsername}
          />
        </InputContainer>

        <InputContainer>
          <Label>Location</Label>
          <StyledAutoComplete
            apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
            defaultValue={location}
            onPlaceSelected={(place: any) => {
              updateLocation(place.formatted_address);
            }}
          />
        </InputContainer>

        <InputContainer>
          <Label>Favorite Genre</Label>
          {/* <InputBox type="text" value={userData.favoriteGenre} /> */}
          <StyledSearchBox
            placeholder={userData.favorite_genre}
            data={genres}
            onSelect={handleSearch}
            onChange={handleGenreChange}
            autoFocus
          />
        </InputContainer>

        <InputContainer>
          <Label>Favorite Artist</Label>
          <InputBox
            type="text"
            value={
              userData.favorite_artist === null ? "" : userData.favorite_artist
            }
            onChange={updateArtist}
          />
        </InputContainer>

        <InputContainer>
          <Label>Favorite Song</Label>
          <InputBox
            type="text"
            value={
              userData.favorite_song === null ? "" : userData.favorite_song
            }
            onChange={updateSong}
          />
        </InputContainer>
        <InputContainer>
          <Label>Favorite Current Song</Label>
          <InputBox
            type="text"
            value={
              userData.current_favorite_song === null
                ? ""
                : userData.current_favorite_song
            }
            onChange={updateCurrentFavoriteSong}
          />
        </InputContainer>
        {errors.length > 0 && (
          <ErrorList>
            {" "}
            {errors &&
              errors.map((error, item) => {
                return <li key={item}>{error}</li>;
              })}
          </ErrorList>
        )}

        <SaveButton
          style={!hasTyped ? disabledButton : enabledButton}
          disabled={!hasTyped}
          onClick={updateProfile}
        >
          Save
        </SaveButton>
      </AccountContainer>
    </div>
  );
};
export default Account;
