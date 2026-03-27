import { buildMsg } from "../utils/buildMsg.js";
import db from "../config/db.js";

const ADMIN = "Admin";

export const disconnectHandler = (io, socket) => {
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
