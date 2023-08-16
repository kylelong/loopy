import React from "react";
import "./App.css";
import styled from "styled-components";
import music from "./assets/music.svg";
// import Share from "./Share";
import heart from "./assets/heart.svg";
export const Saying = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 42px;
  font-weight: bold;
  letter-spacing: -1px;
  color: rgb(17, 17, 17);
  max-width: 530px;
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
  margin-top: 6px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
export const LogoHeader = styled.div`
  display: flex;
  flex-direction: row;
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
function App() {
  return (
    <div>
      <LogoHeader>
        <Logo>loopy</Logo>
        <Music src={music} />
      </LogoHeader>
      <Container>
        <Header>
          <Saying>Discover songs you love from people that already do </Saying>
          <SignUpBtn>Sign up</SignUpBtn>
        </Header>
      </Container>
    </div>
  );
}

export default App;
