// socket.js
import { io } from "socket.io-client";

/* const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, { transports: ["websocket"] }); */

const socket=io("http://localhost:4000/"); //connect to backend
export default socket;
