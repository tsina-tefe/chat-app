import api from "./api";

export const getRooms = async () => (await api.get("/api/room")).data;

export const creatRoom = async (roomData) =>
  (await api.post("/api/room/new", roomData)).data;
