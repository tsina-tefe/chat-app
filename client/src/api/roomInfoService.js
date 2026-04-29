import api from "./api";

export const getRoomInfo = async (roomId) =>
  (await api.get(`/api/room-info/${roomId}`)).data;
