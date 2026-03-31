import React from "react";
import { formatTime } from "../utils/formatTime";

const LeftMessage = ({ message }) => {
  return (
    <div className="flex gap-4 max-w-2xl p-3">
      <div className="w-10 h-10 rounded-full bg-[#F5E1E9] flex items-center justify-center text-[10px] font-bold text-[#A64D79] flex-shrink-0 self-end">
        {message.avatar ? message.avatar : "OT"}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold ml-2 opacity-40 uppercase">
          {message.username}
        </p>
        <div className="bg-[#EBE7F1] p-5 rounded-[2rem] rounded-bl-none text-sm leading-relaxed">
          {message.content}
          {/* Hey team, I've just uploaded the latest wireframes for the workspace
          dashboard. Would love some initial thoughts on the tonal layering
          approach! */}
        </div>
        <p className="text-[10px] ml-2 opacity-40">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default LeftMessage;
