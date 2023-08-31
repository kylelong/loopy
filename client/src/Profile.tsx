import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {validUsername, userExists} from "./functions";
import LoopyLogo from "./LoopyLogo";

/* invalid username / 404 styles */
export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 10px;
`;

export const ErrorCode = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 900;
  font-size: 3rem;
  letter-spacing: 2px;
  line-height: 1;
  margin-bottom: 24px;
`;

export const Message = styled.div`
  font-size: 18px;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: light;
  margin-bottom: 24px;
`;
export const HomeButton = styled.button`
  height: 45px;
  display: flex;
  align-items: center;
  padding: 20px;
  max-width: 100px;
  width: 100%;
  border: 0px;
  border-radius: 3px;
  background: rgb(93, 93, 255);
  color: white;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 15px;
  text-align: center;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
export const linkStyle = {
  textDecoration: "none",
};

export const Profile = () => {
  const params = useParams();
  const username = params.username || "";

  const [pageNotFound, setPageNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!validUsername(username)) {
      setPageNotFound(true);
    } else {
      userExists(username).then((result) => {
        if (!result) {
          setPageNotFound(true);
        }
      });
    }
  });
  if (pageNotFound) {
    return (
      <div>
        <NotFoundContainer>
          <LoopyLogo />
          <ErrorCode>404</ErrorCode>
          <Message>Page Not Found</Message>
          <Link to="/" style={linkStyle}>
            <HomeButton>Home</HomeButton>
          </Link>
        </NotFoundContainer>
      </div>
    );
  }
  return (
    <>
      <div>{params.username}</div>
    </>
  );
};

export default Profile;
