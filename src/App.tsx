import React from "react";
import "./App.css";
import styled from "styled-components";
// import Share from "./Share";
export const Saying = styled.div`
  font-family: "Satoshi Black", serif;
  font-size: 42px;
  color: rgb(17, 17, 17);
  font-weight: 400;
`;
function App() {
  return (
    <div>
      <Saying>Find songs you love from people that already do</Saying>
    </div>
  );
}

export default App;
