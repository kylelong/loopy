import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import SignUp from "./SignUp";
import Share from "./Share";
import Profile from "./Profile";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/share" element={<Share />}></Route>
          <Route path="/:username" element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
