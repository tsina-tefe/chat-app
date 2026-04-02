import React from "react";
import { Search, User, Users, LogOut, Menu } from "lucide-react";

const Header = ({ setIsLeftOpen, setIsRightOpen, activeRoom, roomDetails }) => {
  return (
    <header className="px-6 md:px-8 py-4 flex items-center justify-between border-b border-gray-50">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsLeftOpen(true)}
          className="min-[1250px]:hidden p-2 bg-[#F3F0F7] rounded-xl hover:bg-[#E2D9F3]"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 className="font-bold text-lg md:text-xl">
            {roomDetails ? roomDetails.roomName : "No Room Joined"}
          </h2>
          <p className="text-[10px] md:text-xs opacity-50">
            {roomDetails
              ? `${roomDetails.participants?.length} Participants active`
              : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
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
          className="min-[1250px]:flex items-center gap-2 p-2 bg-[#F3F0F7] rounded-full hover:bg-[#E2D9F3] transition-colors"
        >
          <Users size={18} />
          <span className="text-[10px] font-bold pr-1 hidden sm:inline min-[1250px]:hidden">
            Participants
          </span>
        </button>

        <div className="p-2 bg-[#F3F0F7] rounded-full cursor-pointer hidden sm:block">
          <User size={18} />
        </div>

        <button className="flex items-center gap-2 px-3 py-2 bg-[#F5E1E9] text-[#A64D79] rounded-full text-[10px] md:text-sm font-bold hover:bg-[#f0d1de]">
          <LogOut size={16} /> <span className="hidden lg:inline">Leave</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
