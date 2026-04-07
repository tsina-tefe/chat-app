import db from "../config/db.js";

export const getRoomInfo = async (req, res) => {
  const { roomId } = req.params;
  try {
    // query to get the room name and the list of users currently in it
    const query = `
      SELECT 
        r.room_name AS roomName, 
        u.id AS userId, 
        u.avatar, 
        u.full_name AS name, 
        u.username
      FROM rooms r
      LEFT JOIN users u ON r.id = u.current_room_id
      WHERE r.id = ?
    `;

    const [rows] = await db.promise().query(query, [roomId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    const roomInfo = {
      roomName: rows[0].roomName,
      participants: rows[0].userId
        ? rows.map((row) => ({
            id: row.userId,
            name: row.name,
            avatar: row.avatar,
            username: row.username,
          }))
        : [],
    };

    res.status(200).json(roomInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
