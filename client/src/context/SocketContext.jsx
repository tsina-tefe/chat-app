import { useContext, useEffect, useMemo, useRef } from "react";
import { AuthContext } from "./auth-context";
import { io } from "socket.io-client";
import { SocketContext } from "./socket-context";

export const SocketProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const previousSocketRef = useRef(null);
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
    if (previousSocketRef.current && previousSocketRef.current !== socket) {
      previousSocketRef.current.close();
    }
    previousSocketRef.current = socket;
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
