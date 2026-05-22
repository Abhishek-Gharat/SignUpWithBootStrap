import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Signup from "./components/Signup";

import Login from "./components/Login";

import Welcome from "./components/Welcome";

import ComposeMail from "./components/ComposeMail";

import Inbox from "./components/Inbox";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Signup */}

        <Route
          path="/"
          element={<Signup />}
        />

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Welcome */}

        <Route
          path="/welcome"
          element={<Welcome />}
        />

        {/* Compose Mail */}

        <Route
          path="/compose"
          element={<ComposeMail />}
        />
        {/* Inbox */}

        <Route
          path="/inbox"
          element={<Inbox />}
        />        
      </Routes>

    </BrowserRouter>

  );
}

export default App;