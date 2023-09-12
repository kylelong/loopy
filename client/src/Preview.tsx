import React, {useState, useEffect, useCallback, useRef} from "react";
import {Link} from "react-router-dom";
import "./App.css";
import "./share.css";
import styled from "styled-components";
import axios from "axios";
import LoopyLogo from "./LoopyLogo";
import InfiniteScroll from "react-infinite-scroll-component";

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

export const MenuRow = styled.div`
  display: flex;
  flex-direction: row;
`;

function Preview() {
  const [filter, setFilter] = useState<boolean>(false);

  const [songs, setSongs] = useState<Song[]>([]);
  const [songGenres, setSongGenres] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [fetchingSongs, setFetchingSongs] = useState<boolean>(false);

  const songsRef = useRef<Song[]>([]);
  const originalSongsRef = useRef<Song[]>([]);
  const dataFetchedRef = useRef(false);

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

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchSongs();
    fetchGenres();
  }, [fetchGenres, fetchSongs]);

  return (
    <div>
      <MenuHeader>
        <LoopyLogo />
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

      <InfiniteScroll
        dataLength={songs.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
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
    </div>
  );
}

export default Preview;
