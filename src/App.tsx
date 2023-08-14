import React, {useState, useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import axios from "axios";

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
  max-width: 560px;
  max-height: 315px;
  width: 100%;
`;

function App() {
  const [url, setUrl] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const processUrl = () => {
    // youtube / spotify /

    // 2 youtube formats : https://youtu.be/hn-9ffDhGAo and classic youtube
    // https://soundcloud.com/ragerthelabel/erykah-badu-kodak-black?si=c86d26e269ea43d1808b280a6e703fe9&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
    const videoCode = url.split("v=")[1].split("&")[0];
    const embedUrl = `https://www.youtube.com/embed/${videoCode}`;

    setYoutubeUrl(embedUrl);
  };
  useEffect(() => {
    let link = new URL("https://youtu.be/hn-9ffDhGAo");
    console.log(link.hostname);

    let soundcloudUrl =
      "https://soundcloud.com/ragerthelabel/erykah-badu-kodak-black?si=c86d26e269ea43d1808b280a6e703fe9&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing";
    axios
      .get(`https://soundcloud.com/oembed?url=${soundcloudUrl}&format=json`)
      .then((resp) => {
        let iframe = resp.data.html;
        let srcIndex = iframe.indexOf("src");
        let last = iframe.lastIndexOf('"');
        let soundcloudLink = iframe.substring(srcIndex + 5, last);
        // let link = new URL(soundcloudUrl);
        // console.log(link.hostname);
      });
  }, [youtubeUrl]);
  return (
    <div className="App">
      <SearchContainer>
        <SearchBox
          placeholder="Enter song link... (youtube, soundcloud)"
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
      <Video
        scrolling="no"
        frameBorder="no"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/hn-9ffDhGAo"
      ></Video>
    </div>
  );
}

export default App;
