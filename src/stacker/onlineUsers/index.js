import React, { useContext, useState } from "react";

import "./onlineUsers.css";

import { ReactComponent as OnlineIcon } from "../../images/leadership-icon.svg";

import socket from "../../socket";
import { StackerContext } from "../../context/stacker.context";

const OnlineUsers = () => {
  const username = sessionStorage.getItem("username");

  const { onlineUsers } = useContext(StackerContext);

  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  function requestGame(data) {
    const opponent = data.username;

    const { inGame } = onlineUsers.find((i) => i.username === opponent);

    if (inGame) return;

    if (!username) {
      let user = prompt("Please enter your name");
      sessionStorage.setItem("username", user);
      alert("please try again");
    }
    socket.emit("requestGame", { from: username, to: opponent });
  }

  return (
    <div>
      <div
        className="showOnlineUsers"
        onClick={() => setShowOnlineUsers((old) => !old)}
      >
        <OnlineIcon className="showOnlineIcon" />
      </div>
      <div className="onlineUsers" data-show={showOnlineUsers}>
        <h2>Online Users</h2>
        <ul>
          {onlineUsers.length < 1 && "No Online Users"}
          {onlineUsers?.map((i) => {
            return (
              <li key={i.username} onClick={() => requestGame(i)}>
                {i.username} - {i.inGame ? "On Another Game" : "Play Now"}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OnlineUsers;
