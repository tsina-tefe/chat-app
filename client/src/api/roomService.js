import api from "./api";

export const getRooms = async () => {
  try {
    const response = await api.get("/api/room");
    return response.data;
  } catch (error) {
    throw error;
  }
};
