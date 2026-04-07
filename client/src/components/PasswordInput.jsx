import React, { useState } from "react";
import { Lock, EyeOff, EyeIcon } from "lucide-react";

const PasswordInput = ({ handleChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-[11px] font-bold text-[#4a4658] dark:text-[#7f7997] uppercase tracking-widest ml-1">
        Password
      </label>
      <div className="relative">
        <Lock
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a19fb1]"
          size={20}
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={value}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full bg-[#edeaf5] dark:bg-[#0B0A10] border-none rounded-2xl py-4 pl-12 pr-12 text-[#4a4658] dark:text-[#aea9c2] placeholder-[#a19fb1] focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/40 outline-none transition-all"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a19fb1] hover:text-[#4a4658] dark:hover:text-[#847e9b] transition-colors"
        >
          {showPassword ? <EyeIcon size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
