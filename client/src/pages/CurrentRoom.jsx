import React from "react";
import LeftMessage from "../components/LeftMessage";
import RightMessage from "../components/RightMessage";
import { Settings, Smile, Send } from "lucide-react";

const CurrentRoom = () => {
  return (
    <>
      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
        <div className="flex justify-center">
          <span className="bg-[#F3F0F7] text-[10px] font-bold px-4 py-1 rounded-full opacity-60">
            Jordan joined the room
          </span>
        </div>
        <LeftMessage />
        <RightMessage />
        <RightMessage />
        <RightMessage />
        <LeftMessage />
        <LeftMessage />
        <LeftMessage />
        <LeftMessage />
        <div className="flex items-center gap-2 opacity-50 ml-12">
          <div className="w-8 h-8 rounded-full bg-[#F3F0F7] flex items-center justify-center">
            <Settings size={12} />
          </div>
          <p className="text-[10px] font-medium italic">Sarah is typing...</p>
        </div>
      </div>

      {/* Chat Input */}
      <footer className="p-4 md:p-6">
        <div className="bg-[#F3F0F7] rounded-[2rem] p-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Send a message..."
            className="flex-1 bg-transparent px-4 md:px-6 py-2 outline-none text-sm"
          />
          <button className="p-2 hover:bg-white rounded-full opacity-60">
            <Smile size={20} />
          </button>
          <button className="bg-[#635B70] text-white p-3 rounded-full shadow-md">
            <Send size={18} />
          </button>
        </div>
      </footer>
    </>
  );
};

export default CurrentRoom;
