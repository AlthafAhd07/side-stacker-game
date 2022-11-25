import React, { useContext } from "react";
import { StackerContext } from "../context/stacker.context";
import socket from "../socket";
import { INITIAL_STATE } from "./initalState";

const StackerTop = () => {
  const username = sessionStorage.getItem("username");

  const {
    currentGame,
    setCurrentGame,
    setItems,
    setWin,
    currentTurn,
    timer,
    setTimer,
    usedBlanks,
    setUsedBlanks,
    setCurrentTurn,
  } = useContext(StackerContext);

  function LeaveRoom() {
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
  }
  function ResetGame() {
    setItems(INITIAL_STATE);
    setWin(null);
    setUsedBlanks(0);
    setTimer(15);
  }

  return (
    <div className="stakcer__top">
      <h1>Side Stacker Game</h1>
      <div className="stacker__showUser">
        <span className="top__username">{username}</span>{" "}
        {currentGame.opponent && <span>vs {currentGame.opponent}</span>}
      </div>

      <div className="stacker__instructions">
        <div>You can enter : " X " and " O "</div>
        <p>Color of your pieces : blue</p>
        <p>Color of opponent's pieces : red</p>
      </div>

      {currentGame.opponent && <button onClick={LeaveRoom}>Exit Game</button>}
      {!currentGame.opponent && <button onClick={ResetGame}>Reset Game</button>}

      <p className="unusedCount">
        {49 - usedBlanks} {49 - usedBlanks > 1 ? "Pieces" : "Piece"} Left
      </p>
      {currentGame.opponent && (
        <div className="stacker__timer" data-turn={currentTurn === username}>
          {timer}
        </div>
      )}
    </div>
  );
};

export default StackerTop;
