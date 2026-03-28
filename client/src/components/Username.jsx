import React from "react";
import { User } from "lucide-react";

const Username = ({ handleChange, value }) => {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-bold text-[#4a4658] uppercase tracking-widest ml-1">
        Username
      </label>
      <div className="relative">
        <User
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a19fb1]"
          size={20}
        />
        <input
          type="text"
          value={value}
          name="username"
          onChange={handleChange}
          placeholder="elu123"
          className="w-full bg-[#edeaf5] border-none rounded-2xl py-4 pl-12 pr-4 text-[#4a4658] placeholder-[#a19fb1] focus:ring-2 focus:ring-purple-200 outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default Username;
