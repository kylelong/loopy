import React, {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import LoopyLogo from "./LoopyLogo";
import {SUPABASE} from "./constants";
import {LoginErrors} from "./types/errors";
import {validEmail} from "./functions";

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

export const FormError = styled.div`
  margin-top: 4px;
  margin-bottom: 12px;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 14px;
`;
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginErrors>({
    invalidEmail: false,
    emptyEmail: false,
    emptyPassword: false,
    accountNotFound: false,
    invalidLogin: false,
  });

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const userNotFound = async (email: string) => {
    const {data, error} = await SUPABASE.from("users")
      .select()
      .eq("email", email);
    if (error) {
      console.log(error);
    }
    if (validEmail(email)) {
      if (email && password) {
        if (data && data.length === 0) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            accountNotFound: true,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            accountNotFound: false,
          }));
        }
      }
    }

    return data && data.length === 0;
  };

  const noErrors = () => {
    return Object.values(errors).every((el) => el === false);
  };

  const signInWithEmail = async () => {
    const {data, error} = await SUPABASE.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(error);
    if (data && data.session === null && data.user === null) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        invalidLogin: true,
      }));
    } else if (data && data.session != null && data.user != null) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        invalidLogin: false,
      }));
    }
  };

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

    const hasNoErrors = noErrors();

    const emailNotFound = await userNotFound(email);

    if (hasNoErrors && !emailNotFound && email && password) {
      signInWithEmail();
    }
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

        {errors.emptyEmail && <FormError>Please enter an email. </FormError>}
        {errors.invalidEmail && (
          <FormError>Please enter a valid email. </FormError>
        )}
        {errors.emptyPassword && (
          <FormError>Please enter a password. </FormError>
        )}

        {errors.accountNotFound && (
          <FormError>
            An account with this email does not exist. Please sign up.{" "}
          </FormError>
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
