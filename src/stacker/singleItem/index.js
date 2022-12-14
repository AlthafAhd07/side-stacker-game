import React, { useContext, useEffect } from "react";

import "./singleItem.css";

import { StackerContext } from "../../context/stacker.context";
import socket from "../../socket";
import checkWin from "../checkWin";

const SingleItem = ({ data, position: { row, item }, setNotifyTurn }) => {
  const username = sessionStorage.getItem("username") || "";

  const {
    items,
    setItems,

    setUsedBlanks,
    win,
    setWin,

    currentGame: { opponent, roomId },

    currentTurn,
    setCurrentTurn,

    setTimer,
  } = useContext(StackerContext);

  // check whose pience is this
  let itemOwner = "";
  if (data.owner === username) {
    itemOwner = "user";
  } else if (data.owner === opponent) {
    itemOwner = "opponent";
  }

  // here handling 2 types of input - throw keyboard and click
  function handleinput({ target, customInputValue }) {
    let value;
    if (customInputValue) {
      value = customInputValue.toUpperCase();
    } else {
      value = target?.value.toUpperCase();
    }

    if (currentTurn !== username) return;
    if (data.value) return;

    if (!(value === "X" || value === "O" || value.length < 1)) return;

    setUsedBlanks((old) => old + 1);
    setItems((old) => {
      return {
        ...old,
        [row]: {
          ...old[row],
          [item]: { value: value, owner: username },
        },
      };
    });

    if (roomId.length > 0) {
      socket.emit("opponentInput", {
        roomId,
        data: { row, item, value, owner: username },
      });
      socket.emit("sendTurn", { opponent, roomId });
      setCurrentTurn(opponent);
      setTimer(15);
      setNotifyTurn(true);
    }
  }

  // if values changes, check their is a chance to the user to win or lose the game
  useEffect(() => {
    if (data.value) {
      checkWin({ row, item, items, setItems, username, setWin });
    }
  }, [data.value]);

  // if a user win or lose , check the current piece is related to it, and display it in different colors
  let wonPiece;
  if (data?.wonPiece === "user") {
    wonPiece = "userWon";
  } else if (data.wonPiece === "opponent") {
    wonPiece = "OpponentWon";
  } else {
    wonPiece = "";
  }

  let disableInputsOnWinOrLose;
  if (win === true) {
    disableInputsOnWinOrLose = true;
  } else if (win === false) {
    disableInputsOnWinOrLose = true;
  } else if (win === null) {
    disableInputsOnWinOrLose = false;
  }

  return (
    <div className="stackerItem__wrapper">
      <input
        value={data.value || ""}
        className={`stacker__item ${itemOwner}`}
        id={wonPiece}
        type="text"
        readOnly={window.innerWidth < 450}
        onInput={handleinput}
        disabled={
          (!!data.value.length ? true : false) ||
          disableInputsOnWinOrLose ||
          currentTurn !== username
        }
        maxLength="1"
      />
      <div className="stacker__select" data-value={!!data.value}>
        <div onClick={() => handleinput({ customInputValue: "X" })}>X</div>
        <div onClick={() => handleinput({ customInputValue: "O" })}>O</div>
      </div>
    </div>
  );
};

export default SingleItem;
