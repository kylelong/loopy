import React, {useState, useEffect} from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import {GlobeIcon} from "@radix-ui/react-icons";
import ReactSearchBox from "react-search-box";

export const MusicContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;
export const SearchBox = styled.input`
  max-width: 500px;
  width: 100%;
  height: 38px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 4px;
  padding-left: 5px;
  margin-right: 5px;
`;

export const SearchButton = styled.button`
  height: 42px;
  max-width: 259px;
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
  text-align: center;
  margin-top: 10px;
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

function App() {
  const [url, setUrl] = useState<string>("");
  const [embededUrl, setEmbededUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [genre, setGenre] = useState<string>("");

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      processUrl();
    }
  };

  let data = [
    {key: "1", value: "Pop"},
    {key: "2", value: "Rock"},
    {key: "3", value: "Hip-Hop"},
    {key: "4", value: "Electronic"},
    {key: "5", value: "Jazz"},
    {key: "6", value: "Blues"},
    {key: "7", value: "Classical"},
    {key: "8", value: "Country"},
    {key: "9", value: "R&B"},
    {key: "10", value: "Reggae"},
    {key: "11", value: "Folk"},
    {key: "12", value: "Metal"},
    {key: "13", value: "Punk"},
    {key: "14", value: "Alternative"},
    {key: "15", value: "Funk"},
    {key: "16", value: "Soul"},
    {key: "17", value: "Rap"},
    {key: "18", value: "Indie"},
    {key: "19", value: "Techno"},
    {key: "20", value: "House"},
    {key: "21", value: "Dubstep"},
    {key: "22", value: "Ska"},
    {key: "23", value: "Gospel"},
    {key: "24", value: "Latin"},
    {key: "25", value: "World Music"},
    {key: "26", value: "Dancehall"},
    {key: "27", value: "Grunge"},
    {key: "28", value: "Ambient"},
    {key: "29", value: "New Age"},
    {key: "30", value: "Experimental"},
    {key: "31", value: "Bollywood"},
    {key: "32", value: "J-Pop"},
    {key: "33", value: "K-Pop"},
    {key: "34", value: "Flamenco"},
    {key: "35", value: "Salsa"},
    {key: "36", value: "Bossa Nova"},
    {key: "37", value: "Hip-Life"},
    {key: "38", value: "Cumbia"},
    {key: "39", value: "Tango"},
    {key: "40", value: "Bhangra"},
    {key: "41", value: "Reggaeton"},
    {key: "42", value: "Celtic"},
    {key: "43", value: "Afrobeat"},
    {key: "44", value: "Rockabilly"},
    {key: "45", value: "Bluegrass"},
    {key: "46", value: "Psychedelic"},
    {key: "47", value: "Trance"},
    {key: "48", value: "Sufi Music"},
    {key: "49", value: "Mariachi"},
    {key: "50", value: "Hardstyle"},
  ];
  const validGenres = data.map((d) => d.value);

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
                data={data}
                onSelect={handleSearch}
                onChange={handleGenreChange}
                autoFocus
              />
            </SearchBoxContainer>
            <div>{genre}</div>
            <ShareButton
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
          </>
        )}
      </MusicContainer>

      {/* {error && <div>error loading song.</div>} */}
    </div>
  );
}

export default App;
