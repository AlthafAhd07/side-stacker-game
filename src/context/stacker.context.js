import { createContext, useState } from "react";

import { INITIAL_STATE } from "../stacker/initalState";

export const StackerContext = createContext({});

function StackerProvider({ children }) {
  const username = sessionStorage.getItem("username");

  const [items, setItems] = useState(INITIAL_STATE);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [usedBlanks, setUsedBlanks] = useState(0);

  const [currentGame, setCurrentGame] = useState({ roomId: "", opponent: "" });
  const [currentTurn, setCurrentTurn] = useState(username);
  const [timer, setTimer] = useState(15);

  const [win, setWin] = useState(null);

  const [notification, setNotification] = useState({
    visible: false,
    username,
    msg: "",
    type: "",
  });

  return (
    <StackerContext.Provider
      value={{
        items,
        setItems,

        onlineUsers,
        setOnlineUsers,

        usedBlanks,
        setUsedBlanks,

        currentGame,
        setCurrentGame,

        currentTurn,
        setCurrentTurn,

        timer,
        setTimer,

        win,
        setWin,

        notification,
        setNotification,
      }}
    >
      {children}
    </StackerContext.Provider>
  );
}

export default StackerProvider;
