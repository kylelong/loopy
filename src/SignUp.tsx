import React, {useEffect, useState} from "react";

import {Link} from "react-router-dom";
import {createClient} from "@supabase/supabase-js";
import styled from "styled-components";
import LoopyLogo from "./LoopyLogo";

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

export const UserExistsError = styled.div`
  margin-top: 8px;
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

interface Error {
  userExists: boolean;
  invalidEmail: boolean;
  emptyEmail: boolean;
  emptyPassword: boolean;
}

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Error>({
    userExists: false,
    invalidEmail: false,
    emptyEmail: false,
    emptyPassword: false,
  });

  // Create a single supabase client for interacting with your database

  const SUPABASE_URL: string = process.env.REACT_APP_SUPABASE_URL || "";
  const PUBLIC_KEY: string = process.env.REACT_APP_PUBLIC_ANON_KEY || "";

  const supabase = createClient(SUPABASE_URL, PUBLIC_KEY);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const hasUser = async (email: string) => {
    const {data, error} = await supabase
      .from("users")
      .select()
      .eq("email", email);
    if (error) {
      console.log(error);
    }
    if (data && data.length > 0) {
      setErrors({...errors, userExists: true});
    }
    return data && data.length > 0;
  };

  const insertUser = async (email: string) => {
    const {error} = await supabase.from("users").insert({email: email});
    if (error) {
      console.log("Insert error", error);
      if (error.code === "23505") {
        setErrors({...errors, userExists: true});
      }
    }

    /**
     * {code: '23505', details: 'Key (username)=() already exists.', hint: null, message: 'duplicate key value violates unique constraint "users_username_key"'}
     */
  };

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email && password) {
      const userExists = await hasUser(email);
      if (!userExists) {
        insertUser(email);
        const {data, error} = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        console.log(data, error); // data.role === authenticated
      }
    }
  };

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
          <UserExistsError>
            An account with this email already exists. Please log in.{" "}
          </UserExistsError>
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
