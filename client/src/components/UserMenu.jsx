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
        className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-[#86848987] shadow-sm hover:scale-105 transition-transform active:scale-95 bg-[#EDEAF5] dark:bg-[#86848987] flex items-center justify-center"
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
        <div className="absolute right-0 mt-4 w-72 bg-white dark:bg-[#0B0A10] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#F3F0F7] dark:border-[#3c3b3e] p-5 z-[100] animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="flex flex-col items-center text-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#F3F0F7] dark:bg-[#86848987]  mb-3 border-4 border-white dark:border-[#86848987] shadow-inner overflow-hidden flex items-center justify-center">
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

            <h3 className="font-extrabold text-[#4a4658] dark:text-[#6d697a] text-lg leading-tight">
              {user.name}
            </h3>
            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2">
              Online
            </p>

            <span className="px-3 py-1 bg-[#F3F0F7] dark:bg-[#6a6075] text-[#635B70] dark:text-[#b9b7bd] text-[10px] font-bold rounded-full uppercase tracking-tighter">
              Workspace Member
            </span>
          </div>

          <div className="h-px bg-[#F3F0F7] dark:bg-[#7d7786] w-full mb-4" />

          <div className="space-y-1 mb-6">
            <p className="text-[10px] font-bold text-[#8e8ba2] uppercase tracking-widest ml-1">
              Email Address
            </p>
            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#F8F7FD] dark:bg-[#9e9da3] hover:bg-[#EDEAF5] dark:hover:bg-[#cccad2] rounded-2xl group transition-colors"
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
            className="w-full flex items-center justify-center gap-2 py-4 bg-[#e4d1d9c6] dark:bg-[#f5e1e9c0] hover:bg-[#f0d1de] dark:hover:bg-[#e1c0ce] text-[#A64D79] rounded-[1.5rem] font-bold text-sm transition-all active:scale-[0.98]"
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
