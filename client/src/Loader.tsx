import React from "react";
import {ThreeDots} from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="rgb(93, 93, 255)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};
export default Loader;
