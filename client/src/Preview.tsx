import React, {useState, useEffect, useCallback, useRef} from "react";
import {Link} from "react-router-dom";
import "./App.css";
import "./share.css";
import styled from "styled-components";
import axios from "axios";
import LoopyLogo from "./LoopyLogo";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import genres from "./genres";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase-config";

import {SERVER_ENDPOINT} from "./constants";
import SongItem from "./SongItem";
import Select from "react-select";
import {Song} from "./types/types";

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

  &:hover {
    color: rgb(93, 93, 255);
    cursor: pointer;
  }
`;

export const ModalContainer = styled.div`
  margin: 24px;
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

export const SourceImageContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SourceImage = styled.img`
  width: 52px;
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

export const MenuRow = styled.div`
  display: flex;
  flex-direction: row;
`;

function Preview() {
  const [filter, setFilter] = useState<boolean>(false);
  const validGenres: string[] = genres.map((d) => d.value);
  const [songs, setSongs] = useState<Song[]>([]);
  const [songGenres, setSongGenres] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [fetchingSongs, setFetchingSongs] = useState<boolean>(false);
  const [updateFilter, setUpdateFilter] = useState<boolean>(false);
  const [filteredGenres, setFilteredGenres] = useState<string[]>(validGenres);

  const [user] = useAuthState(auth);

  const songsRef = useRef<Song[]>([]);
  const originalSongsRef = useRef<Song[]>([]);
  const dataFetchedRef = useRef(false);

  const handleGenreFilter = async (selected: any) => {
    setHasMore(true);
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
          setHasMore(false);
          return;
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

  return (
    <div>
      <MenuHeader>
        <LoopyLogo />
        {user ? (
          <MenuRow>
            <MenuItems>
              <Link to="/" style={linkStyle}>
                <MenuItem>Home</MenuItem>
              </Link>
            </MenuItems>
          </MenuRow>
        ) : (
          <MenuRow>
            <MenuItems>
              <Link to="/signup" style={linkStyle}>
                <MenuItem>Sign up</MenuItem>
              </Link>
            </MenuItems>
            <MenuItems>
              <Link to="/login" style={linkStyle}>
                <MenuItem>Login</MenuItem>
              </Link>
            </MenuItems>
          </MenuRow>
        )}
      </MenuHeader>

      <ModalContainer>
        <SelectContainer>
          <Select
            options={songGenres}
            isMulti
            onChange={handleGenreFilter}
            placeholder="Filter by genre"
          />
        </SelectContainer>
      </ModalContainer>
      {dataFetchedRef.current ? (
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
          </SongContainer>
        </InfiniteScroll>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Preview;
