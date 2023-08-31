import React from "react";
import styled from "styled-components";
import music from "./assets/music.svg";
import {Link} from "react-router-dom";

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

export const Music = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
  top: 27px;
  right: 19px;
`;

export const linkStyle = {
  textDecoration: "none",
};

const LoopyLogo = () => {
  return (
    <>
      <Link to="/" style={linkStyle}>
        <LogoHeader>
          <Logo>loopy</Logo>
          <Music src={music} />
        </LogoHeader>
      </Link>
    </>
  );
};

export default LoopyLogo;
