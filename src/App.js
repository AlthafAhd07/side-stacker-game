import { useEffect, useState } from "react";

import "./App.css";

import Stacker from "./stacker/index";

import socket from "./socket";
import StackerProvider from "./context/stacker.context";
import Welcome from "./stacker/welcome";

function App() {
  const [currentUser, setCurrentUser] = useState(() =>
    sessionStorage.getItem("username")
  );
  const [showWelcome, setShowWelcome] = useState(false);

  const visited = localStorage.getItem("visited");

  useEffect(() => {
    if (!visited) {
      localStorage.setItem("visited", true);
      setShowWelcome(true);
    }
  }, []);

  if (!!!currentUser) {
    let user = prompt("Please enter your name");

    if (user === null) {
      user = `user${(Math.random() * 100).toFixed()}`;
    }

    setCurrentUser(user);
    sessionStorage.setItem("username", user);
  }

  useEffect(() => {
    if (!!currentUser) {
      socket.auth = { username: currentUser };
      socket.connect();
    }
    return () => socket.close();
  }, [currentUser]);

  useEffect(() => {
    let removeWelcome;

    if (showWelcome) {
      removeWelcome = setTimeout(() => {
        setShowWelcome(false);
      }, 13000);
    }
    return () => clearTimeout(removeWelcome);
  }, [showWelcome]);

  return (
    <div className="App">
      {showWelcome && <Welcome setShowWelcome={setShowWelcome} />}

      {!showWelcome && (
        <StackerProvider>
          <Stacker setShowWelcome={setShowWelcome} />
        </StackerProvider>
      )}
    </div>
  );
}

export default App;
