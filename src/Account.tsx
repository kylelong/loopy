import React, {useState, useEffect} from "react";
import {doc, updateDoc, getFirestore, getDoc} from "firebase/firestore";
import Autocomplete from "react-google-autocomplete";
import ReactSearchBox from "react-search-box";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, app} from "./firebase-config";
import LoopyLogo from "./LoopyLogo";
import genres from "./genres";
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

export const Header = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-weight: bold;
  margin-bottom: 12px;
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

interface User {
  currentFavoriteSong: string;
  email: string;
  favoriteArtist: string;
  favoriteGenre: string;
  favoriteSong: string;
  location: string;
  uid: string;
  username: string;
}

const Account = () => {
  const [user] = useAuthState(auth);
  const db = getFirestore(app);
  const validGenres = genres.map((d) => d.value);
  const [userData, setUserData] = useState<User>({
    currentFavoriteSong: "",
    email: "",
    favoriteArtist: "",
    favoriteGenre: "",
    favoriteSong: "",
    location: "",
    uid: "",
    username: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    if (user) {
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as User;
        setUserData(data);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

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

  const handleGenreChange = (value: string) => {
    console.log(value);
    // setSongData({...songData, genre: value});
    if (!validGenres.includes(value)) {
      //   setError(true);
    } else {
      //   setError(false);
    }
  };

  const handleSearch = (selected: any) => {
    const {item} = selected;
    console.log(item.value);
    // setSongData({...songData, genre: item.value});
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
        <Header>Edit Profile</Header>
        <InputContainer>
          <Label>Username</Label>
          <InputBox type="text" placeholder={userData.username} />
        </InputContainer>
        <InputContainer>
          <Label>Location</Label>
          <StyledAutoComplete
            apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
            placeholder={userData.location}
            onPlaceSelected={(place: string) => {
              console.log(place);
            }}
          />
        </InputContainer>

        <InputContainer>
          <Label>Favorite Genre</Label>
          {/* <InputBox type="text" placeholder={userData.favoriteGenre} /> */}
          <StyledSearchBox
            placeholder={userData.favoriteGenre}
            data={genres}
            onSelect={handleSearch}
            onChange={handleGenreChange}
            autoFocus
          />
        </InputContainer>

        {/* <StyledSearchBox
          placeholder={userData.favoriteGenre}
          data={genres}
          onSelect={handleSearch}
          onChange={handleGenreChange}
          autoFocus
        /> */}

        <InputContainer>
          <Label>Favorite Artist</Label>
          <InputBox type="text" placeholder={userData.favoriteArtist} />
        </InputContainer>
        <InputContainer>
          <Label>Favorite Song</Label>
          <InputBox type="text" placeholder={userData.favoriteSong} />
        </InputContainer>
        <InputContainer>
          <Label>Favorite Current Song</Label>
          <InputBox type="text" placeholder={userData.currentFavoriteSong} />
        </InputContainer>
        <SaveButton>Save</SaveButton>
      </AccountContainer>
    </div>
  );
};
export default Account;
