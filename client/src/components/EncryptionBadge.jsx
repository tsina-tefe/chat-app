import React from "react";
import { ShieldCheck } from "lucide-react";

const EncryptionBadge = () => {
  return (
    <div className="ml-[20%] w-[80%] sm:w-[60%] flex items-center gap-3 bg-white/60 dark:bg-[#161420] backdrop-blur-md p-4 rounded-3xl border border-white/80 dark:border-white/10 shadow-sm">
      <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-xl">
        <ShieldCheck className="text-pink-500" size={24} />
      </div>
      <div>
        <h4 className="text-xs font-bold text-[#4a4658]">
          End-to-End Encryption
        </h4>
        <p className="text-[10px] text-[#8e8ba2]">
          Your privacy is our priority.
        </p>
      </div>
    </div>
  );
};

export default EncryptionBadge;
