import { io } from "socket.io-client";

//althaf-game.herokuapp.com
// localhost:3001
const URL = "https://side-stacker-game.onrender.com/";

const socket = io(URL, {
  reconnectionDelayMax: 10000,
  transports: ["websocket"],
});

export default socket;
