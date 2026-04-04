import { buildMsg } from "../utils/buildMsg.js";
import db from "../config/db.js";

const ADMIN = "Admin";

export const joinRoom = (io, socket) => {
  socket.on("join_room", async (data) => {
    let { roomId, userId } = data;
    if (roomId === "null") {
      roomId = null;
    }

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

      // LEAVE PREVIOUS ROOM
      if (previousRoomId && previousRoomId !== roomId) {
        socket.leave(String(previousRoomId));

        socket.to(String(previousRoomId)).emit("user_left", {
          userId: userId,
          username: user.username,
          message: buildMsg(ADMIN, `${user.username} has left the room`),
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
      socket.join(String(roomId));

      socket.to(String(roomId)).emit("user_joined", {
        user: {
          id: userId,
          username: user.username,
          avatar: user.avatar,
        },
        message: buildMsg(ADMIN, `${user.username} has joined the room`),
      });

      const [activeUsers] = await db
        .promise()
        .query(
          "SELECT id, username, avatar FROM Users WHERE current_room_id = ?",
          [roomId],
        );

      socket.emit("update_user_list", activeUsers);

      // Send a confirmation back to the user who joined
      socket.emit("room_joined_success", {
        roomId: roomId,
        message: buildMsg(ADMIN, `You are now in ${roomId}`),
      });

      socket.emit("error", { message: "Could not join room" });
    } catch (error) {
      console.error("Socket Join Error:", error);
      socket.emit("error", { message: "Could not join room" });
    }
  });
};
