import { joinRoom } from "../services/joinService.js";
import { leaveRoom } from "../services/leaveService.js";
import { disconnectHandler } from "../services/diconnectService.js";
import { updateRoomList } from "../services/updateRoomList.js";

export const roomHandler = (io, socket) => {
  joinRoom(io, socket);

  leaveRoom(io, socket);

  disconnectHandler(io, socket);

  updateRoomList(io, socket);
};
