import React from "react";
import "./App.css";
import styled from "styled-components";
import music from "./assets/music.svg";
import Share from "./Share";
import heart from "./assets/heart.svg";
export const Saying = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 42px;
  font-weight: bold;
  letter-spacing: -1px;
  color: rgb(17, 17, 17);
  max-width: 463px;
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
  // background-color: #6e79d6;
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
  width: 100%;
  justify-content: center;
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

export const Circle = styled.div`
  width: 16px;
  height: 16px;
  background-color: rgb(93, 93, 255); /* You can change this color */
  border-radius: 50%; /* Makes the div a circle */
  margin-left: 5px;
`;

export const InactiveCircle = styled.div`
  width: 16px;
  height: 16px;
  background-color: rgb(102, 102, 102);
  border-radius: 50%;
  margin-left: 5px;
`;

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
      </Container>
      <Share />
      <Circle></Circle>
      <InactiveCircle></InactiveCircle>
    </div>
  );
}

export default App;
