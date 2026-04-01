import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      const newSocket = io("http://localhost:3500", {
        auth: { token },
        transports: ["websocket"],
        reconnectionAttempts: 5, // Stop trying after 5 failed attempts
        reconnectionDelay: 5000, // Wait 5 seconds between each try (instead of 1s)
        timeout: 20000,
      });

      setSocket(newSocket);

      // disconnect on logout or tab close
      //   return () => {
      //     newSocket.close();
      //   };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
