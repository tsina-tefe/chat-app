import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { token } = useContext(AuthContext);
  const socketUrl =
    import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL;

  useEffect(() => {
    let newSocket = null;

    if (token) {
      newSocket = io(socketUrl, {
        auth: { token },
        transports: ["websocket"],
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        timeout: 20000,
      });

      setSocket(newSocket);
    } else {
      if (newSocket) {
        newSocket.close();
        setSocket(null);
      }
    }
  }, [token, socketUrl]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
