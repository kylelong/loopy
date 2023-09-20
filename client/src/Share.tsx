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
import star from "./assets/star.svg";
import {
  validSoundCloudLink,
  validSpotifyLink,
  validYoutubeLink,
  isShortenSpotifyLink,
} from "./functions";
import Loader from "./Loader";

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
  margin-top: 16px;
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

export const CaptionInput = styled.input`
  max-width: 560px;
  width: 100%;
  margin-top: 10px;
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
  padding-top: 24px;
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

export const GenreButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 24px;
  @media (min-width: 561px) {
    justify-content: center;
    align-items: center;
    padding: unset;
  }
`;
export const Svg = styled.img`
  width: 1.2rem;
  margin-right: 4px;
`;
export const GenreButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FavoriteGenreButtonDisabled = styled.button`
  padding: 12px;
  border-radius: 5px;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Helvetica Neue", sans-serif;
  color: #525f7f;
  font-weight: bold;
  font-size: 16px;
  opacity: 0.7;
  border: none;

  &:hover {
    opacity: 1;
    color: #d1d5db;
    background-color: rgb(93, 93, 255);
    cursor: pointer;
  }
`;
export const FavoriteGenreButton = styled.button`
  padding: 12px;
  border-radius: 5px;
  color: #d1d5db;
  background-color: rgb(93, 93, 255);
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: bold;
  font-size: 16px;
  opacity: 1;
  border: none;

  &:hover {
    cursor: pointer;
    color: #525f7f;
    background-color: #f0f0f0;
  }
`;

export const NoSongData = styled.div`
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
  margin-top: 15px;
`;

interface SongData {
  title: string;
  url: string;
  embededUrl: string;
  genre: string;
  spotifyLink: boolean;
  source: string;
  caption: string;
}
function Share() {
  const validGenres: string[] = genres.map((d) => d.value);
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
  const [updateFilter, setUpdateFilter] = useState<boolean>(false);
  const [filteredGenres, setFilteredGenres] = useState<string[]>(validGenres);
  const [favoriteGenre, setFavoriteGenre] = useState<string>("");
  const [showFavoriteGenre, setShowFavoriteGenre] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noSongData, setNoSongData] = useState<boolean>(false);

  const [songData, setSongData] = useState<SongData>({
    title: "",
    url: "",
    embededUrl: "",
    genre: "",
    spotifyLink: false, // is it a spotify song (diff styling)
    source: "",
    caption: "",
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
  const getFavoriteGenre = async () => {
    try {
      const response = await axios.get(
        `${SERVER_ENDPOINT}/get_genre/${user?.uid}`
      );
      setFavoriteGenre(response.data);
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
    getFavoriteGenre();
    getUsername();
    getLocation();
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSongData({...songData, url: event.target.value});
  };

  const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSongData({...songData, caption: event.target.value});
  };

  const handleEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      processUrl();
    }
  };

  const processUrl = async () => {
    setErrors([]);
    let hasErrors = false;
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
      let spotify = ["open.spotify.com", "spotify.link"];
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
      } else if (spotify.includes(hostname)) {
        let song_link = songData.url;
        if (isShortenSpotifyLink(song_link)) {
          const response = await axios.get(
            `${SERVER_ENDPOINT}/get_spotify_link/${songData.url}`
          );
          song_link = response.data;
        }
        axios
          .get(`https://open.spotify.com/oembed?url=${song_link}&format=json`)
          .then((resp) => {
            let iframe = resp.data.html;
            let title = resp.data.title;

            let srcIndex = iframe.indexOf("src");
            let last = iframe.lastIndexOf('"');
            let spotifyLink = iframe.substring(srcIndex + 5, last);
            setSongData({
              ...songData,
              url: song_link,
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

  const handleGenreFilter = async (selected: any) => {
    setHasMore(true);
    setNoSongData(false);
    setIsLoading(true);
    setShowFavoriteGenre(false);
    songsRef.current = originalSongsRef.current;
    const genres = selected.map((el: any) => el.value);
    setFilteredGenres(genres); // filter by genres i want to see
    let filteredSongs = songsRef.current.filter(
      (song: Song) => genres.indexOf(song.genre) !== -1
    );
    // page is 1 because  are starting over
    if (genres.length > 0) {
      songsRef.current = filteredSongs;
      setFilter(true);
      await fetchSongs(genres, 1);
    }
    // reset to default genres
    if (genres.length === 0) {
      // need originalSongsRef because we manipulate songsRef.current on filter
      songsRef.current = originalSongsRef.current;
      setFilter(false);
      setFilteredGenres([]); // reset to see all songs
      await fetchSongs(validGenres, 1);
    }
    setUpdateFilter(!updateFilter);
    setIsLoading(false);
  };

  const handleSearch = (selected: any) => {
    const {item} = selected;
    setSongData({...songData, genre: item.value});
  };

  const handleSharing = async () => {
    setAdded(true);
    setError(false);

    const {title, genre, url, source, embededUrl, caption} = songData;
    try {
      await axios.post(`${SERVER_ENDPOINT}/add_song`, {
        uid: user?.uid,
        location: location,
        title: title,
        genre: genre,
        link: url,
        source: source,
        embed_url: embededUrl,
        caption: caption,
      });
      await fetchSongs(validGenres, 1);
      await fetchGenres();
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    auth.signOut();
    window.location.href = "/";
  };

  const fetchSongs = useCallback(
    async (genres: string[], page: number) => {
      // Add a guard clause to prevent multiple calls
      setPage(page);
      if (fetchingSongs) {
        return;
      }

      try {
        setFetchingSongs(true); // Set a flag to indicate that data is being fetched
        const response = await axios.get(`${SERVER_ENDPOINT}/get_songs`, {
          params: {page: page, genres: genres},
        });
        if (!response.data || response.data.length === 0) {
          setNoSongData(true);
          setHasMore(false);
          return;
        } else {
          setNoSongData(false);
        }
        if (response.data.length < 15) {
          // TODO: this is prolly a bug
          setHasMore(false);
        }

        const newSongs = response.data;
        if (page > 1) {
          setSongs((prevSongs) => [...prevSongs, ...newSongs]);
          songsRef.current = [...songsRef.current, ...newSongs];
          originalSongsRef.current = [...originalSongsRef.current, ...newSongs];
        } else {
          setSongs(newSongs);
          songsRef.current = newSongs;
          originalSongsRef.current = newSongs;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetchingSongs(false); // Reset the fetching flag
      }
    },
    [fetchingSongs]
  );

  const fetchGenres = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER_ENDPOINT}/get_genres`);
      const options: any = [];
      response.data.forEach((el: any) => {
        options.push({value: el.genre, label: el.genre});
      });
      options.sort((a: any, b: any) => a.value.localeCompare(b.value));
      setSongGenres(options);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleLoadMore = (page: number) => {
    fetchSongs(filteredGenres, page);
  };

  const handleFavoriteGenre = async () => {
    // TODO: toggle
    setIsLoading(true);
    setNoSongData(false);
    setShowFavoriteGenre(!showFavoriteGenre);
    if (!showFavoriteGenre) {
      // show fave genre lag with setting state
      let genres = favoriteGenre ? [favoriteGenre] : validGenres;
      setHasMore(true);
      await fetchSongs(genres, 1);
    } else {
      setHasMore(true);
      await fetchSongs(validGenres, 1);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    // Check if data has already been fetched
    if (!dataFetchedRef.current) {
      // Fetch data if not already fetched
      fetchSongs(validGenres, 1);
      fetchGenres();
      // Mark data as fetched
      dataFetchedRef.current = true;
    }
  }, [
    fetchSongs,
    fetchGenres,
    filter,
    songsRef,
    originalSongsRef,
    filteredGenres,
    hasMore,
    validGenres,
  ]);

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
                  caption: "",
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
                share a song that you think is great &#128522;
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
                        placeholder={
                          songData.genre.length > 0
                            ? songData.genre
                            : "What's the genre?"
                        }
                        data={genres}
                        onSelect={handleSearch}
                        onChange={handleGenreChange}
                        autoFocus
                      />
                    </SearchBoxContainer>
                    <CaptionInput
                      placeholder="Caption (optional) - describe the song, where you heard it, why you like it, etc"
                      onChange={handleCaptionChange}
                    />

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
      <GenreButtonContainer>
        {favoriteGenre ? (
          showFavoriteGenre ? (
            <FavoriteGenreButton onClick={handleFavoriteGenre}>
              <Svg src={star} />
              Favorite Genre
            </FavoriteGenreButton>
          ) : (
            <FavoriteGenreButtonDisabled onClick={handleFavoriteGenre}>
              <Svg src={star} />
              Favorite Genre
            </FavoriteGenreButtonDisabled>
          )
        ) : showFavoriteGenre ? (
          <Link to="/account" style={linkStyle}>
            <FavoriteGenreButton onClick={handleFavoriteGenre}>
              <Svg src={star} />
              Favorite Genre
            </FavoriteGenreButton>
          </Link>
        ) : (
          <Link to="/account" style={linkStyle}>
            <FavoriteGenreButtonDisabled onClick={handleFavoriteGenre}>
              <Svg src={star} />
              Favorite Genre
            </FavoriteGenreButtonDisabled>
          </Link>
        )}
        {favoriteGenre && noSongData && (
          <NoSongData>
            no songs for {favoriteGenre} yet{" "}
            <span style={{fontSize: "18px", position: "relative", top: "2px"}}>
              &#128532;
            </span>
          </NoSongData>
        )}
      </GenreButtonContainer>
      {dataFetchedRef.current && !isLoading ? (
        <InfiniteScroll
          dataLength={songs.length}
          next={() => handleLoadMore(page + 1)}
          hasMore={hasMore}
          loader={<Loader />}
        >
          <SongContainer>
            {filter
              ? songsRef.current.map((song, i) => {
                  return (
                    <SongItemWrapper>
                      {" "}
                      <SongItem song={song} key={i} inProfile={true} />
                    </SongItemWrapper>
                  );
                })
              : originalSongsRef.current.map((song, i) => {
                  return (
                    <SongItemWrapper>
                      {" "}
                      <SongItem song={song} key={i} inProfile={true} />
                    </SongItemWrapper>
                  );
                })}
          </SongContainer>
        </InfiniteScroll>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Share;
