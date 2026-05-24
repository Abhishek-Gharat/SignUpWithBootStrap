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

import Sent from "./components/Sent";

import MessageDetails from "./components/MessageDetails";

import Trash from "./components/Trash";

// Suppress findDOMNode deprecation warning
React.useLayoutEffect = React.useEffect;
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      args[0]?.includes?.('findDOMNode') ||
      (typeof args[0] === 'string' && args[0].includes('findDOMNode'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
}

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

        {/* Sent */}

        <Route
          path="/sent"
          element={<Sent />}
        />

        {/* Message Details */}

        <Route
          path="/message/:id"
          element={<MessageDetails />}
        />

        {/* Trash Folder */}

        <Route
          path="/trash"
          element={<Trash />}
        />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
