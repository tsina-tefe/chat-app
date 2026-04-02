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

  const updateUserRoom = (newRoomId) => {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const updatedUser = { ...prevUser, roomId: newRoomId };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  const login = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, updateUserRoom }}
    >
      {children}
    </AuthContext.Provider>
  );
};
