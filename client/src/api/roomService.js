import api from "./api";

export const getRooms = async () => {
  try {
    const response = await api.get("/api/room");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const creatRoom = async (roomData) => {
  try {
    const response = await api.post("/api/room/new", roomData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
