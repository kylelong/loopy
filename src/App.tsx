import React, {useState, useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  border-radius: 3px;
  background: rgb(53, 94, 59);
  color: white;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
`;

export const Video = styled.iframe`
  border-radius: 4px;
`;

function App() {
  const [url, setUrl] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const processUrl = () => {
    // youtube / spotify /
    const videoCode = url.split("v=")[1].split("&")[0];
    const embedUrl = `https://www.youtube.com/embed/${videoCode}`;
    setYoutubeUrl(embedUrl);
  };
  useEffect(() => {}, [youtubeUrl]);
  return (
    <div className="App">
      <SearchContainer>
        <SearchBox
          placeholder="Enter song link..."
          onChange={handleUrlChange}
        />
        <SearchButton onClick={processUrl}>search</SearchButton>
      </SearchContainer>
      {youtubeUrl && (
        <Video
          width="560"
          height="315"
          src={youtubeUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></Video>
      )}
    </div>
  );
}

export default App;
