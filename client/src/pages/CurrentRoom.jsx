import React, { useContext, useEffect, useState } from "react";
import LeftMessage from "../components/LeftMessage";
import RightMessage from "../components/RightMessage";
import { Settings, Smile, Send } from "lucide-react";
import { data, useOutletContext, useParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import { notifyPresence } from "../utils/notifications";

const CurrentRoom = () => {
  const { roomId } = useParams();
  const { activeRoom } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [myRoom, setMyRoom] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState("");
  const [userJoined, setUserJoined] = useState("");
  let typingTimer;

  useEffect(() => {
    if (!socket || !roomId || !user) return;

    socket.emit("join_room", { roomId, userId: user.userId });

    const handleHistory = (data) => {
      setMessages(data);
    };

    const handleJoinSuccess = (data) => {
      socket.emit("get_message_history", { roomId });
    };

    const handleRecieveMessage = (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    };

    const handleTyping = ({ userId, username, isTyping }) => {
      setIsTyping(isTyping);
      setUserTyping(username);
    };

    const handleUserLeave = (data) => {
      console.log(data);
      notifyPresence(data.user, "leave");
    };

    const handleUserJoin = (data) => {
      console.log(data);
      notifyPresence(data.user, "join");
    };

    socket.emit("get_message_history", { roomId });

    socket.on("message_history", handleHistory);
    socket.on("room_joined_success", handleJoinSuccess);
    socket.on("receive_message", handleRecieveMessage);
    socket.on("user_typing", handleTyping);
    socket.on("user_left", handleUserLeave);
    socket.on("user_joined", handleUserJoin);

    return () => {
      socket.off("receive_message", handleRecieveMessage);
      socket.off("message_history", handleHistory);
      socket.off("room_joined_success", handleJoinSuccess);
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
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
        <div className="flex justify-center">
          <span className="bg-[#F3F0F7] text-[10px] font-bold px-4 py-1 rounded-full opacity-60">
            Jordan joined the room
          </span>
        </div>

        {messages.map((message) =>
          message.userId === user?.userId ? (
            <RightMessage message={message} key={message.id} />
          ) : (
            <LeftMessage message={message} key={message.id} />
          ),
        )}

        <div className="flex items-center gap-2 opacity-50 ml-12">
          <div className="w-8 h-8 rounded-full bg-[#F3F0F7] flex items-center justify-center">
            <Settings size={12} />
          </div>
          <p className="text-[10px] font-medium italic">
            {isTyping ? `${userTyping}   is typing...` : ""}
          </p>
        </div>
      </div>

      {/* Chat Input */}
      <footer className="p-4 md:p-6">
        <div className="bg-[#F3F0F7] rounded-[2rem] p-2 flex items-center gap-2">
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
