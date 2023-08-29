import React, {useEffect, useState} from "react";

import {Link} from "react-router-dom";
import styled from "styled-components";
import LoopyLogo from "./LoopyLogo";
import {validEmail} from "./functions";
import {SignUpErrors} from "./types/errors";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User,
  UserCredential,
} from "firebase/auth";
import {auth} from "./firebase-config";

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

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<SignUpErrors>({
    userExists: false,
    invalidEmail: false,
    emptyEmail: false,
    emptyPassword: false,
  });

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const insertUser = async (email: string) => {};

  const noErrors = () => {
    return Object.values(errors).every((el) => el === false);
  };

  const sendConfirmationEmail = async (user: User) => {
    if (user) {
      // let actionCodeSettings = {
      //     url: "http://localhost:3000/confirm_email?email="+ user.email
      // }
      try {
        await sendEmailVerification(user);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log(userCredential);
        sendConfirmationEmail(userCredential.user);
      }
    );

    if (email.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emptyEmail: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emptyEmail: false,
      }));
    }

    if (password.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emptyPassword: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emptyPassword: false,
      }));
    }
    if (email.length > 0 && !validEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        invalidEmail: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        invalidEmail: false,
      }));
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
          <Label>Password</Label>
          <InputBox type="password" onChange={handlePassword} />
        </InputContainer>
        {errors.userExists && (
          <FormError>
            An account with this email already exists. Please log in.{" "}
          </FormError>
        )}
        {errors.emptyEmail && <FormError>Please enter an email. </FormError>}
        {errors.invalidEmail && (
          <FormError>Please enter a valid email. </FormError>
        )}
        {errors.emptyPassword && (
          <FormError>Please enter a password. </FormError>
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
