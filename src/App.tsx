import React, {useState, useEffect} from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import {GlobeIcon, CheckCircledIcon} from "@radix-ui/react-icons";
import ReactSearchBox from "react-search-box";
import genres from "./genres";
export const MusicContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  background: #6e79d6;
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
  background: #6e79d6;
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
  max-height: 315px;
  width: 100%;
  border: 1px solid rgb(102, 112, 133);
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
function App() {
  const [url, setUrl] = useState<string>("");
  const [embededUrl, setEmbededUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [genre, setGenre] = useState<string>("");
  const [added, setAdded] = useState<boolean>(false);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
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

    //
    // https://soundcloud.com/ragerthelabel/erykah-badu-kodak-black?si=c86d26e269ea43d1808b280a6e703fe9&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
    let link = new URL(url);
    let hostname = link.hostname;

    let youtube = ["youtu.be", "www.youtube.com"];
    let soundcloud = ["soundcloud.com", "on.soundcloud.com"];
    let embedUrl = "";

    if (youtube.includes(hostname)) {
      let videoCode = "";
      if (hostname === "www.youtube.com") {
        videoCode = url.split("v=")[1].split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${videoCode}`;
      } else if (hostname === "youtu.be") {
        videoCode = link.pathname.substring(1);
        embedUrl = `https://www.youtube.com/embed/${videoCode}`;
      }
      setError(false);
      setEmbededUrl(embedUrl);
    } else if (soundcloud.includes(hostname)) {
      axios
        .get(`https://soundcloud.com/oembed?url=${url}&format=json`)
        .then((resp) => {
          let iframe = resp.data.html;
          let srcIndex = iframe.indexOf("src");
          let last = iframe.lastIndexOf('"');
          let soundcloudLink = iframe.substring(srcIndex + 5, last);
          setEmbededUrl(soundcloudLink);
        });
      setError(false);
    } else {
      setError(true);
    }
  };
  // https://www.youtube.com/watch?v=6_mWyjJQxWg&ab_channel=KodakBlack
  const handleGenreChange = (value: string) => {
    setGenre(value);
    if (!validGenres.includes(value)) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const handleSearch = (selected: any) => {
    const {item} = selected;
    setGenre(item.value);
  };

  const handleSharing = () => {
    setAdded(true);
  };

  /**
   *  {link: url, embededUrl: embededUrl, genre: genre, user_id: 1, created_at: "{date}"}
   */
  useEffect(() => {}, []);
  return (
    <div className="App">
      <MusicContainer>
        <SearchContainer>
          <SearchBox
            placeholder="Enter song link... (youtube, soundcloud)"
            onChange={handleUrlChange}
            onKeyDown={handleEnterPressed}
          />
          <SearchButton onClick={processUrl}>Search</SearchButton>
        </SearchContainer>
        {embededUrl && (
          <>
            <Video
              width="560"
              height="315"
              src={embededUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></Video>
            <SearchBoxContainer>
              <ReactSearchBox
                placeholder="What's the genre?"
                data={genres}
                onSelect={handleSearch}
                onChange={handleGenreChange}
                autoFocus
              />
            </SearchBoxContainer>

            <ShareButton
              onClick={handleSharing}
              disabled={genre === "" || error}
              style={
                genre === "" || error
                  ? {backgroundColor: "lightgrey"}
                  : {backgroundColor: "#6e79d6"}
              }
            >
              Share{" "}
              <ShareIcon>
                <GlobeIcon />
              </ShareIcon>
            </ShareButton>
            {added && (
              <AddedContainer>
                <CheckCircledIcon
                  style={{color: "green", height: "20px", width: "20px"}}
                />
                <SongShared>song shared</SongShared>
              </AddedContainer>
            )}
          </>
        )}
      </MusicContainer>

      {/* {error && <div>error loading song.</div>} */}
    </div>
  );
}

export default App;
