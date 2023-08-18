import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 24px;
`;

export const InputBox = styled.input`
  margin-bottom: 10px;
  width: 256px;
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
  width: 259px;
  border: 0px;
  border-radius: 3px;
  background: rgb(93, 93, 255);
  color: white;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Login = () => {
  return (
    <LoginForm>
      <div>welcome back</div>
      <InputBox placeholder="Email" />

      <InputBox placeholder="Password" />
      <LoginButton>Login</LoginButton>
    </LoginForm>
  );
};

export default Login;
