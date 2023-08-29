import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import SignUp from "./SignUp";
import Share from "./Share";
import Profile from "./Profile";
import AuthRoute from "./util/AuthRoute";
import AuthRouteLoggedOut from "./util/AuthRouteLoggedOut";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Route>

          <Route element={<AuthRouteLoggedOut />}>
            <Route path="/share" element={<Share />}></Route>
            <Route path="/:username" element={<Profile />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
