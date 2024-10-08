import React, {useEffect, useState} from "react";

import {Link} from "react-router-dom";
import styled from "styled-components";
import LoopyLogo from "./LoopyLogo";
import {validEmail, validUsername, userExists} from "./functions";
import {SERVER_ENDPOINT} from "./constants";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User,
  UserCredential,
} from "firebase/auth";
import {auth} from "./firebase-config";
import axios from "axios";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px;
`;

export const SignupForm = styled.form`
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
  margin-bottom: 24px;
`;

export const FormError = styled.div`
  margin-top: 4px;
  margin-bottom: 12px;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 14px;
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

export const SignupButton = styled.button`
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
  font-size: 15px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  max-width: 256px;
  width: 100%;
`;

export const PasswordText = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  color: rgb(82, 95, 127);
  font-size: 13px;
  margin-top: 3px;
  margin-left: 3px;
  &:hover {
    cursor: pointer;
  }
`;

export const linkStyle = {
  textDecoration: "none",
  fontFamily: "Helvetica Neue, sans-serif",
  color: "rgb(93, 93, 255)",
};

export const ErrorList = styled.ul`
  text-align: left;
  font-family: "Helvetica Neue", sans-serif;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  /**
   * TODO: errors
   * 1. check if username exists in postgres database
   * 2. valid [a-z]{2,30}
   */
  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value.toLowerCase());
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const insertUser = async (userCredential: UserCredential) => {
    try {
      const uid = userCredential.user.uid;
      await axios.post(`${SERVER_ENDPOINT}/register`, {
        email: email,
        uid: uid,
        username: username,
      });
      localStorage.setItem("username", username);
    } catch (err) {
      console.log(err);
    }
  };

  const sendConfirmationEmail = async (user: User) => {
    if (user) {
      let actionCodeSettings = {
        url:
          process.env.REACT_APP_NODE_ENV === "production"
            ? process.env.REACT_APP_LIVE_URL!
            : process.env.REACT_APP_LOCAL_URL!,
      };
      try {
        await sendEmailVerification(user, actionCodeSettings);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrors([]);
    let hasErrors = false;

    // empty checks
    if (email.length === 0) {
      hasErrors = true;
      setErrors((errors) => [...errors, "Please enter an email."]);
    }
    if (password.length === 0) {
      hasErrors = true;
      setErrors((errors) => [...errors, "Please enter a password."]);
    }

    if (username.length === 0) {
      hasErrors = true;
      setErrors((errors) => [...errors, "Please enter a username."]);
    }
    //  check if username is valid
    if (username.length > 0 && !validUsername(username)) {
      hasErrors = true;
      setErrors((errors) => [
        ...errors,
        "Username must be between 2 and 30 lowercase letters long with numbers or ('.', '_') only.",
      ]);
    }

    // check if username exists
    try {
      const response = await userExists(username);
      if (response) {
        hasErrors = true;
        setErrors((errors) => [...errors, "This username is already taken."]);
      }
    } catch (err) {
      console.error(err);
    }

    // validate email
    if (email.length > 0 && !validEmail(email)) {
      hasErrors = true;
      setErrors((errors) => [...errors, "Please enter a valid email"]);
    }

    if (!hasErrors) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          insertUser(userCredential);
          sendConfirmationEmail(userCredential.user);
        })
        .catch((error) => {
          const ERRORS = [
            [
              "auth/email-already-in-use",
              "Email is alreay in use. Please log in.",
            ],
            ["auth/invalid-email", "Invalid email, please try again"],
            [
              "auth/operation-not-allowed",
              "Operation not allowed, double check and try again",
            ],
            [
              "auth/weak-password",
              "Password is too weak, please add more complexity",
            ],
          ];
          const ERROR_CODES = ERRORS.map((item) => item[0]);
          const errorCode = error.code;
          if (ERROR_CODES.includes(errorCode)) {
            let error_array: string[][] = ERRORS.filter(
              (item) => item[0] === errorCode
            );
            let error_message: string = error_array[0][1];
            setErrors((errors) => [...errors, error_message]);
          }
        });
    }
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <SignupForm>
        <div style={{position: "relative", right: "24px"}}>
          <LoopyLogo />
        </div>
        <HeaderText>Create your Loopy account</HeaderText>
        <InputContainer>
          <Label>Email</Label>
          <InputBox onChange={handleEmail} />
        </InputContainer>
        <InputContainer>
          <Label>Username</Label>
          <InputBox onChange={handleUsername} />
        </InputContainer>

        <InputContainer>
          <Label>Password</Label>
          <InputBox
            type={hidePassword ? "password" : "text"}
            onChange={handlePassword}
          />
          <PasswordText onClick={() => setHidePassword(!hidePassword)}>
            {hidePassword ? "show" : "hide"}
          </PasswordText>
        </InputContainer>

        {errors.length > 0 && (
          <ErrorList>
            {" "}
            {errors &&
              errors.map((error, item) => {
                return <li key={item}>{error}</li>;
              })}
          </ErrorList>
        )}

        <InputContainer>
          <SignupButton onClick={register}>Sign up</SignupButton>
        </InputContainer>

        <NoAccount>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </NoAccount>
      </SignupForm>
    </Container>
  );
};

export default SignUp;
