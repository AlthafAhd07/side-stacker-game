import { useContext, useEffect, useState } from "react";

import "./stacker.css";

import { INITIAL_STATE } from "./initalState";

import SingleItem from "./singleItem";
import StackerTop from "./stackerTop";
import Toast from "./notification/Toast";
import ShowTurn from "./notification/ShowTurn";

import socket from "../socket.js";
import { StackerContext } from "../context/stacker.context";

import { useDelayUnmount } from "delay-unmount";
import useAvoidFirstRender from "../hooks/useAvoidFirstRender";

import OnlineUsers from "./onlineUsers";

const Stacker = ({ setShowWelcome }) => {
  const username = sessionStorage.getItem("username");

  const {
    items,
    setItems,
    setOnlineUsers,
    usedBlanks,
    setUsedBlanks,
    currentGame,
    setCurrentGame,
    currentTurn,
    setCurrentTurn,
    setTimer,
    win,
    setWin,
    notification,
    setNotification,
  } = useContext(StackerContext);

  const [notifyTurn, setNotifyTurn] = useState(true);

  // custom Hooks
  const firstRender = useAvoidFirstRender();
  const showNotification = useDelayUnmount(notification?.visible, 900);
  const showTurn = useDelayUnmount(notifyTurn, 270);

  useEffect(() => {
    setCurrentTurn(username);
  }, [username]);

  // handle game Draw
  useEffect(() => {
    if (usedBlanks === 49 && win === null) {
      setNotification(() => {
        return {
          visible: true,
          finish: true,
          msg: "Game Draw",
          type: "success",
        };
      });
    }
  }, [items]);

  // handle socket requests and responcess
  useEffect(() => {
    socket.on("onlineusers", (data) => {
      if (data.length > 0) {
        setOnlineUsers(data);
      }
    });
    socket.on("updateOnline", (data) => {
      setOnlineUsers((old) => [...old, data]);
    });
    socket.on("updateGamingState", (data) => {
      setOnlineUsers((old) => {
        return old.map((item) => {
          if (item.username === data.username) {
            return {
              ...item,
              inGame: data.inGame,
            };
          } else {
            return item;
          }
        });
      });
    });
    socket.on("updateOffline", (data) => {
      setOnlineUsers((old) => old.filter((i) => i.username !== data));
    });

    socket.on("listenToRequests", (data) => {
      setNotification(() => {
        return {
          visible: true,
          from: data.from,
          msg: "Challenged you to play",
          challenge: true,
          type: "success",
        };
      });
    });

    socket.on("listenForRequestResponce", (data) => {
      setNotification(() => {
        return {
          visible: true,
          start: true,
          data: data,
          from: data.from,
          msg: "Accepted you request",
          type: "success",
        };
      });
    });

    socket.on("ReceiveOpponentInput", ({ row, item, owner, value }) => {
      setItems((old) => {
        return {
          ...old,
          [row]: {
            ...old[row],
            [item]: { value, owner },
          },
        };
      });
      setUsedBlanks((old) => (old += 1));
    });

    socket.on("listenOpponentLeft", () => {
      setCurrentGame((old) => {
        setNotification({
          visible: true,
          type: "err",
          msg: `${old.opponent} Left`,
        });
        socket.emit("ResponceOpponentLeft", {
          roomId: old.roomId,
        });
        return { roomId: "", opponent: "" };
      });

      setItems(INITIAL_STATE);
      setWin(null);
      setUsedBlanks(0);
      setTimer(15);
      setCurrentTurn(username);
    });

    socket.on("listenTurn", (data) => {
      setCurrentTurn(data);
      setTimer(15);
      setNotifyTurn(true);
    });
  }, [socket]);

  // sending the turn
  useEffect(() => {
    if (firstRender) {
      return;
    }
    if (!currentGame.opponent) return;

    if (win === true || win === false) return;

    const timeInterval = setInterval(() => {
      setTimer((old) => old - 1);
    }, 1000);

    const endTimer = setTimeout(() => {
      clearInterval(timeInterval);
      if (currentTurn === username) {
        socket.emit("sendTurn", currentGame);
        setCurrentTurn(currentGame.opponent);
        setTimer(15);
        setNotifyTurn(true);
      }
    }, 15000);

    return () => {
      clearTimeout(endTimer);
      clearInterval(timeInterval);
    };
  }, [currentTurn, currentGame.opponent, win]);

  // handle win or lose
  useEffect(() => {
    if (firstRender) return;

    if (!currentGame.opponent) return;

    if (win === true) {
      setNotification({
        msg: "You Won",
        finish: true,
        type: "success",
        visible: true,
      });
    } else if (win === false) {
      setNotification({
        msg: `${currentGame.opponent} Won`,
        finish: true,
        type: "err",
        visible: true,
      });
    }
  }, [win]);

  // showing the current turn to the user
  useEffect(() => {
    let notificationTimer;

    if (notifyTurn) {
      notificationTimer = setTimeout(() => {
        setNotifyTurn(false);
      }, 1000);
    }

    return () => notificationTimer;
  }, [currentTurn]);

  return (
    <div className="stacker">
      <StackerTop setShowWelcome={setShowWelcome} />

      {showTurn && currentGame.opponent && (
        <ShowTurn turn={currentTurn} notifyTurn={notifyTurn} />
      )}
      <main className="stacker__wrapper">
        {Object.keys(items).map((row) => {
          return (
            <div key={row} className="stacker__row">
              {Object.keys(items[row]).map((item) => {
                let data = items[row][item];
                return (
                  <SingleItem
                    key={`${row}_${item}`}
                    data={data}
                    position={{ row, item }}
                    setNotifyTurn={setNotifyTurn}
                  />
                );
              })}
            </div>
          );
        })}
      </main>
      <OnlineUsers />
      {showNotification && <Toast setNotifyTurn={setNotifyTurn} />}
    </div>
  );
};

export default Stacker;
