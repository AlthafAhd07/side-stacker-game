import React, { useContext } from "react";

import "./toast.css";

import { ReactComponent as CrossIcon } from "../../images/close-line-icon.svg";

import { INITIAL_STATE } from "../initalState";

import socket from "../../socket";
import { StackerContext } from "../../context/stacker.context";

const Toast = ({ setNotifyTurn }) => {
  const username = sessionStorage.getItem("username");

  const {
    notification: toast,
    setNotification: setAlert,

    currentGame,
    setCurrentGame,

    setItems,

    setCurrentTurn,

    setWin,

    setTimer,
    setUsedBlanks,
  } = useContext(StackerContext);

  function acceptChallenge() {
    socket.emit("responceToRequest", {
      accepted: true,
      roomId: `${username}_${toast.from}`,
      from: username,
      to: toast.from,
    });

    setAlert((old) => ({ ...old, visible: false }));
    setItems(INITIAL_STATE);
    setCurrentGame({
      roomId: `${username}_${toast.from}`,
      opponent: toast.from,
    });
  }

  function StartGame() {
    socket.emit("StartPlay", toast?.data.roomId, username);
    setCurrentGame({ roomId: toast.data.roomId, opponent: toast.data.from });
    setItems(INITIAL_STATE);

    setCurrentTurn(username);
    setTimer(15);
    setNotifyTurn(true);

    setTimeout(() => {
      setNotifyTurn(false);
    }, 1000);

    setAlert((old) => ({ ...old, visible: false }));
  }

  function goBack() {
    socket.emit("leaveRoom", {
      roomId: currentGame.roomId,
      username,
      opponent: currentGame.opponent,
    });
    setItems(INITIAL_STATE);
    setCurrentGame({ roomId: "", opponent: "" });
    setWin(null);
    setUsedBlanks(0);
    setTimer(15);
    setCurrentTurn(username);
    setAlert((old) => ({ ...old, visible: false }));
  }

  return (
    <div
      className="toast"
      data-name={toast.visible}
      style={{
        backgroundColor: `${
          toast.type === "success" ? "rgb(9, 158, 54)" : "rgb(214, 10, 10)"
        }`,
      }}
    >
      <CrossIcon
        className="toast__crossIcon"
        onClick={() => {
          setAlert((old) => ({ ...old, visible: false }));
        }}
      />
      <p>
        {toast?.from} {toast?.msg}
      </p>
      {toast?.challenge && (
        <div>
          <button onClick={acceptChallenge}>Accept</button>
          <button>Reject</button>
        </div>
      )}
      {toast?.start && (
        <div>
          <button onClick={StartGame}>Start</button>
        </div>
      )}
      {toast?.finish && (
        <div>
          <button onClick={goBack}>Leave the Game</button>
        </div>
      )}
    </div>
  );
};

export default Toast;
