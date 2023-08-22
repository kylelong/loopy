import React from "react";
import {useParams} from "react-router-dom";

const Profile = () => {
  const params = useParams();
  console.log(params.username);
  // TODO: make sure username exists
  return (
    <>
      <div>{params.username}</div>
    </>
  );
};

export default Profile;
