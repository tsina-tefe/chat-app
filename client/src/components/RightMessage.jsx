import React from "react";
import { formatTime } from "../utils/formatTime";

const RightMessage = ({ message }) => {
  return (
    <div className="flex gap-4 max-w-2xl ml-auto flex-row-reverse p-3">
      <div className="w-10 h-10 rounded-full bg-[#D9D7E0] flex items-center justify-center text-[10px] font-bold text-[#635B70] flex-shrink-0 self-end">
        <img
          className="rounded-full"
          src={message.avatar}
          alt={message.username.slice(0, 2).toUpperCase()}
        />
      </div>
      <div className="space-y-1 text-right">
        <p className="text-[10px] font-bold mr-2 opacity-40 dark:opacity-70 uppercase">
          {message.username}
        </p>
        <div className="bg-[#635B70] dark:bg-[#4A4258] text-white dark:text-[#D1CADA] p-5 rounded-[2rem] rounded-br-none text-sm leading-relaxed text-left">
          {message.content}
        </div>
        <p className="text-[10px] mr-2 opacity-40 dark:opacity-60">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default RightMessage;
