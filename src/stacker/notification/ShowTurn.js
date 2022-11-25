import React from "react";

const ShowTurn = ({ turn, notifyTurn }) => {
  const username = sessionStorage.getItem("username");
  return (
    <div
      className="stacker__turn"
      data-anim={notifyTurn}
      style={{ color: `${turn === username ? "#009606" : "rgb(249, 56, 56)"}` }}
    >
      {turn === username ? "Your Turn" : `${turn}'s Turn`}
    </div>
  );
};

export default ShowTurn;
