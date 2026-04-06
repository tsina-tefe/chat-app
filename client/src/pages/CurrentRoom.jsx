import React, { useContext, useEffect, useRef, useState } from "react";
import LeftMessage from "../components/LeftMessage";
import RightMessage from "../components/RightMessage";
import { Settings, Smile, Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import { notifyPresence, notifyUser } from "../utils/notifications";

const CurrentRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);
  const { user, updateUserRoom } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState("");
  const messagesEndRef = useRef(null);
  let typingTimer;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!socket || !roomId || !user) return;
    socket.emit("join_room", { roomId, userId: user.userId });

    const handleHistory = (data) => {
      setMessages(data);
    };

    const handleRecieveMessage = (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
      scrollToBottom();
    };

    const handleTyping = ({ userId, username, isTyping }) => {
      setIsTyping(isTyping);
      setUserTyping(username);
    };

    const handleUserLeave = (data) => {
      notifyPresence(data, "leave");
    };

    const handleUserJoin = (data) => {
      notifyPresence(data, "join");
    };

    const handleError = (data) => {
      notifyUser(data.message, "error");
    };

    const handleUserDisconnected = (data) => {
      notifyPresence(data, "disconnect");
    };

    const handleJoindeSuccess = (data) => {
      notifyUser(data.message, "success");
      updateUserRoom(data.roomId);
    };

    const handleLeaveSuccess = (data) => {
      notifyUser(data.message, "success");
    };

    socket.emit("get_message_history", { roomId });

    socket.on("message_history", handleHistory);
    socket.on("receive_message", handleRecieveMessage);
    socket.on("user_typing", handleTyping);
    socket.on("user_left", handleUserLeave);
    socket.on("user_joined", handleUserJoin);
    socket.on("error", handleError);
    socket.on("user_disconnected", handleUserDisconnected);
    socket.on("room_joined_success", handleJoindeSuccess);
    socket.on("leave_success", handleLeaveSuccess);

    return () => {
      socket.off("message_history", handleHistory);
      socket.off("receive_message", handleRecieveMessage);
      socket.off("user_typing", handleTyping);
      socket.off("user_left", handleUserLeave);
      socket.off("user_joined", handleUserJoin);
      socket.off("error", handleError);
      socket.off("user_disconnected", handleUserDisconnected);
      socket.off("room_joined_success", handleJoindeSuccess);
      socket.off("leave_success", handleLeaveSuccess);
    };
  }, [socket, roomId]);

  const handleNewMessage = () => {
    if (!newMessage.trim()) return;
    socket.emit("send_message", {
      content: newMessage,
      roomId,
    });
    setNewMessage("");
    setIsTyping(false);
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    socket.emit("typing", { roomId, username: user.username, isTyping: true });

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      socket.emit("typing", {
        roomId,
        username: user.username,
        isTyping: false,
      });
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNewMessage();
    }
  };

  return (
    <>
      {/* Messages Feed */}
      <div
        className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar
  [--sb-thumb:#E2D9F3] 
  dark:[--sb-thumb:#66263D]"
      >
        {/* <div className="flex justify-center">
          <span className="bg-[#F3F0F7] text-[10px] font-bold px-4 py-1 rounded-full opacity-60">
            Jordan joined the room
          </span>
        </div> */}

        {messages.map((message) =>
          message.userId === user?.userId ? (
            <RightMessage message={message} key={message.id} />
          ) : (
            <LeftMessage message={message} key={message.id} />
          ),
        )}

        <div className="flex items-center gap-2 opacity-50 ml-12">
          <div className="w-8 h-8 rounded-full bg-[#F3F0F7]  dark:bg-[#1A1625] flex items-center justify-center">
            <Settings size={12} />
          </div>
          <p className="text-[10px] font-medium italic">
            {isTyping ? `${userTyping}   is typing...` : ""}
          </p>
        </div>
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Chat Input */}
      <footer className="p-4 md:p-6">
        <div className="bg-[#F3F0F7] dark:bg-[#0B0A10] rounded-[2rem] p-2 flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            placeholder="Send a message..."
            className="flex-1 bg-transparent px-4 md:px-6 py-2 outline-none text-sm"
            onChange={handleChange}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />
          <button className="p-2 hover:bg-white rounded-full opacity-60">
            <Smile size={20} />
          </button>
          <button
            className="bg-[#635B70] text-white p-3 rounded-full shadow-md"
            onClick={() => {
              handleNewMessage();
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </footer>
    </>
  );
};

export default CurrentRoom;
