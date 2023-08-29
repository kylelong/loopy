import React from "react";
import {auth} from "../firebase-config";
import {useAuthState} from "react-firebase-hooks/auth";
import {Outlet, Navigate} from "react-router-dom";
import Loader from "../Loader";

const AuthRoute = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return <Navigate to="/share" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthRoute;
