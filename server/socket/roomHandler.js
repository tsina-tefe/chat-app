export const roomHandler = (io, socket) => {
  socket.on("enterRoom", (message) => {
    socket.emit("enterRoom", `Welcome to the family ${message}`);
  });

  const prevRoom = socket.user.room;

  console.log(prevRoom);
};
