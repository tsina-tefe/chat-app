import { buildMsg } from "../utils/buildMsg.js";
import db from "../config/db.js";

const ADMIN = "Admin";

export const joinRoom = (io, socket) => {
  socket.on("join_room", async (data) => {
    try {
      const userId = socket.user?.userId;
      if (!userId) {
        socket.emit("error", { message: "Unauthorized socket session" });
        return;
      }

      if (!data || typeof data !== "object") {
        socket.emit("error", { message: "Invalid data format" });
        return;
      }

      let { roomId } = data;

      if (roomId === "null" || roomId === null || roomId === undefined) {
        roomId = null;
      }

      if (
        roomId !== null &&
        typeof roomId !== "string" &&
        typeof roomId !== "number"
      ) {
        socket.emit("error", { message: "Invalid roomId" });
        return;
      }

      const [users] = await db
        .promise()
        .query(
          "SELECT username, avatar, current_room_id FROM users WHERE id = ?",
          [userId],
        );

      if (users.length === 0) return;
      const user = users[0];
      const previousRoomId = user.current_room_id;
      const sameRoom =
        previousRoomId !== null &&
        roomId !== null &&
        String(previousRoomId) === String(roomId);

      if (sameRoom) {
        return;
      }

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

      socket.join(String(roomId));

      socket.to(String(roomId)).emit("user_joined", {
        user: {
          id: userId,
          username: user.username,
          avatar: user.avatar,
        },
        message: buildMsg(ADMIN, `${user.username} has joined the room`),
      });

      socket.emit("room_joined_success", {
        roomId: roomId,
        message: "You joined workspace successfully",
      });
    } catch (error) {
      console.error("Socket Join Error:", error);
      socket.emit("error", { message: "Could not join room" });
    }
  });
};
