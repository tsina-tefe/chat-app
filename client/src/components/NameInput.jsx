import React from "react";
import { User } from "lucide-react";

const NameInput = ({ handleChange, value }) => {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-bold text-[#4a4658] dark:text-[#7f7997] uppercase tracking-widest ml-1">
        Name
      </label>
      <div className="relative">
        <User
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a19fb1]"
          size={20}
        />
        <input
          type="text"
          value={value}
          name="name"
          onChange={handleChange}
          placeholder="Elias Vance"
          className="w-full bg-[#edeaf5] dark:bg-[#0B0A10] border-none rounded-2xl py-4 pl-12 pr-4 text-[#4a4658] dark:text-[#aea9c2] placeholder-[#a19fb1] focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/40  outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default NameInput;
