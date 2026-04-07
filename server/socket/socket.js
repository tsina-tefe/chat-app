import { roomHandler } from "./roomHandler.js";
import { messageHandler } from "./messageHandler.js";
import jwt from "jsonwebtoken";

export const initSocket = (io) => {
  console.log("io");
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      console.log(socket.user);
      next();
    } catch (err) {
      console.error("Auth Error:", err.message);
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User has connected: ", socket.id);

    roomHandler(io, socket);

    messageHandler(io, socket);
  });
};
