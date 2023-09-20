import React, {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import LoopyLogo from "./LoopyLogo";
import {validEmail} from "./functions";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "./firebase-config";

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
  font-size: 15px;
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

export const FormError = styled.div`
  margin-top: 4px;
  margin-bottom: 12px;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 14px;
`;

export const ErrorList = styled.ul`
  text-align: left;
  font-family: "Helvetica Neue", sans-serif;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const signInWithEmail = async () => {
    setErrors([]);
    let hasErrors = false;
    if (email.length === 0) {
      hasErrors = true;
      setErrors((errors) => [...errors, "Please enter an email"]);
    }
    if (password.length === 0) {
      hasErrors = true;
      setErrors((errors) => [...errors, "Please enter a password."]);
    }

    if (email.length > 0 && !validEmail(email)) {
      hasErrors = true;
      setErrors((errors) => [...errors, "Please enter a valid email"]);
    }
    if (!hasErrors) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // SIGNED IN
        })
        .catch((error) => {
          const ERRORS = [
            ["auth/wrong-password", "Wrong password, please try again"],
            ["auth/user-not-found", "Invalid credentials, please try again"],
            ["auth/invalid-email", "Invalid email, please try again"],
            [
              "auth/user-disabled",
              "The account you are trying to update has been disabled",
            ],
            [
              "too-many-requests",
              "Too many failed attempts, try again later or reset your password",
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

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    signInWithEmail();
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
