import { io } from "socket.io-client";
////chatapp-backend-althaf.herokuapp.com
//althaf-game.herokuapp.com
const URL = "ws://althaf-game.herokuapp.com";

const socket = io(URL, {
  reconnectionDelayMax: 10000,
  transports: ["websocket"],
});

export default socket;
