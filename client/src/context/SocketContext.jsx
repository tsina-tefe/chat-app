import { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "./auth-context";
import { io } from "socket.io-client";
import { SocketContext } from "./socket-context";

export const SocketProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const socketUrl =
    import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL;
  const socket = useMemo(() => {
    if (!token) return null;
    return io(socketUrl, {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      timeout: 20000,
    });
  }, [token, socketUrl]);

  useEffect(() => {
    return () => {
      socket?.close();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
