import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {SERVER_ENDPOINT} from "./constants";
import styled from "styled-components";
import userIcon from "./assets/userIcon.svg";

interface Board {
  username: string;
  song_count: number;
}

interface Props {
  inModal?: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  position: ${(props) => (props.inModal ? "relative" : "absolute")};
  right: ${(props) => (props.inModal ? "unset" : "2%")};
  background-color: #eef2ff;
  margin: 10px 24px 5px 10px;
  padding: 15px 7px;
  width: 100%;
  max-height: 300px;
  max-width: 350px;
  align-items: center;
  border: 0;
  border-radius: 5px;
`;
export const HeadingRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HeaderMessage = styled.div`
  color: #9ca3af;
  font-size: 12px;
  font-weight: 700;
  font-family: sans-serif;
  position: relative;
  left: 6px;
`;

export const HeaderText = styled.div`
  font-weight: bold;
  color: rgb(93, 93, 255);
  font-size: 22px;
  font-family: "Helvetica Neue", sans-serif;
  letter-spacing: 0.5px;
`;
export const List = styled.ul`
  margin-top: 8px;
  position: relative;
  left: 13px;
`;

export const ListRow = styled.div`
  display: flex;
  flex-direction: "row";
`;

export const UserRanking = styled.div`
  margin-bottom: 10px;
  display: flex;
  background: rgb(93, 93, 255);
  // background: #6e79d6;
  color: white;
  font-weight: bold;
  font-size: 14px;
  width: 20px;
  height: 20px;
  text-align: center;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: light;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: relative;
  top: 5px;
  right: 5px;
`;

export const ListItem = styled.li`
  list-style: none;
  margin-bottom: 5px;
`;
export const linkStyle = {
  textDecoration: "none",
};

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Username = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  color: #525f7f;
  font-size: 15px;
  font-weight: 700;
  margin-top: 3px;
  margin-bottom: 1px;
`;

export const SongCount = styled.div`
  color: #9ca3af;
  font-size: 12px;
  font-weight: 700;
  font-family: sans-serif;
`;

export const SVG = styled.img`
  width: 1.6rem;
  margin-right: 6px;
`;

const LeaderBoard: React.FC<Props> = ({inModal}) => {
  const [leaderboard, setLeaderboard] = useState<Board[]>([]);
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await axios.get(
          `${SERVER_ENDPOINT}/weekly_leaderboard`
        );
        setLeaderboard(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    };
    loadLeaderboard();
  }, []);
  return (
    <Container inModal={inModal}>
      <div
        style={{display: "flex", alignItems: "center", flexDirection: "column"}}
      >
        <HeadingRow>
          <SVG src={userIcon} />
          <HeaderText>Leaderboard</HeaderText>
        </HeadingRow>

        <HeaderMessage>top posters this week</HeaderMessage>
        <List>
          {leaderboard.map((item, i) => {
            const link = `/${item.username}`;
            const songCountText =
              item.song_count === 1
                ? `${item.song_count} song`
                : `${item.song_count} songs`;
            return (
              <Link to={link} style={linkStyle}>
                <ListRow>
                  <UserRanking>{i + 1}</UserRanking>

                  <ListItem key={i}>
                    <UserContainer>
                      <Username> {item.username}</Username>
                      <SongCount>{songCountText}</SongCount>
                    </UserContainer>
                  </ListItem>
                </ListRow>
              </Link>
            );
          })}
        </List>
      </div>
    </Container>
  );
};

export default LeaderBoard;
