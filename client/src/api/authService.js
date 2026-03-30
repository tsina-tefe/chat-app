import api from "./api";

export const registerService = async (userDetails) => {
  try {
    const response = await api.post("/api/register", userDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (userCredentials) => {
  try {
    const response = await api.post("/api/login", userCredentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
