import React from "react";

const EmailInput = ({ handleChange, value }) => {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-bold text-[#4a4658] uppercase tracking-widest ml-1">
        Email
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a19fb1] text-xl font-light">
          @
        </span>
        <input
          type="email"
          value={value}
          name="email"
          onChange={handleChange}
          placeholder="hello@fluidchat.io"
          className="w-full bg-[#edeaf5] border-none rounded-2xl py-4 pl-12 pr-4 text-[#4a4658] placeholder-[#a19fb1] focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          required
        />
      </div>
    </div>
  );
};

export default EmailInput;
