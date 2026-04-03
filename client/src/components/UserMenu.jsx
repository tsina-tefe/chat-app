import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, Copy, Check, User as UserIcon } from "lucide-react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user?.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm hover:scale-105 transition-transform active:scale-95 bg-[#EDEAF5] flex items-center justify-center"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[#635B70] font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#F3F0F7] p-5 z-[100] animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="flex flex-col items-center text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#F3F0F7] mb-3 border-4 border-white shadow-inner overflow-hidden flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              ) : (
                <UserIcon size={32} className="text-[#635B70]/30" />
              )}
            </div>

            <h3 className="font-extrabold text-[#4a4658] text-lg leading-tight">
              {user.name}
            </h3>
            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2">
              Online
            </p>

            <span className="px-3 py-1 bg-[#F3F0F7] text-[#635B70] text-[10px] font-bold rounded-full uppercase tracking-tighter">
              Workspace Member
            </span>
          </div>

          <div className="h-px bg-[#F3F0F7] w-full mb-4" />

          <div className="space-y-1 mb-6">
            <p className="text-[10px] font-bold text-[#8e8ba2] uppercase tracking-widest ml-1">
              Email Address
            </p>
            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#F8F7FD] hover:bg-[#EDEAF5] rounded-2xl group transition-colors"
            >
              <span className="text-xs text-[#635B70] font-medium truncate pr-2">
                {user.email}
              </span>
              {copied ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Copy
                  size={14}
                  className="text-[#8e8ba2] opacity-0 group-hover:opacity-100 transition-opacity"
                />
              )}
            </button>
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 py-4 bg-[#F5E1E9] hover:bg-[#f0d1de] text-[#A64D79] rounded-[1.5rem] font-bold text-sm transition-all active:scale-[0.98]"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
