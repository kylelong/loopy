import React, {useState, useEffect} from "react";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import ReactSearchBox from "react-search-box";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase-config";
import {SERVER_ENDPOINT} from "./constants";
import LoopyLogo from "./LoopyLogo";
import genres from "./genres";
import styled from "styled-components";
import {updateProfile} from "firebase/auth";
import {error} from "console";

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
  location: string;
  uid: string;
  username: string;
}

const Account = () => {
  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const validGenres = genres.map((d) => d.value);
  const [hasTyped, setHasTyped] = useState<boolean>(false);
  const [hasNullUsername, setHasNullUsername] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [userData, setUserData] = useState<User>({
    current_favorite_song: "",
    email: "",
    favorite_artist: "",
    favorite_genre: "",
    favorite_song: "",
    location: "",
    uid: "",
    username: "",
  });

  const logout = () => {
    auth.signOut();
  };

  // fetchUserData();
  // isUsernameNull();
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const response = await axios.get(`${SERVER_ENDPOINT}/user_data/${uid}`);
        console.log(response.data);
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
  }, []);

  /**
   * REGEX
   */
  const validUsername = (username: string) => {
    const regex = /^[a-z]{2,30}$/;
    return regex.test(username);
  };

  //TODO: put these in functions.ts for share page

  const validSpotifyLink = (link: string) => {
    const regex = /https:\/\/open\.spotify\.com\/track\/.*\?si=.+/;
    return regex.test(link);
  };

  const validSoundCloundLink = (link: string) => {
    const regexOne = /https:\/\/on\.soundcloud\.com\/.+/;
    const regexTwo = /https:\/\/soundcloud\.com\/.+/;

    return regexOne.test(link) || regexTwo.test(link);
  };

  const validYoutubeLink = (link: string) => {
    /**
     * https://youtu.be/QlJ3s9TNcuM?si=LudEkdLK59oeAK2J
     * https://www.youtube.com/watch?v=QlJ3s9TNcuM&list=WL&index=6
     * https://youtu.be/yEMZCwftYXM?si=9U9Ces-HxQYh96nQ
     */
    const regexOne = /https:\/\/youtu\.be\/.+\?si=.+/;
    const regexTwo = /https:\/\/www.youtube\.com\/watch\?v=.+/;
    return regexOne.test(link) || regexTwo.test(link);
  };

  /**
   * TODO: check if it does not exists
   * must be at least 2 characters
   */
  const updateUsername = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTyped(true);
    setUserData({...userData, username: event.target.value.toLowerCase()});
  };

  const updateLocation = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTyped(true);
    setUserData({...userData, location: event.target.value});
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

  // TODO: make sure genre is right
  const handleGenreChange = (value: string) => {
    setHasTyped(true);
    setUserData({...userData, favorite_genre: value});
  };

  const handleSearch = (selected: any) => {
    const {item} = selected;

    setUserData({...userData, favorite_genre: item.value});
  };

  const updateProfile = () => {
    setErrors([]);
    let hasErrors = false;
    // username
    const {
      username,
      location,
      current_favorite_song,
      favorite_artist,
      favorite_genre,
      favorite_song,
    } = userData;
    if (username) {
      console.log(
        username,
        username.length > 0 && validUsername(username) === false
      );
      if (
        (username.length > 0 && validUsername(username) === false) ||
        (!hasNullUsername && username.length === 0)
      ) {
        hasErrors = true;
        setErrors((errors) => [
          ...errors,
          "Username must be between 2 and 30 letters long",
        ]);
      }
    }

    if (
      favorite_genre &&
      favorite_genre.length > 0 &&
      !validGenres.includes(favorite_genre)
    ) {
      hasErrors = true;
      setErrors((errors) => [
        ...errors,
        "Pleae select a genre from the dropdown list",
      ]);
    }

    //genre

    /**
     *
     * USERNAME: if username in db is null then it can stay blank
     *            but once a user has a username or tries to set one initially it must be >= len(2) (error)
     * GENRE: must be a valid genre (error)
     * (CURRENT) FAVORITE SONG: must be a link (song from youtube, soundcloud, spotify)
     * FORMATS
     *
     * youtube
     *
     * https://youtu.be/QlJ3s9TNcuM?si=LudEkdLK59oeAK2J
     * https://www.youtube.com/watch?v=QlJ3s9TNcuM&list=WL&index=6
     * https://youtu.be/yEMZCwftYXM?si=9U9Ces-HxQYh96nQ
     *
     * https://open.spotify.com/track/7IKjVU6N4gATDekKY6itMO?si=b91a17f998c046c2
     * https://open.spotify.com/track/0wshkEEcJUQU33RSRBb5dv?si=adac0ab467eb4fec
     * https://open.spotify.com/track/4CajAqrgmTEYZBsM0GzWFh?si=XHdYUkCmRYWpczUiHowsaw&context=spotify%3Aalbum%3A5OsHMGOg6lRV9REoVxbcWA
     *
     * soundcloud
     * https://soundcloud.com/soundalivestudios/choppas-on-deck-asap-ferg?si=5a93b52ec1674fc683cf52ef641d4ac3&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
     * https://on.soundcloud.com/SFnKf
     *
     * https://soundcloud.com/thewebbyawards/the-juan-maclean-happy-house?si=863ef469d091496fa1b97a8999f7a1cb&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
     * https://on.soundcloud.com/rnvcZ
     *
     * https://soundcloud.com/[a-z]+/[a-z]+?si=[a-z0-9]&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
     */

    if (!hasErrors) {
      console.log("UPDATING PROFILE...");
      // TODO: backend calls to update everything
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
      <AccountContainer>
        {JSON.stringify(userData, null, 2)}
        <Header>Edit Profile</Header>

        <InputContainer>
          <Label>Username</Label>
          <InputBox
            type="text"
            value={userData.username}
            onChange={updateUsername}
          />
        </InputContainer>

        <InputContainer>
          <Label>Location</Label>
          <StyledAutoComplete
            apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
            defaultValue={userData.location}
            onPlaceSelected={(place: string) => {
              console.log(place);
            }}
            onChange={updateLocation}
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
            value={userData.favorite_artist}
            onChange={updateArtist}
          />
        </InputContainer>

        <InputContainer>
          <Label>Favorite Song</Label>
          <InputBox
            type="text"
            value={userData.favorite_song}
            onChange={updateSong}
          />
        </InputContainer>
        <InputContainer>
          <Label>Favorite Current Song</Label>
          <InputBox
            type="text"
            value={userData.current_favorite_song}
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
