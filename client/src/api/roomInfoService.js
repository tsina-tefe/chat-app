import api from "./api";

export const getRoomInfo = async (roomId) => {
  try {
    const response = await api.get(`/api/room-info/${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
