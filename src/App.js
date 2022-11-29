import { useEffect, useState } from "react";

import "./App.css";

import Stacker from "./stacker/index";

import socket from "./socket";
import StackerProvider from "./context/stacker.context";
import Welcome from "./stacker/welcome";

function App() {
  let user = sessionStorage.getItem("username");
  const [showWelcome, setShowWelcome] = useState(false);

  const visited = localStorage.getItem("visited");

  useEffect(() => {
    if (!visited) {
      localStorage.setItem("visited", true);
      setShowWelcome(true);
    }
  }, []);

  if (!!!user) {
    user = prompt("Please enter your name");
    sessionStorage.setItem("username", user);
    while (user.length < 1) {
      user = prompt("Please enter your name");
      sessionStorage.setItem("username", user);
    }
  }

  useEffect(() => {
    if (!!user) {
      socket.auth = { username: user };
      socket.connect();
    }
    return () => socket.close();
  }, [user]);

  return (
    <div className="App">
      {showWelcome && <Welcome setShowWelcome={setShowWelcome} />}

      {!showWelcome && (
        <StackerProvider>
          <Stacker />
        </StackerProvider>
      )}
    </div>
  );
}

export default App;
