import axios from "axios";
import {SERVER_ENDPOINT} from "./constants";

export const validEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export const validUsername = (username: string) => {
  const regex = /^[a-z0-9_.]{2,30}$/;
  return regex.test(username);
};

export const userExists = async (username: string) => {
  const response = await axios.get(
    `${SERVER_ENDPOINT}/username_exist/${username}`
  );
  const count = parseInt(response.data.count);
  return count === 1;
};

export const validSpotifyLink = (link: string) => {
  const regex = /https:\/\/open\.spotify\.com\/track\/.*\?si=.+/;
  const regexTwo = /https:\/\/spotify\.link\/.+/;
  const regexThree = /https:\/\/open\.spotify\.com\/track\/.*/;
  return regex.test(link) || regexTwo.test(link) || regexThree.test(link);
};

export const isShortenSpotifyLink = (link: string) => {
  const regex = /https:\/\/spotify\.link\/.+/;
  return regex.test(link);
};

export const validSoundCloudLink = (link: string) => {
  const regexOne = /https:\/\/on\.soundcloud\.com\/.+/;
  const regexTwo = /https:\/\/soundcloud\.com\/.+/;
  const regexThree = /https:\/\/soundcloud\.app\.goo\.gl\/.+/;

  return regexOne.test(link) || regexTwo.test(link) || regexThree.test(link);
};

export const validTidalLink = (link: string) => {
  const regex = /https:\/\/tidal\.com\/(track|browse\/track)\/\d+/;
  return regex.test(link);
};

export const validYoutubeLink = (link: string) => {
  /**
   * https://youtu.be/QlJ3s9TNcuM?si=LudEkdLK59oeAK2J
   * https://www.youtube.com/watch?v=QlJ3s9TNcuM&list=WL&index=6
   * https://youtu.be/yEMZCwftYXM?si=9U9Ces-HxQYh96nQ
   */
  const regexOne = /https:\/\/youtu\.be\/.+\?si=.+/;
  const regexTwo = /https:\/\/www.youtube\.com\/watch\?v=.+/;
  return regexOne.test(link) || regexTwo.test(link);
};
