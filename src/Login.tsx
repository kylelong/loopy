import React, {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import LoopyLogo from "./LoopyLogo";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  align-items: center;
  border-radius: 0.75rem;
  background-color: #f8fafc;
  box-shadow: 0 10px 15px -3px rgb(203, 213, 225),
    0 4px 6px -4px rgb(203, 213, 225);
  padding: 42px;
  margin: 24px;
`;

export const HeaderText = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -1px;
  color: rgb(17, 17, 17);
  max-width: 800px;
  width: 100%;
  margin-bottom: 24px;
  max-width: 256px;
  width: 100%;
`;

export const InputBox = styled.input`
  max-width: 256px;
  width: 100%;
  height: 40px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;
  border: 1.5px solid #d1d5db;
  border-radius: 3px;
  padding-left: 1rem;
  &:focus {
    outline: none;
    border-color: rgb(93, 93, 255);
  }
`;

export const LoginButton = styled.button`
  height: 45px;
  max-width: 259px;
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

export const Label = styled.label`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 14px;
  margin-bottom: 6px;
`;

export const NoAccount = styled.div`
  font-family: sans-serif;
  font-size: 14px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  max-width: 256px;
  width: 100%;
`;
export const linkStyle = {
  textDecoration: "none",
  fontFamily: "Helvetica Neue, sans-serif",
  color: "rgb(93, 93, 255)",
};
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <Container>
      <LoginForm>
        <div style={{position: "relative", right: "24px"}}>
          <LoopyLogo />
        </div>
        <HeaderText>Sign in to Loopy</HeaderText>
        <InputContainer>
          <Label>Email</Label>
          <InputBox onChange={handleEmail} />
        </InputContainer>

        <InputContainer>
          <Label>Password</Label>
          <InputBox type="password" onChange={handlePassword} />
        </InputContainer>
        <InputContainer>
          <LoginButton onClick={login}>Login</LoginButton>
        </InputContainer>
        <NoAccount>
          Don't have an account?{" "}
          <Link to="/signup" style={linkStyle}>
            Sign up
          </Link>
        </NoAccount>
      </LoginForm>
    </Container>
  );
};

export default Login;
