import { buildMsg } from "../utils/buildMsg.js";
import db from "../config/db.js";

const ADMIN = "Admin";

export const leaveRoom = (io, socket) => {
  socket.on("leave_room", async () => {
    const userId = socket.user.userId;
    console.log(userId);
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
      console.log(roomId);
      console.log(userName);

      // UPDATE DATABASE: Set room to NULL
      await db
        .promise()
        .query("UPDATE users SET current_room_id = NULL WHERE id = ?", [
          userId,
        ]);

      // SOCKET LEAVE: Physically remove them from the socket room
      socket.leave(String(roomId));

      socket.to(String(roomId)).emit("user_left", {
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
};
