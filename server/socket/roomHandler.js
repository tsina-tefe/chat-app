import { joinRoom } from "../services/joinService.js";
import { leaveRoom } from "../services/leaveService.js";
import { disconnectHandler } from "../services/diconnectService.js";

export const roomHandler = (io, socket) => {
  joinRoom(io, socket);

  leaveRoom(io, socket);

  disconnectHandler(io, socket);
};
