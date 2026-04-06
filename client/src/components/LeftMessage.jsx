import React from "react";
import { formatTime } from "../utils/formatTime";

const LeftMessage = ({ message }) => {
  return (
    <div className="flex gap-4 max-w-2xl p-3">
      <div className="w-10 h-10 rounded-full bg-[#F5E1E9] flex items-center justify-center text-[10px] font-bold text-[#A64D79] flex-shrink-0 self-end">
        <img
          className="rounded-full"
          src={message.avatar}
          alt={message.username.slice(0, 2).toUpperCase()}
        />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold ml-2 opacity-40 dark:opacity-70">
          {message.username}
        </p>
        <div className="bg-[#EBE7F1] dark:bg-[#2D2A3D] text-[#635B70] dark:text-[#E2D9F3] p-5 rounded-[2rem] rounded-bl-none text-sm leading-relaxed">
          {message.content}
        </div>
        <p className="text-[10px] ml-2 opacity-40 dark:opacity-60">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default LeftMessage;
