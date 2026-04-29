import api from "./api";

export const registerService = async (userDetails) =>
  (await api.post("/api/register", userDetails)).data;

export const loginService = async (userCredentials) =>
  (await api.post("/api/login", userCredentials)).data;
