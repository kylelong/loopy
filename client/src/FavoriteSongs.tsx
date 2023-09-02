import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
//{current_favorite_song : string, favorite_song: string}
interface FavoriteSongsProps {
  current_favorite_song: string;
  favorite_song: string;
}
interface Urls {
  current_favorite_song_embed_url?: string;
  favorite_song_embed_url?: string;
}
export const Video = styled.iframe`
  border-radius: 4px;
  max-width: 560px;
  max-height: 355px;
  width: 100%;
  border: 1px solid rgb(102, 112, 133);
  border-radius: 12px;
`;

const FavoriteSongs: React.FC<FavoriteSongsProps> = ({
  current_favorite_song,
  favorite_song,
}) => {
  const [urls, setUrls] = useState<Urls>({
    current_favorite_song_embed_url: "",
    favorite_song_embed_url: "",
  });
  let current_favorite_song_link = new URL(current_favorite_song);
  let favorite_song_link = new URL(favorite_song);
  let current_favorite_song_hostname = current_favorite_song_link.hostname;
  let favorite_song_hostname = favorite_song_link.hostname;

  let youtube = ["youtu.be", "www.youtube.com"];
  let soundcloud = ["soundcloud.com", "on.soundcloud.com"];
  let spotify = "open.spotify.com";

  const processLink = async (source: string, link: URL, hostname: string) => {
    let embedUrl = "";
    if (youtube.includes(hostname)) {
      let videoCode = "";
      if (hostname === "www.youtube.com") {
        videoCode = source.split("v=")[1].split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${videoCode}`;
      } else if (hostname === "youtu.be") {
        videoCode = link.pathname.substring(1);
        embedUrl = `https://www.youtube.com/embed/${videoCode}`;
      }
      return embedUrl;
    } else if (soundcloud.includes(hostname)) {
      try {
        const resp = await axios.get(
          `https://soundcloud.com/oembed?url=${source}&format=json`
        );
        let iframe = resp.data.html;
        let title = resp.data.title;
        let srcIndex = iframe.indexOf("src");
        let last = iframe.lastIndexOf('"');
        let soundcloudLink = iframe.substring(srcIndex + 5, last);
        embedUrl = soundcloudLink;
        return embedUrl;
      } catch (err) {
        console.error(err);
      }
    } else if (hostname === spotify) {
      try {
        const resp = await axios.get(
          `https://open.spotify.com/oembed?url=${source}&format=json`
        );
        let iframe = resp.data.html;
        let title = resp.data.title;

        let srcIndex = iframe.indexOf("src");
        let last = iframe.lastIndexOf('"');
        let spotifyLink = iframe.substring(srcIndex + 5, last);
        embedUrl = spotifyLink;
        return embedUrl;
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let currentFavoriteSongEmbedUrl = await processLink(
          current_favorite_song,
          current_favorite_song_link,
          current_favorite_song_hostname
        );
        let favoriteSongEmbedUrl = await processLink(
          favorite_song,
          favorite_song_link,
          favorite_song_hostname
        );
        setUrls({
          current_favorite_song_embed_url: currentFavoriteSongEmbedUrl,
          favorite_song_embed_url: favoriteSongEmbedUrl,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Video
        width="560"
        height="355"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        src={urls.current_favorite_song_embed_url}
      ></Video>
      <Video
        width="560"
        height="355"
        src={urls.favorite_song_embed_url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></Video>
    </>
  );
};

export default FavoriteSongs;
