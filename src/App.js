import { useContext, useEffect } from "react";

import "./App.css";

import Stacker from "./stacker/index";
import Toast from "./stacker/notification/Toast";

import socket from "./socket";
import StackerProvider from "./context/stacker.context";

function App() {
  let user = sessionStorage.getItem("username");

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
      <StackerProvider>
        <Stacker />
      </StackerProvider>
    </div>
  );
}

export default App;
