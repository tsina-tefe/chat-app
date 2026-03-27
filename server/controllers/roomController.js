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
