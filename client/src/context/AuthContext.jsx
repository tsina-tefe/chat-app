import { createContext, useState } from "react";
import { isTokenExpired } from "../utils/checkToken";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  if (token && isTokenExpired(token)) {
    logout();
  }

  function updateUserRoom(newRoomId) {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const updatedUser = { ...prevUser, roomId: newRoomId };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    });
  }

  function login(newToken, newUser) {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, updateUserRoom }}
    >
      {children}
    </AuthContext.Provider>
  );
};
