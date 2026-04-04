import { toast } from "sonner";
import { UserPlus, UserMinus } from "lucide-react";

export const notifyPresence = (data, type = "join") => {
  const isJoin = type === "join";

  toast.custom((t) => (
    <div
      className={`
      flex items-center gap-3 p-4 w-80 bg-white/90 backdrop-blur-md 
      border border-white rounded-[2rem] shadow-xl shadow-purple-100/50
      animate-in slide-in-from-right-5 duration-300
    `}
    >
      <div
        className={`
        p-2 rounded-2xl 
        ${isJoin ? "bg-indigo-50 text-[#5c586d]" : "bg-[#F5E1E9] text-[#A64D79]"}
      `}
      >
        {isJoin ? <UserPlus size={18} /> : <UserMinus size={18} />}
      </div>

      <div className="flex-1 overflow-hidden">
        <p className="text-[10px] font-medium text-[#8e8ba2] uppercase tracking-wider">
          {data.message.text}
        </p>
      </div>

      <button
        onClick={() => toast.dismiss(t)}
        className="text-[#8e8ba2] hover:text-[#4a4658] px-2"
      >
        ✕
      </button>
    </div>
  ));
};

export const notifyError = (errorMsg) => {
  toast.custom((t) => (
    <div
      className={`
      flex items-center gap-3 p-4 w-80 bg-white/90 backdrop-blur-md 
      border border-white rounded-[2rem] shadow-xl shadow-purple-100/50
      animate-in slide-in-from-right-5 duration-300
    `}
    >
      <div className="p-3 rounded-[2rem] flex-1 overflow-hidden bg-[#A64D79]">
        <p className="text-[10px] font-medium text-[#8e8ba2] uppercase tracking-wider">
          {errorMsg}
        </p>
      </div>

      <button
        onClick={() => toast.dismiss(t)}
        className="text-[#8e8ba2] hover:text-[#4a4658] px-2"
      >
        ✕
      </button>
    </div>
  ));
};
