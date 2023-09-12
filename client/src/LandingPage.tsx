import React from "react";
import "./App.css";
import styled from "styled-components";
import music from "./assets/music.svg";
import heart from "./assets/heart.svg";
import globe from "./assets/globeEuropeAfrica.svg";
import arrowLongRight from "./assets/arrowLongRight.svg";
// import Share from "./Share";
import magnifyingGlass from "./assets/magnifyingGlass.svg";
import play from "./assets/play.svg";
import Carousel from "./Carousel";
import {Link} from "react-router-dom";
import spotify from "./assets/spotify.png";
import youtube from "./assets/youtube.jpeg";
import soundcloud from "./assets/soundcloud.png";
export const Saying = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 42px;
  font-weight: bold;
  letter-spacing: -1px;
  color: rgb(17, 17, 17);
  max-width: 800px;
  width: 100%;
`;

export const Listening = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-weight: bold;
  font-size: 23px;
  margin-top: 18px;
  color: rgb(17, 17, 17);
  max-width: 800px;
  width: 100%;
  letter-spacing: -0.5px;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 530px;
  width: 100%;
`;

export const Music = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
  top: 27px;
  right: 19px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const ListenBtn = styled.button`
  width: 230px;
  background-color: #e2e8f0;
  color: rgb(93, 93, 255);
  font-weight: 700;
  font-size: 1rem;
  height: 50px;
  border-color: transparent;
  border-width: 1px;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgb(0, 0, 0, 0.05);
  margin-top: 8px;
  margin-bottom: 8px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  @media (max-width: 400px) {
    max-width: 230px;
    width: 100%;
  }
`;

export const SignUpBtn = styled.button`
  width: 130px;
  background-color: rgb(93, 93, 255);
  color: white;
  font-size: 1rem;
  height: 50px;
  border-color: transparent;
  border-width: 1px;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgb(0, 0, 0, 0.05);
  margin-top: 8px;
  font-weight: 700;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  @media (max-width: 400px) {
    width: 230px;
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 350px) {
    display: flex;
    flex-direction: column;
  }
`;
export const LogoHeader = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 350px) {
    position: relative;
    right: 15px;
  }
`;
export const Logo = styled.div`
  font-weight: bold;
  color: rgb(17, 17, 17);
  font-size: 22px;
  font-family: "Helvetica Neue", sans-serif;
  margin: 24px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 10px;
`;

export const MenuItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 560px;
  width: 100%;
  border-radius: 0.75rem;
  background-color: #f8fafc;
  box-shadow: 0 10px 15px -3px rgb(203, 213, 225),
    0 4px 6px -4px rgb(203, 213, 225);
  padding: 12px;
  margin: 24px;
  position: relative;
  left: 14px;
  @media (max-width: 600px) {
    left: unset;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`;

export const SectionHeaderText = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-weight: bold;
  font-size: 24px;
  margin-top: 18px;
  color: rgb(93, 93, 255);
  max-width: 800px;
  width: 100%;
  letter-spacing: -0.5px;
`;
export const Heart = styled.img`
  width: 1.7rem;
  margin-right: 12px;
  position: relative;
  top: 11px;
`;
export const Globe = styled.img`
  width: 1.7rem;
  margin-right: 12px;
  position: relative;
  top: 9px;
`;

export const ArrowLongRight = styled.img`
  width: 1.7rem;
  margin-right: 12px;
  position: relative;
  top: 9px;
`;

export const MagnifyingGlass = styled.img`
  width: 1.7rem;
  margin-right: 12px;
  position: relative;
  top: 11px;
`;

export const Play = styled.img`
  width: 1.7rem;
  margin-right: 12px;
  position: relative;
  top: 11px;
`;

export const Description = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 380;
  margin-bottom: 6px;
  font-size: 18px;
`;

export const Discover = styled.button`
  display: flex;
  flex-direction: row;
  max-width: 250px;
  align-items: center;

  width: 100%;
  background-color: rgb(93, 93, 255);
  color: white;
  font-size: 1rem;
  height: 50px;
  margin-bottom: 12px;
  border-color: transparent;
  border-width: 1px;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgb(0, 0, 0, 0.05);
  margin-top: 8px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
export const SongSource = styled.img`
  width: 21px;
  height: 21px;
  margin-right: 12px;
`;

export const linkStyle = {
  textDecoration: "none",
};
// https://soundcloud.com/thewebbyawards/the-juan-maclean-happy-house?si=e558539c189f40b691a6aaca00dd512e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
// https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F16959100&show_artwork=true

/**
 * CAROUSEL
 * https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F16959100&show_artwork=true
 * https://youtu.be/uJe-MAqNrmg
 */
function LandingPage() {
  return (
    <div>
      <MenuHeader>
        <LogoHeader>
          <Logo>loopy</Logo>
          <Music src={music} />
        </LogoHeader>

        <MenuItems>
          <Link to="/login" style={linkStyle}>
            <MenuItem>Login</MenuItem>
          </Link>
        </MenuItems>
      </MenuHeader>
      <Container>
        <Header>
          <Saying>
            Discover songs you love from people that already love them.
          </Saying>
          <ButtonContainer>
            <div style={{marginRight: "24px"}}>
              <Link to="/preview" style={linkStyle}>
                <ListenBtn>Listen to new music</ListenBtn>
              </Link>
            </div>
            <div>
              <Link to="/signup" style={linkStyle}>
                <SignUpBtn>Sign up</SignUpBtn>
              </Link>
            </div>
          </ButtonContainer>
          <div
            style={{display: "flex", flexDirection: "row", marginTop: "32px"}}
          >
            <Globe src={globe} />
            <Listening>
              What are people listening to around the world?
            </Listening>
          </div>
        </Header>
        <Carousel inProfile={false} />
        <Section>
          <SectionHeader>
            <Heart src={heart} />
            <SectionHeaderText>
              share the songs you really love
            </SectionHeaderText>
          </SectionHeader>
          <Description>
            upload a link to your{" "}
            <b>
              <i>all-time</i>
            </b>{" "}
            favorite songs.
          </Description>
          <Description>
            the kind of songs when you first heard it you listened to it on
            repeat for 3 days straight.
          </Description>
          <Description>
            we currently support links from spotify, youtube, and soundcloud.
          </Description>
          <Description>
            <SongSource src={spotify} />
            <SongSource src={youtube} style={{width: "30px"}} />
            <SongSource src={soundcloud} style={{width: "36px"}} />
          </Description>
        </Section>
        <Section>
          <SectionHeader>
            <MagnifyingGlass src={magnifyingGlass} />
            <SectionHeaderText>explore songs from 50+ genres</SectionHeaderText>
          </SectionHeader>

          <Description>
            different genres from all kinds of artist, from all around the
            world.
          </Description>
          <Description>from house to rap, we got range covered.</Description>
        </Section>
        <Section>
          <SectionHeader>
            <Play src={play} />
            <SectionHeaderText>
              find and play your new favorite songs
            </SectionHeaderText>
          </SectionHeader>
          <Description>
            there are so many beautiful songs in the world we may never hear.{" "}
          </Description>
          <Description>
            someone else really loves this song, hopefully you will too{" "}
            <span>🤞🏾</span>.
          </Description>
        </Section>{" "}
        <Discover>
          <Link to="/preview" style={linkStyle}>
            <div style={{marginLeft: "27px", color: "white"}}>
              Discover new music{" "}
            </div>
          </Link>
          <ArrowLongRight
            src={arrowLongRight}
            style={{marginBottom: "17px", marginLeft: "10px"}}
          />{" "}
        </Discover>
      </Container>

      {/* <Share /> */}
    </div>
  );
}

export default LandingPage;
