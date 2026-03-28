import React from "react";
import { X } from "lucide-react";

const RightSidebar = ({ isRightOpen, closeAll }) => {
  return (
    <aside
      className={`
          fixed inset-y-0 right-0 z-50 w-72 bg-[#F3F0F7] p-6 transform transition-transform duration-300 ease-in-out
          ${isRightOpen ? "translate-x-0" : "translate-x-full"}
          min-[1250px]:relative min-[1250px]:translate-x-0 min-[1250px]:flex min-[1250px]:flex-col min-[1250px]:w-80 min-[1250px]:p-0 min-[1250px]:pl-6
        `}
    >
      <div className="flex items-center justify-between mb-8 min-[1250px]:block">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
          Participants
        </h3>
        <button
          onClick={closeAll}
          className="min-[1250px]:hidden p-2 hover:bg-white/50 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <p className="text-[10px] font-bold opacity-30">ONLINE — 4</p>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
              className="w-10 h-10 rounded-full bg-teal-100"
              alt="Sarah"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#F3F0F7] rounded-full"></div>
          </div>
          <div>
            <p className="text-sm font-bold">Sarah Jenkins</p>
            <p className="text-[10px] opacity-50">Lead Designer</p>
          </div>
        </div>
        {/* ... [Other Participants] ... */}
      </div>
    </aside>
  );
};

export default RightSidebar;
