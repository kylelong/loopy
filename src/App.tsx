import React from "react";
import "./App.css";
import styled from "styled-components";
import music from "./assets/music.svg";
// import Share from "./Share";
// import heart from "./assets/heart.svg";
import Carousel from "./Carousel";

export const Saying = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 42px;
  font-weight: bold;
  letter-spacing: -1px;
  color: rgb(17, 17, 17);
  max-width: 800px;
  width: 100%;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 530px;
  width: 100%;
`;

// export const Heart = styled.img`
//   width: 85px;
//   height: 85px;
//   position: relative;
//   bottom: 2px;
//   right: 3px;
// `;
export const Music = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
  top: 27px;
  right: 19px;
`;
export const SignUpBtn = styled.button`
  max-width: 130px;
  width: 100%;
  background-color: rgb(93, 93, 255);
  color: white;
  font-size: 1rem;
  height: 50px;
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
  width: 200px;
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
  color: rgb(102, 102, 102);
  font-weight: bold;

  &:hover {
    color: rgb(93, 93, 255);
    cursor: pointer;
  }
`;

// https://soundcloud.com/thewebbyawards/the-juan-maclean-happy-house?si=e558539c189f40b691a6aaca00dd512e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
// https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F16959100&show_artwork=true

/**
 * CAROUSEL
 * https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F16959100&show_artwork=true
 * https://youtu.be/uJe-MAqNrmg
 */
function App() {
  return (
    <div>
      <MenuHeader>
        <LogoHeader>
          <Logo>loopy</Logo>
          <Music src={music} />
        </LogoHeader>

        <MenuItems>
          <MenuItem>FAQ</MenuItem>
          <MenuItem>About</MenuItem>
          <MenuItem>Login</MenuItem>
        </MenuItems>
      </MenuHeader>
      <Container>
        <Header>
          <Saying>
            Discover songs you love from people that already love them.
          </Saying>
          <SignUpBtn>Sign up</SignUpBtn>
        </Header>
        <Carousel />
      </Container>

      {/* <Share /> */}
    </div>
  );
}

export default App;
