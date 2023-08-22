import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./App.css";
import "./share.css";
import styled from "styled-components";
import axios from "axios";
import LoopyLogo from "./LoopyLogo";
import {GlobeIcon, CheckCircledIcon} from "@radix-ui/react-icons";
import ReactSearchBox from "react-search-box";
import * as Dialog from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import genres from "./genres";

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
  justify-content: space-between;
  // width: 200px;
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
  margin-top: 10px;
`;

export const SongShared = styled.div`
  position: relative;
  margin-left: 7px;
`;

export const SourceImageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SourceImage = styled.img`
  width: 52px;
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
}
function Share() {
  const [error, setError] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const [songData, setSongData] = useState<SongData>({
    title: "",
    url: "",
    embededUrl: "",
    genre: "",
    spotifyLink: false, // is it a spotify song (diff styling)
  });

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
      setSongData({...songData, embededUrl: embedUrl});
    } else if (soundcloud.includes(hostname)) {
      axios
        .get(`https://soundcloud.com/oembed?url=${songData.url}&format=json`)
        .then((resp) => {
          let iframe = resp.data.html;
          let title = resp.data.title;
          let srcIndex = iframe.indexOf("src");
          let last = iframe.lastIndexOf('"');
          let soundcloudLink = iframe.substring(srcIndex + 5, last);
          setSongData({...songData, embededUrl: soundcloudLink, title: title});
        });
      setError(false);
    } else if (hostname === spotify) {
      axios
        .get(`https://open.spotify.com/oembed?url=${songData.url}&format=json`)
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
          });
        });
      setError(false);
    } else {
      setError(true);
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

  const handleSharing = () => {
    setAdded(true);
    setError(false);
    // setSongData({
    //   title: "",
    //   url: "",
    //   embededUrl: "",
    //   genre: "",
    //   spotifyLink: false,
    // });
  };

  /**
   *  {link: url, embededUrl: embededUrl, genre: genre, user_id: 1, created_at: "{date}"}
   */
  useEffect(() => {}, []);
  return (
    // TODO: change this className
    <div>
      <MenuHeader>
        <LoopyLogo />
        <MenuItems>
          <Link to="/account" style={linkStyle}>
            <MenuItem>Account</MenuItem>
          </Link>
          <Link to="/logout" style={linkStyle}>
            <MenuItem>Logout</MenuItem>
          </Link>
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
                });
              }}
            >
              Share
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
              <MusicContainer>
                <SearchContainer>
                  <SearchBox
                    placeholder="Enter song link... (youtube, spotify, or soundcloud)"
                    onChange={handleUrlChange}
                    onKeyDown={handleEnterPressed}
                  />
                  <SearchButton onClick={processUrl}>Search</SearchButton>
                </SearchContainer>

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
                        disabled={songData.genre === "" || error}
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
                <button className="IconButton" aria-label="Close">
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
            <div>{JSON.stringify(songData, null, 2)}</div>
          </>
        )}
      </ModalContainer>
    </div>
  );

  //   <div className="App">

  //     {/* {error && <div>error loading song.</div>} */}
  //   </div>
  // );
}

export default Share;
