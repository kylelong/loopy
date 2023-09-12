import React, {useState, useEffect, useCallback, useRef} from "react";
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
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase-config";
import {SERVER_ENDPOINT} from "./constants";
import InfiniteScroll from "react-infinite-scroll-component";
import SongItem from "./SongItem";
import Select from "react-select";
import {Song} from "./types/types";
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
    margin-bottom: 10px;
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

export const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 24px;
  @media (min-width: 561px) {
    justify-content: center;
    align-items: center;
  }
`;

export const SelectContainer = styled.div`
  max-width: 350px;
  width: 100%;
  position: relative;
  top: 12px;
`;
export const SongItemWrapper = styled.div`
  max-width: 560px;
  width: 100%;
`;

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
  const [filter, setFilter] = useState<boolean>(false);
  const username = localStorage.getItem("username");
  const [location, setLocation] = useState(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [songGenres, setSongGenres] = useState<[]>([]);
  const [profileLink, setProfileLink] = useState<string>(`/${username}`);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [fetchingSongs, setFetchingSongs] = useState<boolean>(false);

  const [songData, setSongData] = useState<SongData>({
    title: "",
    url: "",
    embededUrl: "",
    genre: "",
    spotifyLink: false, // is it a spotify song (diff styling)
    source: "",
  });
  const songsRef = useRef<Song[]>([]);
  const originalSongsRef = useRef<Song[]>([]);
  const dataFetchedRef = useRef(false);

  const [user, loading] = useAuthState(auth);

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
    } catch (err) {
      console.error(err);
    }
  };
  if (!loading && user) {
    getUsername();
    getLocation();
  }

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
      let soundcloud = [
        "soundcloud.com",
        "on.soundcloud.com",
        "soundcloud.app.goo.gl",
      ];
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

  // for uploading a song not filtering by genre

  const handleGenreChange = (value: string) => {
    setSongData({...songData, genre: value});
    if (!validGenres.includes(value)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleGenreFilter = (selected: any) => {
    songsRef.current = originalSongsRef.current;
    const genres = selected.map((el: any) => el.value);
    let filteredSongs = songsRef.current.filter(
      (song: Song) => genres.indexOf(song.genre) !== -1
    );
    if (genres.length > 0) {
      songsRef.current = filteredSongs;
      setSongs(filteredSongs);
      setFilter(true);
    }
    if (genres.length === 0) {
      // need originalSongsRef because we manipulate songsRef.current on filter
      setFilter(false);
      // reset songsRef to original
      songsRef.current = originalSongsRef.current;
      setSongs(originalSongsRef.current); // never changes
    }
  };

  const handleSearch = (selected: any) => {
    const {item} = selected;
    setSongData({...songData, genre: item.value});
  };

  const handleSharing = async () => {
    setAdded(true);
    setError(false);

    const {title, genre, url, source, embededUrl} = songData;
    try {
      await axios.post(`${SERVER_ENDPOINT}/add_song`, {
        uid: user?.uid,
        location: location,
        title: title,
        genre: genre,
        link: url,
        source: source,
        embed_url: embededUrl,
      });
      await fetchSongs();
      await fetchGenres();
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    auth.signOut();
    window.location.href = "/";
  };

  const fetchSongs = useCallback(async () => {
    // Add a guard clause to prevent multiple calls
    if (fetchingSongs) {
      return;
    }

    try {
      setFetchingSongs(true); // Set a flag to indicate that data is being fetched
      const response = await axios.get(`${SERVER_ENDPOINT}/get_songs`, {
        params: {page},
      });
      if (!response.data || response.data.length === 0) {
        setHasMore(false);
        return;
      }
      console.log("called with: ", page);
      const newSongs = response.data;
      setSongs((prevSongs) => [...prevSongs, ...newSongs]);
      songsRef.current = [...songsRef.current, ...newSongs];
      originalSongsRef.current = [...originalSongsRef.current, ...newSongs];
      setPage(page + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingSongs(false); // Reset the fetching flag
    }
  }, [page, fetchingSongs]);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER_ENDPOINT}/get_genres`);
      const options: any = [];
      response.data.forEach((el: any) => {
        options.push({value: el.genre, label: el.genre});
      });
      setSongGenres(options);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleLoadMore = () => {
    fetchSongs();
  };

  /**
   *  {link: url, embededUrl: embededUrl, genre: genre, user_id: 1, created_at: "{date}"}
   */
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchSongs();
    fetchGenres();
  }, [fetchGenres, fetchSongs]);
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
            Please check your email to verify your account to use Loopy. Check
            your spam folder just in case.
          </VerifyEmail>
        </NoticeContainer>
      </VerifyEmailContainer>
    );
  }
  return (
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
              <Dialog.Description className="DialogDescription">
                make sure this song is an all-time favorite of yours &#128522;
              </Dialog.Description>
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
        <SelectContainer>
          <Select
            options={songGenres}
            isMulti
            onChange={handleGenreFilter}
            placeholder="Filter by genre"
          />
        </SelectContainer>
      </ModalContainer>

      {/* {filter
          ? songsRef.current.map((song, i) => {
              return (
                <SongItemWrapper>
                  {" "}
                  <SongItem song={song} key={i} />
                </SongItemWrapper>
              );
            })
          : originalSongsRef.current.map((song, i) => {
              return (
                <SongItemWrapper>
                  {" "}
                  <SongItem song={song} key={i} />
                </SongItemWrapper>
              );
            })} */}

      <SongContainer>
        <InfiniteScroll
          dataLength={songs.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {filter
            ? songsRef.current.map((song, i) => {
                return (
                  <SongItemWrapper>
                    {" "}
                    <SongItem song={song} key={i} />
                  </SongItemWrapper>
                );
              })
            : originalSongsRef.current.map((song, i) => {
                return (
                  <SongItemWrapper>
                    {" "}
                    <SongItem song={song} key={i} />
                  </SongItemWrapper>
                );
              })}
        </InfiniteScroll>
      </SongContainer>
    </div>
  );
}

export default Share;
