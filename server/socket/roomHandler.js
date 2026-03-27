import { buildMsg } from "../utils/buildMsg.js";
import db from "../config/db.js";

export const roomHandler = (io, socket) => {
  const ADMIN = "Admin";

  socket.on("join_room", async (data) => {
    const { roomId, userId } = data;

    try {
      // Fetch User and their PREVIOUS room from DB
      const [users] = await db
        .promise()
        .query(
          "SELECT username, avatar, current_room_id FROM users WHERE id = ?",
          [userId],
        );

      if (users.length === 0) return;
      const user = users[0];
      const previousRoomId = user.current_room_id;

      // LEAVE PREVIOUS ROOM (If they were in one and it's different)
      if (previousRoomId && previousRoomId !== roomId) {
        socket.leave(previousRoomId);

        socket.to(previousRoomId).emit("user_left", {
          userId: userId,
          message: buildMsg(ADMIN, `${user.name} has left the room`),
        });

        console.log(`User ${userId} left room: ${previousRoomId}`);
      }

      await db
        .promise()
        .query("UPDATE users SET current_room_id = ? WHERE id = ?", [
          roomId,
          userId,
        ]);

      // JOIN NEW ROOM
      socket.join(roomId);

      socket.to(roomId).emit("user_joined", {
        user: {
          id: userId,
          name: user.username,
          avatar: user.avatar,
        },
        message: buildMsg(ADMIN, `${user.username} has joined the room`),
      });

      // Send a confirmation back to the user who joined
      socket.emit("room_joined_success", {
        roomId: roomId,
        message: buildMsg(ADMIN, `You are now in ${roomId}`),
      });
    } catch (error) {
      console.error("Socket Join Error:", error);
      socket.emit("error", { message: "Could not join room" });
    }
  });

  socket.on("leave_room", async () => {
    const userId = socket.user.id;

    try {
      const [users] = await db
        .promise()
        .query("SELECT username, current_room_id FROM users WHERE id = ?", [
          userId,
        ]);

      if (users.length === 0 || !users[0].current_room_id) {
        console.log("user not in any room");
        return;
      }

      const roomId = users[0].current_room_id;
      const userName = users[0].username;

      // UPDATE DATABASE: Set room to NULL
      await db
        .promise()
        .query("UPDATE users SET current_room_id = NULL WHERE id = ?", [
          userId,
        ]);

      // SOCKET LEAVE: Physically remove them from the socket room
      socket.leave(roomId);

      // NOTIFY OTHERS
      socket.to(roomId).emit("user_left", {
        userId: userId,
        message: buildMsg(ADMIN, `${userName} has left the room`),
      });

      // ACKNOWLEDGE TO SENDER
      socket.emit("leave_success", {
        message: buildMsg(ADMIN, `You have left ${roomId}`),
      });

      console.log(`User ${userId} successfully left room: ${roomId}`);
    } catch (error) {
      console.error("Leave Room Error:", error);
      socket.emit("error", {
        message: buildMsg(ADMIN, "Error while leaving the room"),
      });
    }
  });

  socket.on("disconnecting", async () => {
    const userId = socket.user.id;

    const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);

    if (rooms.length > 0 && userId) {
      const roomId = rooms[0];

      try {
        const [users] = await db
          .promise()
          .query("SELECT username FROM users WHERE id = ?", [userId]);

        if (users.length > 0) {
          const userName = users[0].username;

          await db
            .promise()
            .query("UPDATE users SET current_room_id = NULL WHERE id = ?", [
              userId,
            ]);

          socket.to(roomId).emit("user_left", {
            userId: userId,
            message: buildMsg(ADMIN, `${userName} has disconnected`),
          });

          console.log(
            `User ${userId} (${userName}) disconnected and cleared from ${roomId}`,
          );
        }
      } catch (error) {
        console.error("Disconnect Error:", error);
      }
    }
  });
};
