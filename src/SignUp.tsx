import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 24px;
`;

export const InputBox = styled.input`
  margin-bottom: 10px;
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

export const SignUpButton = styled.button`
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
  margin-bottom: 15px;
  text-align: center;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const SignUp = () => {
  return (
    <SignUpForm>
      <InputBox placeholder="Email" />

      <InputBox placeholder="Password" />
      <SignUpButton>Sign Up</SignUpButton>
    </SignUpForm>
  );
};

export default SignUp;
