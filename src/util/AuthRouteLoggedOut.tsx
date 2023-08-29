import React from "react";
import {auth} from "../firebase-config";
import {useAuthState} from "react-firebase-hooks/auth";
import {Outlet, Navigate} from "react-router-dom";
import Loader from "../Loader";

const AuthRouteLoggedOut = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return <Outlet />;
  }
  return (
    <>
      <Navigate to="/" />
    </>
  );
};

export default AuthRouteLoggedOut;
