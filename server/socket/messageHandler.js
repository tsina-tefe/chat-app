import db from "../config/db.js";

export const messageHandler = (io, socket) => {
  socket.on("send_message", async (data) => {
    const { content, roomId } = data;
    const userId = socket.user.userId;

    try {
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO Messages (user_id, room_id, content) VALUES (?, ?, ?)",
          [userId, roomId, content],
        );

      const [users] = await db
        .promise()
        .query("SELECT username, avatar FROM Users WHERE id = ?", [userId]);

      const newMessage = {
        id: result.insertId,
        content: content,
        roomId: roomId,
        timestamp: new Date().toISOString(),
        userId,
        username: users[0].username,
        avatar: users[0].avatar,
      };
      io.to(String(roomId)).emit("receive_message", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  socket.on("get_message_history", async ({ roomId }) => {
    try {
      const [messages] = await db.promise().query(
        `SELECT m.id, m.content, m.timestamp, m.room_id, u.id as userId, u.username, u.avatar 
         FROM Messages m 
         JOIN Users u ON m.user_id = u.id 
         WHERE m.room_id = ? 
         ORDER BY m.timestamp ASC LIMIT 50`,
        [roomId],
      );

      socket.emit("message_history", messages);
    } catch (error) {
      console.error("Error fetching history:", error);
      socket.emit("error", { message: "Error fetching history" });
    }
  });

  socket.on("typing", ({ roomId, username, isTyping }) => {
    socket.to(String(roomId)).emit("user_typing", {
      userId: socket.user.id,
      username,
      isTyping,
    });
  });
};
