import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./App.css";
import "./share.css";
import styled from "styled-components";
import axios from "axios";
import LoopyLogo from "./LoopyLogo";
// import refresh from "./assets/refresh.svg";
import {GlobeIcon, CheckCircledIcon} from "@radix-ui/react-icons";
import ReactSearchBox from "react-search-box";
import * as Dialog from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import genres from "./genres";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase-config";
import {SERVER_ENDPOINT} from "./constants";
import {
  validSoundCloudLink,
  validSpotifyLink,
  validYoutubeLink,
} from "./functions";

export const ShareContainer = styled.div``;

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

export const ModalContainer = styled.div`
  margin: 24px;
`;

export const MusicContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
export const SearchBox = styled.input`
  max-width: 360px;
  width: 100%;
  height: 38px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 4px;
  padding-left: 5px;
  margin-right: 5px;
  @media (max-width: 500px) {
    flex-direction: column;
    margin-bottom: 5px;
    max-width: 500px;
  }
`;

export const SearchButton = styled.button`
  height: 38px;
  max-width: 194px;
  width: 100%;
  border: 0px;
  border-radius: 4px;
  //background: #6e79d6;
  background: rgb(93, 93, 255);
  font-weight: bold;
  color: white;
  font-family: sans-serif;
  font-size: 16px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  height: 42px;
  max-width: 150px;
  width: 100%;
  border: 0px;
  border-radius: 4px;
  background-color: rgb(93, 93, 255);
  font-weight: bold;
  color: white;
  font-family: sans-serif;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;
export const Video = styled.iframe`
  border-radius: 4px;
  max-width: 560px;
  max-height: 355px;
  width: 100%;
  border: 1px solid rgb(102, 112, 133);
  border-radius: 12px;
`;

export const Spotify = styled.iframe`
  max-width: 560px;
  max-height: 355px;
  width: 100%;
  border-radius: 12px;
`;

export const ShareIcon = styled.div`
  position: relative;
  right: 20px;
  top: 2px;
`;

export const SearchBoxContainer = styled.div`
  max-width: 560px;
  width: 100%;
  margin-top: 10px;
  font-family: "Helvetica Neue", sans-serif;
`;

export const AddedContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`;

export const SongShared = styled.div`
  position: relative;
  margin-left: 7px;
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
`;

export const SourceImageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SourceImage = styled.img`
  width: 52px;
`;

export const VerifyEmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 35px;
  margin: 7px;
  @media (min-width: 767px) {
    margin: 0 auto;
  }
`;

export const VerifyEmail = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Helvetica Neue", sans-serif;
    background-color: #f9fafb;
    border: 2px solid rgb(93, 93, 255);
    max-width: 500px;
    width: 100%;
    padding: 24px;
    margin-bottom: 24px;
    border-radius: 4px;
}
`;

export const RefreshIcon = styled.img`
  width: 17px;
`;

export const RefreshButton = styled.button`
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
`;

export const ErrorMsg = styled.div`
  color: #525f7f;
  font-size: 15px;
  font-weight: 500;
  font-family: sans-serif;
`;

export const linkStyle = {
  textDecoration: "none",
};

interface SongData {
  title: string;
  url: string;
  embededUrl: string;
  genre: string;
  spotifyLink: boolean;
  source: string;
}
function Share() {
  const [error, setError] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const username = localStorage.getItem("username");
  const [location, setLocation] = useState(null);
  const [profileLink, setProfileLink] = useState<string>(`/${username}`);

  const [songData, setSongData] = useState<SongData>({
    title: "",
    url: "",
    embededUrl: "",
    genre: "",
    spotifyLink: false, // is it a spotify song (diff styling)
    source: "",
  });

  const [user] = useAuthState(auth);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSongData({...songData, url: event.target.value});
  };

  const handleEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      processUrl();
    }
  };

  const validGenres = genres.map((d) => d.value);

  const processUrl = () => {
    setErrors([]);
    let hasErrors = false;
    // youtube / spotify /
    //
    //TODO: make sure host name is valid

    // const validHostNames = [
    //   "www.youtube.com",
    //   "youtu.be",
    //   "soundcloud.com",
    //   "on.soundcloud.com",
    // ];

    // YOUTUBE
    /*
     if hostname is youtu.be || www.youtube.com
    */

    // https://on.soundcloud.com/x4uzk
    // https://www.youtube.com/watch?v=6_mWyjJQxWg&ab_channel=KodakBlack
    // https://soundcloud.com/ragerthelabel/erykah-badu-kodak-black?si=c86d26e269ea43d1808b280a6e703fe9&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
    // https://open.spotify.com/track/5TrkFfJgrGa1PdAkJO5QAs?si=PiAb5HucQxes3ZS2yb6Y7g
    const {url} = songData;
    const validUrl =
      validSoundCloudLink(url) ||
      validSpotifyLink(url) ||
      validYoutubeLink(url);

    if (url.length === 0) {
      hasErrors = true;
      setErrors((errors) => [...errors, "Please enter a url."]);
    }
    if (!validUrl) {
      hasErrors = true;
      setErrors((errors) => [
        ...errors,
        "Please enter a valid song link from youtube, soundcloud, or spotify.",
      ]);
    }

    if (!hasErrors) {
      let link = new URL(songData.url);
      let hostname = link.hostname;

      let youtube = ["youtu.be", "www.youtube.com"];
      let soundcloud = ["soundcloud.com", "on.soundcloud.com"];
      let spotify = "open.spotify.com";
      let embedUrl = "";

      if (youtube.includes(hostname)) {
        let videoCode = "";
        if (hostname === "www.youtube.com") {
          videoCode = songData.url.split("v=")[1].split("&")[0];
          embedUrl = `https://www.youtube.com/embed/${videoCode}`;
        } else if (hostname === "youtu.be") {
          videoCode = link.pathname.substring(1);
          embedUrl = `https://www.youtube.com/embed/${videoCode}`;
        }
        setError(false);
        setSongData({...songData, embededUrl: embedUrl, source: "youtube"});
      } else if (soundcloud.includes(hostname)) {
        axios
          .get(`https://soundcloud.com/oembed?url=${songData.url}&format=json`)
          .then((resp) => {
            let iframe = resp.data.html;
            let title = resp.data.title;
            let srcIndex = iframe.indexOf("src");
            let last = iframe.lastIndexOf('"');
            let soundcloudLink = iframe.substring(srcIndex + 5, last);
            setSongData({
              ...songData,
              embededUrl: soundcloudLink,
              title: title,
              source: "soundcloud",
            });
          });
        setError(false);
      } else if (hostname === spotify) {
        axios
          .get(
            `https://open.spotify.com/oembed?url=${songData.url}&format=json`
          )
          .then((resp) => {
            let iframe = resp.data.html;
            let title = resp.data.title;

            let srcIndex = iframe.indexOf("src");
            let last = iframe.lastIndexOf('"');
            let spotifyLink = iframe.substring(srcIndex + 5, last);
            setSongData({
              ...songData,
              embededUrl: spotifyLink,
              spotifyLink: true,
              title: title,
              source: "spotify",
            });
          });
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const handleGenreChange = (value: string) => {
    setSongData({...songData, genre: value});
    if (!validGenres.includes(value)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSearch = (selected: any) => {
    const {item} = selected;
    setSongData({...songData, genre: item.value});
  };

  const handleSharing = async () => {
    setAdded(true);
    setError(false);

    /**
     *   title: string;
  url: string;
  embededUrl: string;
  genre: string;
  spotifyLink: boolean;
  source: string;
     */

    const {title, genre, url, source, embededUrl} = songData;
    try {
      const response = await axios.post(`${SERVER_ENDPOINT}/add_song`, {
        uid: user?.uid,
        location: location,
        title: title,
        genre: genre,
        link: url,
        source: source,
        embed_url: embededUrl,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    auth.signOut();
    window.location.href = "/";
  };

  /**
   *  {link: url, embededUrl: embededUrl, genre: genre, user_id: 1, created_at: "{date}"}
   */
  useEffect(() => {
    const getUsername = async () => {
      try {
        const response = await axios.get(
          `${SERVER_ENDPOINT}/get_username/${user?.uid}`
        );
        setProfileLink(`/${response.data}`);
      } catch (err) {
        console.error(err);
      }
    };
    const getLocation = async () => {
      try {
        const response = await axios.get(
          `${SERVER_ENDPOINT}/get_location/${user?.uid}`
        );
        setLocation(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsername();
    getLocation();

    // TODO: get user location
  }, [user?.uid, errors]);
  if (!user?.emailVerified) {
    return (
      <VerifyEmailContainer>
        <MenuHeader>
          <LoopyLogo />
          <MenuItems>
            <Link to={profileLink} style={linkStyle}>
              <MenuItem>Profile</MenuItem>
            </Link>

            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuItems>
        </MenuHeader>

        <NoticeContainer>
          <VerifyEmail>
            Please check your email to verify your account to use Loopy.
          </VerifyEmail>
          {/* <Link to="/" style={linkStyle}>
            <RefreshButton
              onClick={() => {
                user?.reload();
              }}
            >
              <RefreshIcon src={refresh} />
              Refresh
            </RefreshButton>
          </Link> */}
        </NoticeContainer>
      </VerifyEmailContainer>
    );
  }
  return (
    // TODO: change this className
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

      <ModalContainer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              className="Button violet"
              onClick={() => {
                setAdded(false);
                setSongData({
                  title: "",
                  url: "",
                  embededUrl: "",
                  genre: "",
                  spotifyLink: false,
                  source: "",
                });
              }}
            >
              Share
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle">Share a song</Dialog.Title>
              <MusicContainer>
                <SearchContainer>
                  <SearchBox
                    placeholder="Enter song link... (youtube, spotify, or soundcloud)"
                    onChange={handleUrlChange}
                    onKeyDown={handleEnterPressed}
                  />
                  <SearchButton onClick={processUrl}>Search</SearchButton>
                </SearchContainer>
                <div>
                  {errors.length > 0 && <ErrorMsg>{errors[0]}</ErrorMsg>}
                </div>

                {songData.embededUrl && (
                  <>
                    {songData.spotifyLink ? (
                      <Spotify
                        title=""
                        width="560"
                        height="355"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        src={songData.embededUrl}
                      ></Spotify>
                    ) : (
                      <Video
                        width="560"
                        height="355"
                        src={songData.embededUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></Video>
                    )}

                    <SearchBoxContainer>
                      <ReactSearchBox
                        placeholder="What's the genre?"
                        data={genres}
                        onSelect={handleSearch}
                        onChange={handleGenreChange}
                        autoFocus
                      />
                    </SearchBoxContainer>

                    <Dialog.Close asChild>
                      <ShareButton
                        onClick={handleSharing}
                        disabled={
                          songData.genre === "" || error || errors.length > 0
                        }
                        style={
                          songData.genre === "" || error
                            ? {backgroundColor: "lightgrey"}
                            : {backgroundColor: "rgb(93, 93, 255)"}
                        }
                      >
                        Share{" "}
                        <ShareIcon>
                          <GlobeIcon />
                        </ShareIcon>
                      </ShareButton>
                    </Dialog.Close>
                  </>
                )}
              </MusicContainer>
              <Dialog.Close asChild>
                <button
                  className="IconButton"
                  aria-label="Close"
                  onClick={() => {
                    setErrors([]);
                  }}
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {added && (
          <>
            <AddedContainer>
              <CheckCircledIcon
                style={{color: "green", height: "20px", width: "20px"}}
              />
              <SongShared>song shared</SongShared>
            </AddedContainer>
          </>
        )}
      </ModalContainer>
    </div>
  );
}

export default Share;
