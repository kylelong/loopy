import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import SignUp from "./SignUp";
import Account from "./Account";
import Share from "./Share";
import Profile from "./Profile";
import SongViewer from "./SongViewer";
import AuthRoute from "./util/AuthRoute";
import AuthRouteLoggedOut from "./util/AuthRouteLoggedOut";
import Preview from "./Preview";

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
            <Route path="/account" element={<Account />}></Route>
          </Route>
          <Route path="/:username" element={<Profile />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
          <Route path="/song/:hash" element={<SongViewer />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
