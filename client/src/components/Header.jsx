import React, { useContext } from "react";
import { Search, Users, LogOut, Menu } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import UserMenu from "./UserMenu";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = ({ setIsLeftOpen, setIsRightOpen, roomDetails }) => {
  const { updateUserRoom } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleLeaveRoom = () => {
    updateUserRoom(null);
    socket.emit("leave_room");
    navigate("rooms");
  };

  return (
    <header className="px-6 md:px-8 py-4 flex items-center justify-between border-b border-gray-50 dark:border-[#1A1625]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsLeftOpen(true)}
          className="min-[1250px]:hidden p-2 bg-[#F3F0F7] dark:bg-[#86848987] rounded-xl hover:bg-[#E2D9F3]"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 className="font-bold text-lg md:text-xl">
            {roomDetails.roomName ? roomDetails.roomName : "No Room Joined"}
          </h2>
          <p className="text-[10px] md:text-xs opacity-50">
            {roomDetails.participants
              ? `${roomDetails.participants.length} Participants active`
              : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />
        <div className="relative hidden xl:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#F3F0F7] rounded-full py-2 pl-10 pr-4 text-sm outline-none w-48 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        <button
          onClick={() => setIsRightOpen(true)}
          className="min-[1250px]:flex items-center gap-2 p-2 bg-[#F3F0F7] dark:bg-[#86848987] rounded-full hover:bg-[#E2D9F3] dark:hover:bg-[#5e5966]  transition-colors"
        >
          <Users size={18} />
          <span className="text-[10px] font-bold pr-1 hidden sm:inline min-[1250px]:hidden">
            Participants
          </span>
        </button>

        <UserMenu />

        {/* hadle leave room */}
        <button
          className="flex items-center gap-2 px-3 py-2 bg-[#F5E1E9] text-[#A64D79] rounded-full text-[10px] md:text-sm font-bold hover:bg-[#f0d1de]"
          onClick={handleLeaveRoom}
        >
          <LogOut size={16} /> <span className="hidden lg:inline">Leave</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
