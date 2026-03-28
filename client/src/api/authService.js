import api from "./api";

export const register = async (userDetails) => {
  try {
    const response = await api.post("/api/register", userDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};
