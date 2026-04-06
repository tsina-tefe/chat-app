import React, { useContext } from "react";
import { MessageSquare, Layers, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LeftSidebar = ({ isLeftOpen, closeAll }) => {
  const { user } = useContext(AuthContext);

  return (
    <aside
      className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-[#F3F0F7] dark:bg-[#0B0A10] p-6 transform transition-transform duration-300 ease-in-out
          ${isLeftOpen ? "translate-x-0" : "-translate-x-full"}
          min-[1250px]:relative min-[1250px]:translate-x-0 min-[1250px]:flex min-[1250px]:flex-col min-[1250px]:w-64 min-[1250px]:p-0 min-[1250px]:pr-4
        `}
    >
      <div className="flex items-center justify-between mb-10 px-2">
        <div className="flex items-center gap-3">
          <div className="bg-[#635B70] p-2 rounded-xl text-white">
            <MessageSquare size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Fluid Chat</h1>
            <p className="text-[10px] uppercase tracking-widest opacity-60">
              Ethereal Workspace
            </p>
          </div>
        </div>
        <button
          onClick={closeAll}
          className="min-[1250px]:hidden p-2 hover:bg-white/50 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink
          className={({ isActive }) => {
            return `w-full flex items-center gap-3 px-4 py-3 transition-al font-semiboldl rounded-2xl ${isActive ? "bg-[#E2D9F3] text-[#635B70] dark:bg-[#2A263D] dark:text-[#E2D9F3]" : "hover:bg-white/50 dark:hover:bg-white/5 opacity-80"}`;
          }}
          to={user?.roomId ? `room/${user.roomId}` : "rooms"}
          onClick={() => {
            closeAll();
          }}
        >
          <MessageSquare size={20} /> Current Room
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return `w-full flex items-center gap-3 px-4 py-3 transition-al font-semiboldl rounded-2xl ${isActive ? "bg-[#E2D9F3] text-[#635B70] dark:bg-[#2A263D] dark:text-[#E2D9F3]" : "hover:bg-white/50 dark:hover:bg-white/5 opacity-80"}`;
          }}
          to={"rooms"}
          onClick={() => {
            closeAll();
          }}
        >
          <Layers size={20} /> Rooms
        </NavLink>
      </nav>
    </aside>
  );
};

export default LeftSidebar;
