import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:7000", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

      // The socket.on() method in Socket.IO is used to listen for specific events sent from the server or other clients. It takes an event name and a callback function, allowing the client to handle data or actions when that event is received, enabling real-time interaction based on custom or predefined events.
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
