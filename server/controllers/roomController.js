import db from "../config/db.js";

export const getActiveRooms = async (req, res) => {
  try {
    const [rooms] = await db.promise().query("SELECT * FROM Rooms");

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error.message);

    res.status(500).json({
      message: "Could not fetch rooms. Please try again later.",
    });
  }
};

export const createNewRoom = async (req, res) => {
  const roomName = req.body.roomName?.trim();

  if (!roomName || roomName.length < 4) {
    return res
      .status(400)
      .json({ message: "Romm name must be greater than 3 characters" });
  }

  try {
    const [existing] = await db
      .promise()
      .query("SELECT id FROM rooms WHERE room_name = ?", [roomName]);

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: "Room with the same name already  exists" });
    }

    const [result] = await db
      .promise()
      .query("INSERT INTO rooms(room_name) VALUES (?)", [roomName]);

    res.status(201).json({
      message: "Room created successfully",
      room: {
        id: result.insertId,
        roomName,
      },
    });
  } catch (error) {
    console.error("Error creating room: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
