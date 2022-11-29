import { io } from "socket.io-client";

//althaf-game.herokuapp.com
// localhost:3001
const URL = "ws://althaf-game.herokuapp.com";

const socket = io(URL, {
  reconnectionDelayMax: 10000,
  transports: ["websocket"],
});

export default socket;
