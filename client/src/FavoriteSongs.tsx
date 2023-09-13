import React, {useState, useEffect, useMemo, useCallback} from "react";
import axios from "axios";
import styled from "styled-components";
import heart from "./assets/heart.svg";
import refresh from "./assets/refresh.svg";
//{current_favorite_song : string, favorite_song: string}
interface FavoriteSongsProps {
  current_favorite_song: string;
  favorite_song: string;
  username: string;
}
interface Urls {
  current_favorite_song_embed_url?: string;
  favorite_song_embed_url?: string;
}
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 560px;
  width: 100%;
`;
export const SongLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  @media (min-width: 767px) {
    margin-bottom: unset;
  }
`;
export const SVG = styled.img`
  width: 1.4rem;
  margin-right: 12px;
`;

export const Video = styled.iframe`
  border-radius: 4px;
  max-width: 560px;
  max-height: 355px;
  width: 100%;
  border: 1px solid rgb(102, 112, 133);
  border-radius: 12px;
`;

export const ProfileItem = styled.div`
  height: 42px;
  max-width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: rgb(93, 93, 255);
  background-color: #eef2ff;
  border: 0;
  border-radius: 5px;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 5px;
  margin-right: 24px;
  text-align: center;
  opacity: 1;
`;

export const ProfileItemInactive = styled.div`
  height: 42px;
  max-width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: rgb(93, 93, 255);

  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 5px;
  margin-right: 24px;
  text-align: center;
  opacity: 1;
  &:hover {
    cursor: pointer;
    border: 0px;
    border-radius: 5px;
    background-color: #eef2ff;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 560px;
  width: 100%;
  margin-bottom: 14px;
  align-items: center;
  text-align: center;
  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 24px;
  }
`;

export const SongDescription = styled.div`
  color: #525f7f;
  font-size: 13px;
  font-weight: 700;
  font-family: sans-serif;
  max-width: 250px;
  width: 100%;
`;

export const NoSongContainer = styled.div`
  border-radius: 4px;
  max-width: 560px;
  max-height: 355px;
  height: 355px;
  // background-color: #eef2ff;
  background-color: rgb(93, 93, 255);
  color: white;
  width: 100%;
  border: 1px solid rgb(102, 112, 133);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoSong = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 22px;
  font-weight: bold;
  padding: 12px;
`;

const FavoriteSongs: React.FC<FavoriteSongsProps> = ({
  current_favorite_song,
  favorite_song,
  username,
}) => {
  const [urls, setUrls] = useState<Urls>({
    current_favorite_song_embed_url: "",
    favorite_song_embed_url: "",
  });
  const [showCurrent, setShowCurrent] = useState<boolean>(true);
  let current_favorite_song_link = useMemo(
    () => new URL(current_favorite_song, "https://randomapi.com/"),
    [current_favorite_song]
  );
  let favorite_song_link = useMemo(
    () => new URL(favorite_song, "https://randomapi.com/"),
    [favorite_song]
  );

  let current_favorite_song_hostname = current_favorite_song_link.hostname;
  let favorite_song_hostname = favorite_song_link.hostname;

  let youtube = useMemo(() => ["youtu.be", "www.youtube.com"], []);
  let soundcloud = useMemo(
    () => ["soundcloud.com", "on.soundcloud.com", "soundcloud.app.goo.gl"],
    []
  );
  let spotify = "open.spotify.com";

  const processLink = useCallback(
    async (source: string, link: URL, hostname: string) => {
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
          console.log(`iframe: ${iframe}`);
          // let title = resp.data.title;
          let srcIndex = iframe.indexOf("src");
          let last = iframe.lastIndexOf('"');
          let soundcloudLink = iframe.substring(srcIndex + 5, last);
          embedUrl = soundcloudLink;
          console.log(`embedUrl: ${soundcloudLink}`);
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
          // let title = resp.data.title;

          let srcIndex = iframe.indexOf("src");
          let last = iframe.lastIndexOf('"');
          let spotifyLink = iframe.substring(srcIndex + 5, last);
          embedUrl = spotifyLink;
          return embedUrl;
        } catch (err) {
          console.error(err);
        }
      }
    },
    [soundcloud, spotify, youtube]
  );

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
  }, [
    current_favorite_song,
    current_favorite_song_link,
    current_favorite_song_hostname,
    favorite_song,
    favorite_song_hostname,
    favorite_song_link,
    processLink,
  ]);

  return (
    <>
      <Container>
        <ButtonContainer>
          {showCurrent ? (
            <>
              <SongLabelContainer>
                <ProfileItem
                  onClick={() => {
                    setShowCurrent(true);
                  }}
                >
                  <SVG src={refresh} />
                  Current Favorite Song
                </ProfileItem>
                <SongDescription>current song on repeat</SongDescription>
              </SongLabelContainer>
              <SongLabelContainer>
                <ProfileItemInactive
                  onClick={() => {
                    setShowCurrent(false);
                  }}
                >
                  {" "}
                  <SVG src={heart} />
                  Favorite Song
                </ProfileItemInactive>
                <SongDescription>all-time favorite song</SongDescription>
              </SongLabelContainer>{" "}
            </>
          ) : (
            <>
              <SongLabelContainer>
                <ProfileItemInactive
                  onClick={() => {
                    setShowCurrent(true);
                  }}
                >
                  <SVG src={refresh} />
                  Current Favorite Song
                </ProfileItemInactive>
                <SongDescription>current song on repeat</SongDescription>
              </SongLabelContainer>

              <SongLabelContainer>
                <ProfileItem
                  onClick={() => {
                    setShowCurrent(false);
                  }}
                >
                  {" "}
                  <SVG src={heart} />
                  Favorite Song
                </ProfileItem>
                <SongDescription>all-time favorite song</SongDescription>
              </SongLabelContainer>
            </>
          )}
        </ButtonContainer>
        {showCurrent &&
        current_favorite_song_link.origin === "https://randomapi.com" ? (
          <>
            <NoSongContainer>
              <NoSong>no current favorite song yet</NoSong>
            </NoSongContainer>
          </>
        ) : (
          showCurrent && (
            <Video
              width="560"
              height="355"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              src={urls.current_favorite_song_embed_url}
            ></Video>
          )
        )}
        {!showCurrent &&
        favorite_song_link.origin === "https://randomapi.com" ? (
          <>
            <NoSongContainer>
              <NoSong>no all-time favorite song yet</NoSong>
            </NoSongContainer>
          </>
        ) : (
          !showCurrent && (
            <Video
              width="560"
              height="355"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              src={urls.favorite_song_embed_url}
            ></Video>
          )
        )}
      </Container>
    </>
  );
};

export default FavoriteSongs;
