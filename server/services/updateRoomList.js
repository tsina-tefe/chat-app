export const updateRoomList = (io, socket) => {
  socket.on("update_room_list", () => {
    socket.emit("room_list");
  });
};
